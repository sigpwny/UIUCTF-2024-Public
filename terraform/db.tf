# BEGIN POSTGRES
resource "google_sql_database_instance" "postgres" {
  name             = "postgres"
  database_version = "POSTGRES_15"

  settings {
    tier              = "db-f1-micro"
    edition           = "ENTERPRISE"
    availability_type = "ZONAL"
    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
    }
    deletion_protection_enabled = true
    disk_size                   = 10

    ip_configuration {
      ipv4_enabled                                  = false
      private_network                               = google_compute_network.vpc.id
      allocated_ip_range                            = google_compute_global_address.service_ip_range.name
      enable_private_path_for_google_cloud_services = true
    }

    database_flags {
      name  = "max_connections"
      value = 100
    }
  }

  deletion_protection = "true"

  depends_on = [google_service_networking_connection.default]
}

resource "google_sql_database" "rctf" {
  name            = "rctf"
  instance        = google_sql_database_instance.postgres.name
  deletion_policy = "ABANDON"
}

resource "google_sql_user" "rctf" {
  name     = "rctf"
  instance = google_sql_database_instance.postgres.name
  password = "<RCTF POSTGRES TOKEN>"
}

resource "kubernetes_namespace" "rctf" {
  metadata {
    name = "rctf"
  }
}

resource "kubernetes_service" "rctf-postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace.rctf.metadata.0.name
  }
  spec {
    cluster_ip = "None"
    type       = "ClusterIP"
  }
  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
    ]
  }
}

resource "kubernetes_endpoints" "rctf-postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace.rctf.metadata.0.name
  }

  subset {
    address {
      ip = google_sql_database_instance.postgres.private_ip_address
    }
  }
}
# END POSTGRES

# BEGIN REDIS
variable "redis-pass" {
  description = "Redis password"
  sensitive   = true
}

resource "google_compute_instance" "redis" {
  name                      = "redis"
  tags                      = ["redis"]
  machine_type              = "e2-small"
  zone                      = var.zone
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "uiuctf-2023-ubuntu-vmx"
      size  = 10
      type  = "pd-standard"
    }
  }

  network_interface {
    network    = google_compute_network.vpc.id
    subnetwork = google_compute_subnetwork.subnet.id
  }

  metadata_startup_script = <<-EOF
    #!/usr/bin/env bash

    # get hash of current file...

    if [[ -f /redis-provisioned ]]; then exit 0; fi

    set -ex

    export DEBIAN_FRONTEND=noninteractive
    apt update && apt install redis -y
    sed -i 's/^bind /# bind /' /etc/redis/redis.conf
    sed -i -r 's,^#(\s*)?requirepass .+$,requirepass ${var.redis-pass},' /etc/redis/redis.conf

    systemctl restart redis

    touch /redis-provisioned
  EOF

  service_account {
    scopes = [
      # defaults
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }
}

resource "kubernetes_service" "rctf-redis" {
  metadata {
    name      = "redis"
    namespace = kubernetes_namespace.rctf.metadata.0.name
  }
  spec {
    cluster_ip = "None"
    type       = "ClusterIP"
  }
  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
    ]
  }
}

resource "kubernetes_endpoints" "rctf-redis" {
  metadata {
    name      = "redis"
    namespace = kubernetes_namespace.rctf.metadata.0.name
  }

  subset {
    address {
      ip = google_compute_instance.redis.network_interface[0].network_ip
    }
  }
}

resource "google_compute_firewall" "redis-allow-iap-ssh" {
  name          = "redis-allow-iap-ssh"
  network       = google_compute_network.vpc.id
  source_ranges = ["35.235.240.0/20"]
  target_tags   = ["redis"]

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
}

resource "google_compute_firewall" "redis-fw" {
  name          = "redis-firewall"
  network       = google_compute_network.vpc.id
  source_ranges = [google_compute_subnetwork.subnet.ip_cidr_range, google_container_cluster.primary.cluster_ipv4_cidr]
  target_tags   = ["redis"]

  allow {
    protocol = "icmp"
  }
  allow {
    protocol = "tcp"
    ports    = ["6379"]
  }
}
# END REDIS

resource "kubernetes_secret" "rctf-dbinfo" {
  metadata {
    name      = "dbinfo"
    namespace = kubernetes_namespace.rctf.metadata.0.name
  }

  data = {
    # DB_USERNAME = google_sql_user.rctf.name
    RCTF_REDIS_PASSWORD    = var.redis-pass
    RCTF_DATABASE_PASSWORD = google_sql_user.rctf.password
    # DB_IPADDR = google_sql_database_instance.postgres.private_ip_address
    # DB_DBNAME = google_sql_database.rctf.name
    # remove this...
    RCTF_GCS_CREDENTIALS = "null"
    RCTF_GCS_BUCKET      = google_storage_bucket.rctf.name
  }
}
