// src/orchestrator/world-orchestrator.ts

import { Command } from "../domain/commands/types";
import { updateWorldState, getWorldState } from "../services/worldState";

export async function routeWorldCommand(command: Command): Promise<any> {
  const zoneId = command.payload.zoneId;
  if (!zoneId) {
    throw new Error("zoneId is required for ENTER_WORLD_ZONE");
  }

  const world = await getWorldState();

  // اینجا می‌توانی منطق ورود به زون‌ها را تعریف کنی
  const zone = world.zones.find((z: any) => z.id === zoneId);
  if (!zone) {
    throw new Error(`Zone not found: ${zoneId}`);
  }

  // مثلا: ثبت رویداد ورود کاربر
  await updateWorldState({
    lastEnteredZone: zoneId,
    lastUserId: command.userId,
  });

  return {
    message: `User ${command.userId} entered zone ${zoneId}`,
    zone,
  };
}
