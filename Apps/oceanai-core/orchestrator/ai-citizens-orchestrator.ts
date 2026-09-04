// src/orchestrator/ai-citizens-orchestrator.ts

import { Command } from "../domain/commands/types";
import { getAICitizen, updateAICitizen } from "../services/aiCitizensEngine";

export async function routeAICitizenCommand(command: Command): Promise<any> {
  const { citizenId, action } = command.payload;
  if (!citizenId || !action) {
    throw new Error("citizenId and action are required");
  }

  const citizen = await getAICitizen(citizenId);
  if (!citizen) {
    throw new Error(`AI Citizen not found: ${citizenId}`);
  }

  // مثال: تعامل ساده
  if (action === "GREET") {
    return {
      message: `AI Citizen ${citizenId} greets user ${command.userId}`,
    };
  }

  if (action === "COLLABORATE_ON_PROJECT") {
    // منطق همکاری روی پروژه
    await updateAICitizen(citizenId, {
      currentProjectUserId: command.userId,
    });
    return {
      message: `AI Citizen ${citizenId} starts collaborating with user ${command.userId}`,
    };
  }

  return {
    message: `Action ${action} executed for AI Citizen ${citizenId}`,
  };
}
