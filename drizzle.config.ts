import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();
 
export default {
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://docker:docker@localhost:5432/api_pass',
  }
} satisfies Config;