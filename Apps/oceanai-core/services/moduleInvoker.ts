// src/services/moduleInvoker.ts

import { Command } from "../domain/commands/types";
import { callModuleApi } from "../infra/http/api";
import { logModuleCall } from "./logs";

export type ModuleName =
  | "app-builder"
  | "web-builder"
  | "bot-factory"
  | "design-studio"
  | "crypto-analytics"
  | "trading-engine"
  | "nft-lab"
  | "freelance-hub"
  | "academy";

const MODULE_ENDPOINTS: Record<ModuleName, string> = {
  "app-builder": "/modules/app-builder/execute",
  "web-builder": "/modules/web-builder/execute",
  "bot-factory": "/modules/bot-factory/execute",
  "design-studio": "/modules/design-studio/execute",
  "crypto-analytics": "/modules/crypto-analytics/execute",
  "trading-engine": "/modules/trading-engine/execute",
  "nft-lab": "/modules/nft-lab/execute",
  "freelance-hub": "/modules/freelance-hub/execute",
  academy: "/modules/academy/execute",
};

export async function invokeModule(
  moduleName: ModuleName,
  command: Command
): Promise<any> {
  const endpoint = MODULE_ENDPOINTS[moduleName];
  if (!endpoint) {
    throw new Error(`Unknown module: ${moduleName}`);
  }

  await logModuleCall(moduleName, command);

  const response = await callModuleApi(endpoint, {
    commandType: command.type,
    payload: command.payload,
    userId: command.userId,
  });

  return response;
}
