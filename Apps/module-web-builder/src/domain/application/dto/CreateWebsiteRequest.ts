// src/application/dto/CreateWebsiteRequest.ts

export interface CreateWebsiteRequest {
  userId: string;
  name: string;
  description?: string;
  theme?: string;
  templateId?: string;
}
