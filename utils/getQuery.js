import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const getQuery = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "..", "queries", filename);
  return fs.readFileSync(filePath, "utf8");
};
export default getQuery;
