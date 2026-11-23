import Database from "better-sqlite3";

const db = new Database("database.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    concluida INTEGER NOT NULL DEFAULT 0
  )
`);

export default db;
