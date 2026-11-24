"use client";

import { useState, useEffect } from "react";
import { Sparkles, Bot, Loader2, BookOpen, PlusCircle, Trash2, Check } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";

export default function PlanosPage() {
  const { planos, gerandoPlano, carregarPlanos, gerarPlano, removerPlano, adicionarTarefa } = useStudyStore();
  const [assunto, setAssunto] = useState("");
  const [etapaAdicionada, setEtapaAdicionada] = useState<string | null>(null);

  useEffect(() => {
    carregarPlanos();
  }, [carregarPlanos]);

  const handleGerar = async () => {
    if (assunto.trim() === "") return;
    await gerarPlano(assunto);
    setAssunto("");
  };

  const handleEnviarParaTarefas = async (chave: string, textoTarefa: string) => {
    await adicionarTarefa(textoTarefa);
    setEtapaAdicionada(chave);
    setTimeout(() => setEtapaAdicionada(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          Gerador de Planos com IA
        </h2>
        <p className="text-gray-500 mt-1">Gere roteiros estruturados, salve no banco e envie etapas direto para suas tarefas.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">O que deseja estudar?</label>
          <textarea 
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Ex: Docker e deploy de aplicacoes Node.js na AWS..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] resize-none"
          />
        </div>
        
        <button 
          onClick={handleGerar}
          disabled={gerandoPlano || assunto.trim() === ""}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          {gerandoPlano ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gerando roteiro no servidor...
            </>
          ) : (
            <>
              <Bot className="w-5 h-5" />
              Gerar e Salvar Plano de Estudos
            </>
          )}
        </button>
      </div>

      {/* Lista de Planos Salvos no Banco */}
      <div className="space-y-6">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-900 font-semibold text-lg">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Roteiro: {plano.assunto}
              </div>
              <button 
                onClick={() => removerPlano(plano.id)}
                className="text-gray-400 hover:text-rose-500 transition-colors p-2"
                title="Excluir plano"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {plano.etapas.map((etapa, idx) => {
                const chave = `${plano.id}-${idx}`;
                const foiAdicionada = etapaAdicionada === chave;
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                        {etapa.semana}
                      </span>
                      <h4 className="font-medium text-gray-900">{etapa.titulo}</h4>
                      <p className="text-gray-600 text-sm mt-1">{etapa.descricao}</p>
                    </div>
                    <button
                      onClick={() => handleEnviarParaTarefas(chave, `[${plano.assunto}] ${etapa.titulo}`)}
                      className="shrink-0 text-xs font-medium px-3 py-2 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 flex items-center gap-1.5 transition-colors"
                    >
                      {foiAdicionada ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">Enviada!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4" />
                          Enviar para Tarefas
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
