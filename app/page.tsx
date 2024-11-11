'use client';

import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <div className="container mx-auto p-10 flex flex-col gap-4">
      <div className="font-bold text-2xl">Wagmi - Safe</div>
      <ConnectKitButton />
    </div>
  );
}
