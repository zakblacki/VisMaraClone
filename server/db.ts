import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

// Parse DATABASE_URL and remove unsupported sslmode parameter
function parseConnectionUrl(url: string): mysql.PoolOptions {
  const parsed = new URL(url);
  
  // Extract connection options
  const options: mysql.PoolOptions = {
    host: parsed.hostname,
    port: parseInt(parsed.port) || 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.slice(1),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // Parse query parameters, skipping unsupported ones like sslmode
  const searchParams = parsed.searchParams;
  if (searchParams.has("ssl") && searchParams.get("ssl") !== "false") {
    options.ssl = { rejectUnauthorized: false };
  }
  // Handle sslmode parameter by converting to mysql2 ssl option
  if (searchParams.has("sslmode")) {
    const sslmode = searchParams.get("sslmode");
    if (sslmode === "require" || sslmode === "verify-ca" || sslmode === "verify-full") {
      options.ssl = { rejectUnauthorized: sslmode === "verify-full" };
    }
  }

  return options;
}

const pool = mysql.createPool(parseConnectionUrl(process.env.DATABASE_URL));

export const db = drizzle(pool, { schema, mode: "default" });
