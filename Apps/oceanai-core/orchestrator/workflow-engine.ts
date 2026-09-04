// src/orchestrator/workflow-engine.ts

import { Command } from "../domain/commands/types";
import { invokeModule } from "../services/moduleInvoker";

export type WorkflowId = "TRADING_WORKFLOW" | "FULL_WEB_PROJECT";

export async function runWorkflow(
  workflowId: WorkflowId,
  command: Command
): Promise<any> {
  switch (workflowId) {
    case "TRADING_WORKFLOW":
      // مثال: تحلیل + ترید
      const analysis = await invokeModule("crypto-analytics", command);
      const tradeResult = await invokeModule("trading-engine", {
        ...command,
        payload: {
          ...command.payload,
          analysis,
        },
      } as any);
      return { analysis, tradeResult };

    case "FULL_WEB_PROJECT":
      // مثال: ساخت سایت + ساخت ربات + دیپلوی
      const web = await invokeModule("web-builder", command);
      const bot = await invokeModule("bot-factory", command);
      // اینجا می‌توانی ماژول دیپلوی هم اضافه کنی
      return { web, bot };

    default:
      throw new Error(`Unknown workflow: ${workflowId}`);
  }
}
