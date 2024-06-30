import { systemPrompt } from "@/app/api/chat/prompt";
import { createOpenAI } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const openai = createOpenAI({
    baseURL: "https://api.deepseek.com/v1",
    apiKey: "sk-f9acc9e5f5a247d88baddce3e023ab69",
  })
  const result = await streamText({
    model: openai("deepseek-chat"),
    system: systemPrompt,
    messages,
  });
  return result.toAIStreamResponse();
}
