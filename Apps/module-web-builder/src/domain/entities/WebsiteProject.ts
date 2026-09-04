// src/domain/entities/WebsiteProject.ts

export class WebsiteProject {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public theme: string | null,
    public templateId: string,
    public createdAt: Date
  ) {}
}
