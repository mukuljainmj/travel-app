"use client";

import { useState } from "react";
import { streamUIComponent } from "./actions";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const [component, setComponent] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const comp = await streamUIComponent();
          setComponent(comp);
        }}
      >
        <button type="submit">Get Component!</button>
      </form>
      <div>{component}</div>
    </main>
  );
}
