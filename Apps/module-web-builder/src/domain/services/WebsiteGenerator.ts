// src/domain/services/WebsiteGenerator.ts

import { WebsiteProject } from "../entities/WebsiteProject";
import { TemplateConfig, TEMPLATES } from "../../config/templates";
import { FileSystemWriter } from "../../infrastructure/fs/FileSystemWriter";

export class WebsiteGenerator {
  constructor(private fsWriter: FileSystemWriter) {}

  async generate(project: WebsiteProject): Promise<string> {
    const template: TemplateConfig | undefined =
      TEMPLATES[project.templateId];

    if (!template) {
      throw new Error(`Unknown template: ${project.templateId}`);
    }

    const basePath = `./output/web/${project.id}`;

    // کپی فایل‌های پایهٔ تمپلیت
    await this.fsWriter.copyTemplate(template.path, basePath);

    // اعمال تنظیمات (مثلاً نام سایت، توضیحات، تم)
    await this.fsWriter.applyConfig(basePath, {
      name: project.name,
      description: project.description,
      theme: project.theme,
    });

    return basePath;
  }
}
