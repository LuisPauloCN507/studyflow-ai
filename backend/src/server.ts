import express from "express";
import cors from "cors";
import db from "./database";

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

interface TarefaRow {
  id: number;
  texto: string;
  concluida: number;
}

interface ObjetivoRow {
  id: number;
  titulo: string;
  concluido: number;
}

app.get("/", (req, res) => {
  res.json({ status: "online", projeto: "StudyFlow AI API" });
});

// --- ROTAS DE TAREFAS ---
app.get("/tarefas", (req, res) => {
  const rows = db.prepare("SELECT * FROM tarefas ORDER BY id ASC").all() as TarefaRow[];
  res.json(rows.map((row) => ({
    id: row.id,
    texto: row.texto,
    concluida: Boolean(row.concluida),
  })));
});

app.post("/tarefas", (req, res) => {
  const { texto } = req.body;
  if (!texto || typeof texto !== "string" || texto.trim() === "") {
    return res.status(400).json({ erro: "O texto da tarefa e obrigatorio." });
  }
  const info = db.prepare("INSERT INTO tarefas (texto, concluida) VALUES (?, 0)").run(texto.trim());
  res.status(201).json({
    id: Number(info.lastInsertRowid),
    texto: texto.trim(),
    concluida: false,
  });
});

app.patch("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id) as TarefaRow | undefined;
  if (!tarefa) return res.status(404).json({ erro: "Tarefa nao encontrada." });

  const novoStatus = tarefa.concluida ? 0 : 1;
  db.prepare("UPDATE tarefas SET concluida = ? WHERE id = ?").run(novoStatus, id);
  res.json({ id: tarefa.id, texto: tarefa.texto, concluida: Boolean(novoStatus) });
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const info = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);
  if (info.changes === 0) return res.status(404).json({ erro: "Tarefa nao encontrada." });
  res.status(204).send();
});

// --- ROTAS DE OBJETIVOS ---
app.get("/objetivos", (req, res) => {
  const rows = db.prepare("SELECT * FROM objetivos ORDER BY id ASC").all() as ObjetivoRow[];
  res.json(rows.map((row) => ({
    id: row.id,
    titulo: row.titulo,
    concluido: Boolean(row.concluido),
  })));
});

app.post("/objetivos", (req, res) => {
  const { titulo } = req.body;
  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ erro: "O titulo do objetivo e obrigatorio." });
  }
  const info = db.prepare("INSERT INTO objetivos (titulo, concluido) VALUES (?, 0)").run(titulo.trim());
  res.status(201).json({
    id: Number(info.lastInsertRowid),
    titulo: titulo.trim(),
    concluido: false,
  });
});

app.patch("/objetivos/:id", (req, res) => {
  const { id } = req.params;
  const objetivo = db.prepare("SELECT * FROM objetivos WHERE id = ?").get(id) as ObjetivoRow | undefined;
  if (!objetivo) return res.status(404).json({ erro: "Objetivo nao encontrado." });

  const novoStatus = objetivo.concluido ? 0 : 1;
  db.prepare("UPDATE objetivos SET concluido = ? WHERE id = ?").run(novoStatus, id);
  res.json({ id: objetivo.id, titulo: objetivo.titulo, concluido: Boolean(novoStatus) });
});

app.delete("/objetivos/:id", (req, res) => {
  const { id } = req.params;
  const info = db.prepare("DELETE FROM objetivos WHERE id = ?").run(id);
  if (info.changes === 0) return res.status(404).json({ erro: "Objetivo nao encontrado." });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor API rodando em http://localhost:${PORT}`);
});
