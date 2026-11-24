"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckSquare, Square } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";

export default function TarefasPage() {
  const { tarefas, carregando, carregarTarefas, adicionarTarefa, alternarTarefa, removerTarefa } = useStudyStore();
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    carregarTarefas();
  }, [carregarTarefas]);

  const handleAdd = async () => {
    if (novaTarefa.trim() === "") return;
    await adicionarTarefa(novaTarefa);
    setNovaTarefa("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Tarefas</h2>
        <p className="text-gray-500 mt-1">Sincronizado em tempo real com o banco SQLite.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3">
        <input 
          type="text" 
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="O que precisa de estudar hoje?" 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button 
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {carregando && tarefas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">A carregar tarefas do servidor...</div>
        ) : tarefas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Nenhuma tarefa pendente. Excelente trabalho!</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {tarefas.map((tarefa) => (
              <li key={tarefa.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <button onClick={() => alternarTarefa(tarefa.id)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                    {tarefa.concluida ? <CheckSquare className="w-5 h-5 text-indigo-600" /> : <Square className="w-5 h-5" />}
                  </button>
                  <span className={tarefa.concluida ? "font-medium text-gray-400 line-through" : "font-medium text-gray-700"}>
                    {tarefa.texto}
                  </span>
                </div>
                <button onClick={() => removerTarefa(tarefa.id)} className="text-gray-400 hover:text-rose-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
