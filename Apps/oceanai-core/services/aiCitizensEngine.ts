// src/services/aiCitizensEngine.ts

type AICitizen = {
  id: string;
  role: string;
  currentProjectUserId?: string;
};

const aiCitizens: Record<string, AICitizen> = {};

export async function getAICitizen(id: string): Promise<AICitizen | null> {
  return aiCitizens[id] || null;
}

export async function updateAICitizen(
  id: string,
  partial: Partial<AICitizen>
): Promise<void> {
  const existing = aiCitizens[id] || { id, role: "UNKNOWN" };
  aiCitizens[id] = {
    ...existing,
    ...partial,
  };
}
