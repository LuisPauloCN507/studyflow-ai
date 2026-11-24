"use client";

import { useState, useEffect } from "react";
import { Target, Plus, Trash2, Trophy } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";

export default function ObjetivosPage() {
  const { objetivos, carregarObjetivos, adicionarObjetivo, alternarObjetivo, removerObjetivo } = useStudyStore();
  const [novoObjetivo, setNovoObjetivo] = useState("");

  useEffect(() => {
    carregarObjetivos();
  }, [carregarObjetivos]);

  const handleAdd = async () => {
    if (novoObjetivo.trim() === "") return;
    await adicionarObjetivo(novoObjetivo);
    setNovoObjetivo("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" />
          Meus Objetivos
        </h2>
        <p className="text-gray-500 mt-1">Defina metas claras sincronizadas com o banco de dados.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3">
        <input 
          type="text" 
          value={novoObjetivo}
          onChange={(e) => setNovoObjetivo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Ex: Dominar Next.js e Node.js até o fim do mês..." 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button 
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      {objetivos.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          Nenhum objetivo cadastrado ainda. Adicione a sua primeira meta acima!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objetivos.map((objetivo) => (
            <div key={objetivo.id} className={`p-5 rounded-xl border ${objetivo.concluido ? "bg-emerald-50 border-emerald-200" : "bg-white border-gray-100 shadow-sm"} flex flex-col justify-between gap-4 transition-all`}>
              <div className="flex justify-between items-start">
                <h3 className={`font-medium ${objetivo.concluido ? "text-emerald-700 line-through" : "text-gray-800"}`}>
                  {objetivo.titulo}
                </h3>
                <Trophy className={`w-5 h-5 ${objetivo.concluido ? "text-emerald-500" : "text-gray-300"}`} />
              </div>
              
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100/50">
                <button 
                  onClick={() => alternarObjetivo(objetivo.id)} 
                  className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${objetivo.concluido ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {objetivo.concluido ? "Concluído" : "Marcar como Concluído"}
                </button>
                <button onClick={() => removerObjetivo(objetivo.id)} className="text-gray-400 hover:text-rose-500 transition-colors p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
