variable "gke_username" {
  default     = ""
  description = "gke username"
}

variable "gke_password" {
  default     = ""
  description = "gke password"
}

variable "project-id" {
  description = "project id"
}

variable "region" {
  description = "region"
}

variable "zone" {
  description = "zone"
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.31.0"
    }
  }
  # for syncing tfstate
  backend "gcs" {
    bucket = "uiuctf-2024-terraform-backend"
    prefix = "terraform/state"
  }
  required_version = ">= 1.8"
}

provider "google" {
  project = var.project-id
  region  = var.region
  zone    = var.zone
}

# BEGIN sacct & bucket for rCTF migrations
resource "google_storage_bucket" "rctf" {
  name          = "uiuctf-2024-rctf-uploads"
  location      = "US"
  force_destroy = false

  uniform_bucket_level_access = true
  public_access_prevention    = "inherited"
}

resource "google_service_account" "rctf" {
  account_id = "rctf-sa"
}

resource "google_storage_bucket_iam_member" "rctf" {
  bucket = google_storage_bucket.rctf.name
  role   = "roles/storage.objectAdmin"
  member = google_service_account.rctf.member
}

resource "kubernetes_service_account" "rctf" {
  metadata {
    name      = "rctf"
    namespace = kubernetes_namespace.rctf.metadata.0.name
    annotations = {
      "iam.gke.io/gcp-service-account" = google_service_account.rctf.email
    }
  }
}

resource "google_service_account_iam_binding" "rctf" {
  service_account_id = google_service_account.rctf.name
  role               = "roles/iam.workloadIdentityUser"

  members = [
    "serviceAccount:${var.project-id}.svc.id.goog[${kubernetes_namespace.rctf.metadata.0.name}/${kubernetes_service_account.rctf.metadata.0.name}]",
  ]
}
# END sacct & bucket for rCTF migrations

# BEGIN artifact registry and sacct for rCDS
resource "google_artifact_registry_repository" "rcds" {
  project       = var.project-id
  location      = var.region
  repository_id = "chal-artifact-registry"
  format        = "DOCKER"
  description   = "challenge repository"
}

resource "google_artifact_registry_repository" "rctf" {
  project       = var.project-id
  location      = var.region
  repository_id = "rctf"
  format        = "DOCKER"
  description   = "SIGPwny fork of rctf"
}

resource "google_artifact_registry_repository" "status" {
  project       = var.project-id
  location      = var.region
  repository_id = "status-bot"
  format        = "DOCKER"
  description   = "Discord status bot"
}
# END artifact registry and sacct for rCDS

# BEGIN rCTF static IP
resource "google_compute_global_address" "rctf" {
  name = "rctf"
}

resource "kubernetes_ingress_v1" "rctf" {
  metadata {
    name = "frontend"
    namespace = kubernetes_namespace.rctf.metadata.0.name
	annotations = {
	  "kubernetes.io/ingress.global-static-ip-name" = google_compute_global_address.rctf.name
	}
  }

  spec {
    default_backend {
	  service {
		name = "frontend"
		port {
		  number = 80
		}
	  }
    }
    tls {
      secret_name = "tls-cert-rctf"
    }
  }
}
# END rCTF static IP

# BEGIN rCTF challenge upload provider bucket + sacct
resource "google_storage_bucket" "chal-uploads" {
  name          = "uiuctf-2024-rctf-challenge-uploads"
  location      = "US"
  force_destroy = false

  uniform_bucket_level_access = false
  public_access_prevention    = "inherited"
}

resource "google_service_account" "chal-uploads" {
  account_id = "chal-uploads-sa"
}

resource "google_service_account_key" "chal-uploads" {
  service_account_id = google_service_account.chal-uploads.name
}

resource "google_storage_bucket_iam_member" "chal-uploads" {
  bucket = google_storage_bucket.chal-uploads.name
  role   = "roles/storage.objectUser"
  member = google_service_account.chal-uploads.member
}

resource "kubernetes_secret" "chal-uploads" {
  metadata {
    name      = "chal-uploads-sa"
    namespace = kubernetes_namespace.rctf.metadata.0.name
  }

  data = {
    uploads-yaml = <<-EOT
    uploadProvider:
      name: 'uploads/gcs'
      options:
        bucketName: 'uiuctf-2024-rctf-challenge-uploads'
        credentials:
          private_key: |-
            ${indent(8, chomp(jsondecode(base64decode(google_service_account_key.chal-uploads.private_key)).private_key))}
          client_email: ${google_service_account.chal-uploads.email}
    EOT
  }
}
# END rCTF challenge upload provider bucket + sacct
