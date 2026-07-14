import { Pool } from "pg";
import dotenv from "dotenv";
import { createSchemaQuery } from "../queries/schemas/CREATE_EXPENSE_TRACKER_SCHEMA.js";
import { createUsersTableQuery } from "../queries/user_queries/CREATE_USERS_TABLE.js";
import { createExpensesTableQuery } from "../queries/expense_queries/CREATE_EXPENSES_TABLE.js";

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

const connectToDb = async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query(createSchemaQuery);
    await client.query(createUsersTableQuery);
    await client.query(createExpensesTableQuery);

    await client.query("COMMIT");

    console.log("successfully connected to database!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("error during database connection " + error.message);
    throw error;
  } finally {
    client.release();
  }
};

export { connectToDb, pool };
