import { neon } from "@neondatabase/serverless";

if (!process.env.NEONDB_URL) {
  throw new Error('Missing environment variable: "NEONDB_URL"');
}

export const sql = neon(process.env.NEONDB_URL);
