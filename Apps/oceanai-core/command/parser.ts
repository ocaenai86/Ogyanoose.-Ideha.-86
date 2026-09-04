
// src/command/parser.ts

import { detectIntent } from "./intent-detector";
import { normalizeCommand } from "./normalizer";
import { validateCommand } from "./validator";
import { Command, RawInput } from "../domain/commands/types";
import { CommandSchema } from "./command-schema";

export async function parseCommand(input: RawInput): Promise<Command> {
  // 1) تشخیص نیت (Intent)
  const intent = await detectIntent(input);

  // 2) نرمال‌سازی (تبدیل به نوع استاندارد)
  const normalized = normalizeCommand(intent, input);

  // 3) ساخت Command بر اساس Schema
  const schema = CommandSchema[normalized.type];
  if (!schema) {
    throw new Error(`Unknown command type: ${normalized.type}`);
  }

  const command: Command = {
    id: normalized.id,
    type: normalized.type,
    userId: normalized.userId,
    payload: normalized.payload,
    createdAt: new Date(),
  };

  // 4) اعتبارسنجی
  const isValid = validateCommand(command, schema);
  if (!isValid) {
    throw new Error(`Invalid command: ${normalized.type}`);
  }

  return command;
}

// src/domain/commands/types.ts

export type RawInput = {
  text?: string;
  userId: string;
  context?: Record<string, any>;
  payload?: Record<string, any>;
};

export type CommandType =
  | "CREATE_APP"
  | "CREATE_WEBSITE"
  | "CREATE_BOT"
  | "ANALYZE_MARKET"
  | "TRADE"
  | "CREATE_NFT"
  | "START_FREELANCE_PROJECT"
  | "ENTER_WORLD_ZONE"
  | "INTERACT_WITH_AI_CITIZEN"
  | "LEARN_TOPIC";

export interface Command {
  id: string;
  type: CommandType;
  userId: string;
  payload: Record<string, any>;
  createdAt: Date;
}
