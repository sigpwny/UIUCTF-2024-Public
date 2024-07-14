import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ViewTransitions } from "next-view-transitions";
import ConfigProvider from "@/components/ConfigProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import "./transitions.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UIUCTF 2024",
  description: "Solve challenges. Deliver passengers.",
  openGraph: {
    title: "UIUCTF 2024",
    description: "Solve challenges. Deliver passengers.",
    url: "https://2024.uiuc.tf",
    type: "website",
    siteName: "UIUCTF 2024",
    images: [
      {
        url: "https://2024.uiuc.tf/pwny-uiuctf-2024-icon-light-512x512.png",
        width: 512,
        height: 512,
      }
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "UIUCTF 2024",
    description: "Solve challenges. Deliver passengers.",
    site: "@sigpwny",
    images: [
      "https://2024.uiuc.tf/pwny-uiuctf-2024-icon-light-512x512.png"
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="custom-scrollbar">
        <body id="pageview" className={inter.className}>
          <ConfigProvider>
            <Navbar />
            <div className="container mx-auto grow">
              {children}
            </div>
            <Toaster
              position="bottom-left"
              toastOptions={{
                className: "!bg-surface-panelalt !text-surface-textalt !rounded-none",
                duration: 10000,
              }}
            />
          </ConfigProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
