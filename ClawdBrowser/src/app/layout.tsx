"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { SettingsProvider } from "@/context/settings-context";
import { SolanaProvider } from "@/context/solana-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      })
  );

  return (
    <html lang="en">
      <body className="min-h-screen">
        <QueryClientProvider client={queryClient}>
          <SolanaProvider>
            <SettingsProvider>
              <AppShell>{children}</AppShell>
            </SettingsProvider>
          </SolanaProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
