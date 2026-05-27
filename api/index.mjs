// Vercel serverless function handler for EdgeAI API Server
import handler from "../artifacts/api-server/dist/index.mjs";

export default async function (req, res) {
  return handler(req, res);
}
