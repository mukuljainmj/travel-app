"use client";

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { generate } from "./actions";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={async () => {
          const { output } = await generate("What is the deepest lake in US ?");
          for await (const delta of readStreamableValue(output)) {
            setGeneration(
              (currentGeneration) => `${currentGeneration}${delta}`
            );
          }
        }}
      >
        Ask!
      </button>
      <div>{generation}</div>
    </main>
  );
}
