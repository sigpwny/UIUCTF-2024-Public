resource "kubernetes_namespace" "traefik" {
  metadata {
    name = "traefik"
  }
}

resource "google_compute_address" "traefik" {
  name = "traefik"
}

resource "kubernetes_service" "traefik" {
  metadata {
    name = "traefik"
    namespace = kubernetes_namespace.traefik.metadata.0.name
  }
  spec {
    selector = {
      app = "traefik"
    }
    port {
      name = "http"
      port = 80
      protocol = "TCP"
    }
    port {
      name = "https"
      port = 443
      protocol = "TCP"
    }

    port {
      name = "chal"
      port = 1337
      protocol = "TCP"
    }

    type = "LoadBalancer"
    external_traffic_policy = "Cluster"
    load_balancer_ip = google_compute_address.traefik.address
  }

  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
    ]
  }
}
