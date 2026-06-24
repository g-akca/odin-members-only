import { Client } from "pg";

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_member BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
  );
`;

async function main() {
  const client = new Client(
    process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    } : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "odin_members_only",
    }
  );

  try {
    console.log("Connecting to the database...");
    await client.connect();
    console.log("Connected. Running initialization SQL...");
    await client.query(SQL);
    console.log("Inventory seed completed.");
  } catch (error) {
    console.error("Failed to seed inventory database:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();