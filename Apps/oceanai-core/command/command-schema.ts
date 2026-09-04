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
  rolesAllowed: string[];
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
  CREATE_APP: {
    type: "CREATE_APP",
    fields: [
      { name: "name", required: true, type: "string" },
      { name: "platform", required: true, type: "string" }, // web, mobile
    ],
    rolesAllowed: ["USER", "DEVELOPER"],
  },
  CREATE_BOT: {
    type: "CREATE_BOT",
    fields: [
      { name: "purpose", required: true, type: "string" }, // trading, freelance, content
    ],
    rolesAllowed: ["USER", "DEVELOPER"],
  },
  ANALYZE_MARKET: {
    type: "ANALYZE_MARKET",
    fields: [
      { name: "symbol", required: true, type: "string" },
      { name: "timeframe", required: false, type: "string" },
    ],
    rolesAllowed: ["USER", "TRADER"],
  },
  TRADE: {
    type: "TRADE",
    fields: [
      { name: "symbol", required: true, type: "string" },
      { name: "side", required: true, type: "string" }, // buy/sell
      { name: "amount", required: true, type: "number" },
    ],
    rolesAllowed: ["USER", "TRADER"],
  },
  CREATE_NFT: {
    type: "CREATE_NFT",
    fields: [
      { name: "title", required: true, type: "string" },
      { name: "description", required: false, type: "string" },
      { name: "metadata", required: false, type: "object" },
    ],
    rolesAllowed: ["USER", "ARTIST"],
  },
  START_FREELANCE_PROJECT: {
    type: "START_FREELANCE_PROJECT",
    fields: [
      { name: "title", required: true, type: "string" },
      { name: "budget", required: false, type: "number" },
    ],
    rolesAllowed: ["USER", "FREELANCER"],
  },
  ENTER_WORLD_ZONE: {
    type: "ENTER_WORLD_ZONE",
    fields: [
      { name: "zoneId", required: true, type: "string" },
    ],
    rolesAllowed: ["USER"],
  },
  INTERACT_WITH_AI_CITIZEN: {
    type: "INTERACT_WITH_AI_CITIZEN",
    fields: [
      { name: "citizenId", required: true, type: "string" },
      { name: "action", required: true, type: "string" },
    ],
    rolesAllowed: ["USER"],
  },
  LEARN_TOPIC: {
    type: "LEARN_TOPIC",
    fields: [
      { name: "topic", required: true, type: "string" },
    ],
    rolesAllowed: ["USER"],
  },
};
