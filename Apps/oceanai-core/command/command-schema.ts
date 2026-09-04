// src/command/command-schema.ts

import { CommandType } from "../domain/commands/types";

export type CommandField = {
  name: string;
  required: boolean;
  type: "string" | "number" | "boolean" | "object" | "array";
};

export type CommandDefinition = {
  type: CommandType;
  fields: CommandField[];
  rolesAllowed: string[]; // مثلا ["USER", "AI_ADMIN"]
};

export const CommandSchema: Record<CommandType, CommandDefinition> = {
  CREATE_WEBSITE: {
    type: "CREATE_WEBSITE",
    fields: [
      { name: "name", required: true, type: "string" },
      { name: "description", required: false, type: "string" },
      { name: "theme", required: false, type: "string" },
    ],
    rolesAllowed: ["USER", "DESIGNER"],
  },
  // بقیهٔ Commandها همین‌طور...
} as any;
