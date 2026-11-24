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

interface PlanoRow {
  id: number;
  assunto: string;
  etapas: string;
  criado_em: string;
}

function gerarRoteiroEstruturado(assunto: string) {
  const tema = assunto.trim();
  return [
    {
      semana: "Semana 1",
      titulo: `Fundamentos e Arquitetura de ${tema}`,
      descricao: `Configuracao do ambiente, conceitos essenciais, sintaxe base e leitura da documentacao oficial de ${tema}.`,
    },
    {
      semana: "Semana 2",
      titulo: `Pratica Guiada com ${tema}`,
      descricao: `Construcao de pequenos exercicios isolados e resolucao de problemas comuns envolvendo ${tema}.`,
    },
    {
      semana: "Semana 3",
      titulo: `Projeto Real Aplicado`,
      descricao: `Desenvolvimento de uma aplicacao funcional integrando ${tema} com boas praticas e controle de versao no Git.`,
    },
    {
      semana: "Semana 4",
      titulo: `Revisao, Testes e Deploy`,
      descricao: `Refatoracao de codigo, revisao dos pontos criticos de ${tema} e publicacao do projeto no portfolio.`,
    },
  ];
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

// --- ROTAS DE PLANOS IA ---
app.get("/planos", (req, res) => {
  const rows = db.prepare("SELECT * FROM planos ORDER BY id DESC").all() as PlanoRow[];
  res.json(rows.map((row) => ({
    id: row.id,
    assunto: row.assunto,
    etapas: JSON.parse(row.etapas),
    criado_em: row.criado_em,
  })));
});

app.post("/planos/gerar", (req, res) => {
  const { assunto } = req.body;
  if (!assunto || typeof assunto !== "string" || assunto.trim() === "") {
    return res.status(400).json({ erro: "O assunto de estudo e obrigatorio." });
  }

  const etapas = gerarRoteiroEstruturado(assunto);
  const info = db.prepare("INSERT INTO planos (assunto, etapas) VALUES (?, ?)").run(
    assunto.trim(),
    JSON.stringify(etapas)
  );

  res.status(201).json({
    id: Number(info.lastInsertRowid),
    assunto: assunto.trim(),
    etapas,
  });
});

app.delete("/planos/:id", (req, res) => {
  const { id } = req.params;
  const info = db.prepare("DELETE FROM planos WHERE id = ?").run(id);
  if (info.changes === 0) return res.status(404).json({ erro: "Plano nao encontrado." });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor API rodando em http://localhost:${PORT}`);
});
