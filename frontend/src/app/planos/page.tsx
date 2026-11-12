"use client";

import { useState } from "react";
import { Sparkles, Bot, Loader2, BookOpen } from "lucide-react";

export default function PlanosPage() {
  const [assunto, setAssunto] = useState("");
  const [gerando, setGerando] = useState(false);
  const [planoGerado, setPlanoGerado] = useState(false);

  const gerarPlano = () => {
    if (assunto.trim() === "") return;
    setGerando(true);
    
    // Simula o tempo de resposta de uma Inteligência Artificial
    setTimeout(() => {
      setGerando(false);
      setPlanoGerado(true);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          Gerador de Planos com IA
        </h2>
        <p className="text-gray-500 mt-1">Diga o que quer aprender e a IA monta o seu roteiro de estudos.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">O que deseja estudar?</label>
          <textarea 
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Ex: Quero aprender os fundamentos de Node.js e criar uma API REST..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] resize-none"
          />
        </div>
        
        <button 
          onClick={gerarPlano}
          disabled={gerando || assunto.trim() === ""}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          {gerando ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              A processar com IA...
            </>
          ) : (
            <>
              <Bot className="w-5 h-5" />
              Gerar Plano de Estudos
            </>
          )}
        </button>
      </div>

      {/* Área de Resultado Simulado */}
      {planoGerado && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 text-indigo-800 font-semibold text-lg">
            <BookOpen className="w-5 h-5" />
            Roteiro Sugerido
          </div>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <h4 className="font-medium text-gray-900">Semana 1: Fundamentos</h4>
              <p className="text-gray-600 text-sm mt-1">Conceitos básicos, sintaxe e primeiros passos.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <h4 className="font-medium text-gray-900">Semana 2: Prática e Projetos</h4>
              <p className="text-gray-600 text-sm mt-1">Criação de um projeto prático aplicando o conhecimento adquirido.</p>
            </div>
          </div>
          <p className="text-xs text-center text-indigo-400 mt-4">
            *(Nota: Esta é uma simulação visual. A ligação real à IA será feita na fase do Backend)*
          </p>
        </div>
      )}
    </div>
  );
}
