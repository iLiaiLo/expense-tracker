import cron from "node-cron";
import { pool } from "../db/connectoin.js";
import getQuery from "../utils/getQuery.js";
const startCleanupService = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running scheduled cleanup...");
      const deleteQuery = getQuery("user_queries/HARD_DELETE_ACCOUNT.sql");
      const result = await pool.query(deleteQuery);
      console.log(`Purged ${result.rowCount} accounts.`);
    } catch (error) {
      console.error("Cleanup Task Failed:", error);
    }
  });
};
export default startCleanupService;
