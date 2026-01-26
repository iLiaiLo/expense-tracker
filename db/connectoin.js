import { Pool } from "pg";
import dotenv from "dotenv";
import getQuery from "../utils/getQuery.js";

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

const connectToDb = async () => {
  const client = await pool.connect();
  try {
    const createSchema = getQuery("schemas/CREATE_EXPENSE_TRACKER_SCHEMA.sql");
    const createExpensesTable = getQuery(
      "expense_queries/CREATE_EXPENSES_TABLE.sql"
    );
    const createUsersTable = getQuery("user_queries/CREATE_USERS_TABLE.sql");

    await client.query("BEGIN");
    await client.query(createSchema);
    await client.query(createUsersTable);
    await client.query(createExpensesTable);

    await client.query("COMMIT");

    console.log("successfully connected to database!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("error during database connection " + error.message);
  } finally {
    client.release();
  }
};

export { connectToDb, pool };
