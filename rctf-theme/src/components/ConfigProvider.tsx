"use client";
import { createContext, useEffect, useState } from "react";
import { getConfig } from "@/lib/rctf-client-api/config";
import { type ClientConfig } from "@/lib/rctf-client-api/types";

export const ConfigContext = createContext<ClientConfig | null>(null);

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const new_config: unknown = await getConfig();
        setConfig(new_config as ClientConfig);
      } catch (e) {
        console.error("Failed to fetch config", e);
      }
    }
    fetchConfig();
  }, []);
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}