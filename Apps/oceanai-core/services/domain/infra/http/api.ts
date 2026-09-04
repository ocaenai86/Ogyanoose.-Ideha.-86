// src/infra/http/api.ts

import axios from "axios";

const BASE_URL = process.env.MODULES_BASE_URL || "http://localhost:4000";

export async function callModuleApi(
  path: string,
  body: Record<string, any>
): Promise<any> {
  const url = `${BASE_URL}${path}`;
  const res = await axios.post(url, body);
  return res.data;
}
