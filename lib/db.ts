import { JSONFile } from "lowdb/node";
import path from "path";
import { Database } from "./types";
import { Low } from "lowdb";

const filePath = path.join(process.cwd(), 'db.json')
const adapter = new JSONFile<Database>(filePath)
const defaultData: Database = { products: [] }

export const db = new Low<Database>(adapter, defaultData)

export async function initDB() {
  await db.read()
  db.data ||= defaultData
  await db.write()
}