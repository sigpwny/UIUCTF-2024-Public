resource "google_compute_network" "vpc" {
  name                    = "${var.project-id}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.project-id}-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc.name
}

resource "google_compute_router" "router" {
  name    = "gke-internal-nat-router"
  region  = google_compute_subnetwork.subnet.region
  network = google_compute_network.vpc.id
}

resource "google_compute_router_nat" "nat" {
  name                               = "gke-internal-nat-config"
  router                             = google_compute_router.router.name
  region                             = google_compute_router.router.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  # log_config {
  #   enable = false
  #   filter = "ALL"
  # }
}

resource "google_compute_global_address" "service_ip_range" {
  name          = "gke-internal-services-ip-range"
  address_type  = "INTERNAL"
  network       = google_compute_network.vpc.id
  purpose       = "VPC_PEERING"
  prefix_length = 24
}

resource "google_service_networking_connection" "default" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.service_ip_range.name]
}
