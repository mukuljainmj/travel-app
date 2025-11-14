"use client";

import { useState } from "react";
import { generate } from "./actions";
import { getStreamableValue } from "ai/rsc";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={async () => {
          const { object } = await generate(
            "People who sound like they have superhero names"
          );
          for await (const delta of getStreamableValue(object)) {
            if (delta) {
              setGeneration(JSON.stringify(delta.people, null, 2));
            }
          }
        }}
      >
        View People!
      </button>
      <pre>{generation}</pre>
    </main>
  );
}
