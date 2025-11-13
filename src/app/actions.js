"user server";

import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";

export async function generate(input) {
  const stream = createStreamableValue("");
  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-4o"), // "gpt-3.5-turbo"
      prompt: input,
    });
    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();
  return { output: stream.value };
}
