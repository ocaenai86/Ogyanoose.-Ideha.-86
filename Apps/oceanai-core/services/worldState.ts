// src/services/worldState.ts

let worldState: any = {
  zones: [],
  lastEnteredZone: null,
  lastUserId: null,
};

export async function getWorldState(): Promise<any> {
  // در نسخهٔ واقعی، این باید از دیتابیس خوانده شود
  return worldState;
}

export async function updateWorldState(partial: Record<string, any>): Promise<void> {
  worldState = {
    ...worldState,
    ...partial,
  };
}
