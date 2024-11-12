'use client';

import useSepoliaTestContract from "@/hooks/useSepoliaTestContract";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function Home() {
  const account = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const sepoliaTestContract = useSepoliaTestContract({ publicClient, walletClient });
  const [number, setNumber] = useState<number>(0);
  const [result, setResult] = useState<string>();

  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isStoring, setIsStoring] = useState(false);

  return (
    <div className="container mx-auto p-10 flex flex-col gap-4 items-start">
      <div className="w-full flex justify-between">
        <div className="font-bold text-2xl">Wagmi - Safe</div>
        <ConnectKitButton showBalance={true} />
      </div>
      {account.isConnected &&
        <>
          <button
            onClick={async () => {
              setIsRetrieving(true);
              setResult(undefined);
              const _result = await sepoliaTestContract.retrieve();
              setResult(JSON.stringify(_result));
              setIsRetrieving(false);
            }}
            className="rounded-lg px-4 py-1 border-2 border-blue-500 text-blue-100 bg-blue-900 hover:bg-blue-800 transition-all font-bold text-sm"
          >
            {isRetrieving ? <>processing...</> : <>Retrieve</>}
          </button>
          <hr className="w-1/2 border border-slate-400" />

          <input type="text" value={number} onChange={(val) => setNumber(Number(val.target.value))} className="text-black" />
          <button
            onClick={async () => {
              setIsStoring(true);
              setResult(undefined);
              const _result = await sepoliaTestContract.store(number);
              setResult(JSON.stringify(_result));
              setIsStoring(false);
            }}
            className="rounded-lg px-4 py-1 border-2 border-blue-500 text-blue-100 bg-blue-900 hover:bg-blue-800 transition-all font-bold text-sm"
          >
            {isStoring ? <>processing...</> : <>Store</>}
          </button>
          {result !== undefined &&
            <div>{result}</div>
          }
        </>
      }
    </div>
  );
}
