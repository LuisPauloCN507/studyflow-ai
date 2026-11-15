"use client";

import { StatsCard } from "@/components/ui/StatsCard";
import { CheckSquare, Clock, Target, Flame } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const tarefas = useStudyStore((state) => state.tarefas);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const concluidas = tarefas.filter(t => t.concluida).length;
  const total = tarefas.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Olá, Estudante! 👋</h2>
        <p className="text-gray-500 mt-1">Aqui está o resumo do seu progresso em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Tarefas Concluídas" 
          value={`${concluidas}/${total}`} 
          icon={<CheckSquare className="w-5 h-5" />} 
          trend={total > 0 ? "A ler dados reais!" : "Sem tarefas"}
          trendUp={true}
        />
        <StatsCard title="Horas de Foco" value="4h 30m" icon={<Clock className="w-5 h-5" />} trend="+1h vs ontem" trendUp={true} />
        <StatsCard title="Objetivos Ativos" value="3" icon={<Target className="w-5 h-5" />} />
        <StatsCard title="Ofensiva (Dias)" value="7" icon={<Flame className="w-5 h-5" />} trend="Fogo não apaga!" trendUp={true} />
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center border-dashed">
        <p className="text-gray-400">Área reservada para o Gráfico de Desempenho (Próxima etapa)</p>
      </div>
    </div>
  );
}
