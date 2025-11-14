"user server";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function generate(input) {
  "use server";
  const stream = createStreamableValue();
  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o"), // "gpt-3.5-turbo"
      system: "You generate fake data for thre people",
      prompt: input,
      schema: z.object({
        people: z.array(
          z.object({
            name: z.string().describe("name of a fake person"),
            address: z.string().describe("US address format"),
            age: z.number(),
          })
        ),
      }),
    });
    for await (const delta of partialObjectStream) {
      stream.update(delta);
    }
    stream.done();
  })();
  return { object: stream.value };
}
