import Database from "better-sqlite3";

const db = new Database("database.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    concluida INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS objetivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    concluido INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS planos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assunto TEXT NOT NULL,
    etapas TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
