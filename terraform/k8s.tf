data "google_container_engine_versions" "gke_version" {
  location       = var.region
  version_prefix = "1.28."
}

resource "google_container_cluster" "primary" {
  name     = "${var.project-id}-gke"
  location = var.zone

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  private_cluster_config {
    enable_private_nodes   = true
    master_ipv4_cidr_block = "10.0.2.32/28"
  }

  networking_mode = "VPC_NATIVE"
  ip_allocation_policy {
    stack_type = "IPV4"
  }

  datapath_provider = "ADVANCED_DATAPATH"

  workload_identity_config {
    workload_pool = "${var.project-id}.svc.id.goog"
  }

  vertical_pod_autoscaling {
    enabled = true
  }

  cost_management_config {
    enabled = true
  }

  addons_config {
    gcs_fuse_csi_driver_config { enabled = true }
    gce_persistent_disk_csi_driver_config { enabled = true }
  }

  # depends_on = [google_project_service.container]
}

# Separately Managed Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name     = google_container_cluster.primary.name
  location = var.zone
  cluster  = google_container_cluster.primary.name

  version    = data.google_container_engine_versions.gke_version.release_channel_latest_version["STABLE"]

  autoscaling {
    min_node_count = 2
    max_node_count = 3
  }

  network_config {
    enable_private_nodes = true
  }

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]

    labels = {
      env = var.project-id
    }

    spot         = true
    machine_type = "e2-standard-4"
    disk_size_gb = 20
    disk_type    = "pd-standard"
    tags = ["gke-node", "${var.project-id}-gke"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

data "google_client_config" "default" {}

provider "kubernetes" {
  host                   = "https://${google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth.0.cluster_ca_certificate)
}
