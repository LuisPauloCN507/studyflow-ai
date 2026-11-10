"use client";

import { useState } from "react";
import { Target, Plus, Trash2, Trophy } from "lucide-react";

interface Objetivo {
  id: number;
  titulo: string;
  concluido: boolean;
}

export default function ObjetivosPage() {
  const [objetivos, setObjetivos] = useState<Objetivo[]>([
    { id: 1, titulo: "Terminar o curso de HTML5 e CSS3 do Guanabara", concluido: false },
    { id: 2, titulo: "Dominar comandos do Git e GitLab", concluido: true },
  ]);
  const [novoObjetivo, setNovoObjetivo] = useState("");

  const adicionarObjetivo = () => {
    if (novoObjetivo.trim() === "") return;
    setObjetivos([...objetivos, { id: Date.now(), titulo: novoObjetivo, concluido: false }]);
    setNovoObjetivo("");
  };

  const alternarStatus = (id: number) => {
    setObjetivos(objetivos.map(o => o.id === id ? { ...o, concluido: !o.concluido } : o));
  };

  const deletarObjetivo = (id: number) => {
    setObjetivos(objetivos.filter(o => o.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" />
          Meus Objetivos
        </h2>
        <p className="text-gray-500 mt-1">Defina metas claras para a sua jornada de desenvolvimento.</p>
      </div>

      {/* Área de Novo Objetivo */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3">
        <input 
          type="text" 
          value={novoObjetivo}
          onChange={(e) => setNovoObjetivo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionarObjetivo()}
          placeholder="Ex: Dominar Next.js até o fim do mês..." 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button 
          onClick={adicionarObjetivo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      {/* Grade de Objetivos */}
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
                onClick={() => alternarStatus(objetivo.id)} 
                className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${objetivo.concluido ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {objetivo.concluido ? "Concluído" : "Marcar como Concluído"}
              </button>
              <button onClick={() => deletarObjetivo(objetivo.id)} className="text-gray-400 hover:text-rose-500 transition-colors p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
