// src/command/validator.ts

import { Command } from "../domain/commands/types";
import { CommandDefinition, CommandSchema } from "./command-schema";

export function validateCommand(
  command: Command,
  schema: CommandDefinition
): boolean {
  for (const field of schema.fields) {
    const value = command.payload[field.name];
    if (field.required && (value === undefined || value === null)) {
      return false;
    }
    if (value !== undefined && value !== null) {
      const type = typeof value;
      if (
        field.type === "string" &&
        type !== "string"
      ) return false;
      if (
        field.type === "number" &&
        type !== "number"
      ) return false;
      if (
        field.type === "boolean" &&
        type !== "boolean"
      ) return false;
      if (
        field.type === "object" &&
        (type !== "object" || Array.isArray(value))
      ) return false;
      if (
        field.type === "array" &&
        !Array.isArray(value)
      ) return false;
    }
  }

  return true;
}
