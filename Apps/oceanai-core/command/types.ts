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
