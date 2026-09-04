// src/orchestrator/router.ts

import { Command } from "../domain/commands/types";
import { runWorkflow } from "./workflow-engine";
import { routeWorldCommand } from "./world-orchestrator";
import { routeEconomyCommand } from "./economy-orchestrator";
import { routeAICitizenCommand } from "./ai-citizens-orchestrator";
import { invokeModule } from "../services/moduleInvoker";

export async function routeCommand(command: Command): Promise<any> {
  switch (command.type) {
    case "CREATE_APP":
      return invokeModule("app-builder", command);

    case "CREATE_WEBSITE":
      return invokeModule("web-builder", command);

    case "CREATE_BOT":
      return invokeModule("bot-factory", command);

    case "ANALYZE_MARKET":
      return invokeModule("crypto-analytics", command);

    case "TRADE":
      // ممکن است Workflow ترکیبی باشد
      return runWorkflow("TRADING_WORKFLOW", command);

    case "CREATE_NFT":
      return invokeModule("nft-lab", command);

    case "START_FREELANCE_PROJECT":
      return invokeModule("freelance-hub", command);

    case "ENTER_WORLD_ZONE":
      return routeWorldCommand(command);

    case "INTERACT_WITH_AI_CITIZEN":
      return routeAICitizenCommand(command);

    case "LEARN_TOPIC":
      return invokeModule("academy", command);

    default:
      throw new Error(`No route defined for command type: ${command.type}`);
  }
}
