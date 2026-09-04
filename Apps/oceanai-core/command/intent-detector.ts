// src/command/intent-detector.ts

import { RawInput } from "../domain/commands/types";
import { CommandType } from "../domain/commands/types";
import { callLLM } from "../models/llm";

export type DetectedIntent = {
  type: CommandType;
  confidence: number;
  payload: Record<string, any>;
};

export async function detectIntent(input: RawInput): Promise<DetectedIntent> {
  if (!input.text) {
    throw new Error("No text provided for intent detection");
  }

  const prompt = `
    کاربر این متن را گفته است:
    "${input.text}"

    نوع فرمان را از بین این‌ها انتخاب کن:
    CREATE_APP, CREATE_WEBSITE, CREATE_BOT, ANALYZE_MARKET, TRADE,
    CREATE_NFT, START_FREELANCE_PROJECT, ENTER_WORLD_ZONE,
    INTERACT_WITH_AI_CITIZEN, LEARN_TOPIC

    و payload مناسب را استخراج کن.
  `;

  const llmResult = await callLLM(prompt);

  // اینجا فرض می‌کنیم llmResult را به شکل مناسب پارس می‌کنیم
  const intent: DetectedIntent = {
    type: llmResult.type as CommandType,
    confidence: llmResult.confidence || 0.9,
    payload: llmResult.payload || {},
  };

  return intent;
}
