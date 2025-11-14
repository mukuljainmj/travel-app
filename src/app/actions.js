"user server";

import { openai } from "@ai-sdk/openai";
import { streamUI } from "ai/rsc";

export async function streamUIComponent() {
  const result = await streamUI({
    model: openai("gpt-4o"), // "gpt-3.5-turbo"
    prompt: "Give me some advise to plan a trip to Tolluride, Colorado.",
    text: ({ content }) => <div>{content}</div>,
  });
  return result.value;
}
