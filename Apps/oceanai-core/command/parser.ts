// src/command/parser.ts

import { detectIntent } from "./intent-detector";
import { normalizeCommand } from "./normalizer";
import { validateCommand } from "./validator";
import { Command, RawInput } from "../domain/commands/types";
import { CommandSchema } from "./command-schema";

export async function parseCommand(input: RawInput): Promise<Command> {
  const intent = await detectIntent(input);
  const normalized = normalizeCommand(intent, input);

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

  const isValid = validateCommand(command, schema);
  if (!isValid) {
    throw new Error(`Invalid command: ${normalized.type}`);
  }

  return command;
}
