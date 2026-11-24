"use client";

import { StatsCard } from "@/components/ui/StatsCard";
import { StudyChart } from "@/components/ui/StudyChart";
import { CheckSquare, Clock, Target, Flame } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { useEffect } from "react";

export default function Home() {
  const { tarefas, objetivos, carregarTarefas, carregarObjetivos } = useStudyStore();

  useEffect(() => {
    carregarTarefas();
    carregarObjetivos();
  }, [carregarTarefas, carregarObjetivos]);

  const concluidas = tarefas.filter(t => t.concluida).length;
  const totalTarefas = tarefas.length;
  const objetivosAtivos = objetivos.filter(o => !o.concluido).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Olá, Estudante! 👋</h2>
        <p className="text-gray-500 mt-1">Aqui está o resumo do seu progresso em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Tarefas Concluídas" 
          value={`${concluidas}/${totalTarefas}`} 
          icon={<CheckSquare className="w-5 h-5" />} 
          trend={totalTarefas > 0 ? "Sincronizado com SQLite" : "Sem tarefas"}
          trendUp={true}
        />
        <StatsCard title="Horas de Foco" value="4h 30m" icon={<Clock className="w-5 h-5" />} trend="+1h vs ontem" trendUp={true} />
        <StatsCard 
          title="Objetivos Ativos" 
          value={String(objetivosAtivos)} 
          icon={<Target className="w-5 h-5" />}
          trend={`${objetivos.length} no total`}
          trendUp={true}
        />
        <StatsCard title="Ofensiva (Dias)" value="7" icon={<Flame className="w-5 h-5" />} trend="Fogo não apaga!" trendUp={true} />
      </div>
      
      <StudyChart />
    </div>
  );
}
