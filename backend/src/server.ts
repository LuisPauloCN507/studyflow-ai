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

app.get("/", (req, res) => {
  res.json({ status: "online", projeto: "StudyFlow AI API" });
});

app.get("/tarefas", (req, res) => {
  const rows = db.prepare("SELECT * FROM tarefas ORDER BY id ASC").all() as TarefaRow[];
  const tarefas = rows.map((row) => ({
    id: row.id,
    texto: row.texto,
    concluida: Boolean(row.concluida),
  }));
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { texto } = req.body;
  if (!texto || typeof texto !== "string" || texto.trim() === "") {
    return res.status(400).json({ erro: "O texto da tarefa e obrigatorio." });
  }

  const stmt = db.prepare("INSERT INTO tarefas (texto, concluida) VALUES (?, 0)");
  const info = stmt.run(texto.trim());

  res.status(201).json({
    id: Number(info.lastInsertRowid),
    texto: texto.trim(),
    concluida: false,
  });
});

app.patch("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id) as TarefaRow | undefined;

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada." });
  }

  const novoStatus = tarefa.concluida ? 0 : 1;
  db.prepare("UPDATE tarefas SET concluida = ? WHERE id = ?").run(novoStatus, id);

  res.json({
    id: tarefa.id,
    texto: tarefa.texto,
    concluida: Boolean(novoStatus),
  });
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const info = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);

  if (info.changes === 0) {
    return res.status(404).json({ erro: "Tarefa nao encontrada." });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor API rodando em http://localhost:${PORT}`);
});
