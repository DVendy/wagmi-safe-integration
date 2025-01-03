'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, berachainTestnetbArtio } from "wagmi/chains";
import { safe } from 'wagmi/connectors'

const config = createConfig(
    getDefaultConfig({
        chains: [sepolia],
        connectors: [
            safe({
                debug: true
            })
        ],
        transports: {
            [sepolia.id]: http(),
        },
        walletConnectProjectId: '-',
        appName: "Wagmi - Safe",
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