'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { safe } from 'wagmi/connectors'

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [sepolia],
        connectors: [
            safe({
                debug: true
            })
        ],
        transports: {
            // RPC URL for each chain
            [sepolia.id]: http(),
        },

        // Required API Keys
        walletConnectProjectId: '-',

        // Required App Info
        appName: "Dynamic - Safe",
    }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};