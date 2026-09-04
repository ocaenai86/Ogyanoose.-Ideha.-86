// src/command/normalizer.ts

import { RawInput, CommandType } from "../domain/commands/types";
import { DetectedIntent } from "./intent-detector";
import { v4 as uuid } from "uuid";

export type NormalizedCommand = {
  id: string;
  type: CommandType;
  userId: string;
  payload: Record<string, any>;
};

export function normalizeCommand(
  intent: DetectedIntent,
  input: RawInput
): NormalizedCommand {
  return {
    id: uuid(),
    type: intent.type,
    userId: input.userId,
    payload: {
      ...intent.payload,
      ...(input.payload || {}),
    },
  };
}
