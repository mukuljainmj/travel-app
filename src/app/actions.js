"user server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function getAnswer(question) {
  const text = await generateText({
    model: openai("gpt-4o"), // "gpt-3.5-turbo"
    prompt: question,
  });

  return { text };
}
