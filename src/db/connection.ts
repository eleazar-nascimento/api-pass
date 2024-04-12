import postgres from "postgres";
import { env } from "../env";
import * as schema from './schema'
import { drizzle } from "drizzle-orm/postgres-js";

const connection = postgres(env.DATABASE_URL)

export const db = drizzle(connection, { schema })