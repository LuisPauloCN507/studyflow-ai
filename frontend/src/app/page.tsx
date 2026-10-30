import { StatsCard } from "@/components/ui/StatsCard";
import { CheckSquare, Clock, Target, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Olá, Estudante! 👋</h2>
        <p className="text-gray-500 mt-1">Aqui está o resumo do seu progresso hoje.</p>
      </div>

      {/* Grade de Cartões (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Tarefas Concluídas" 
          value="12/15" 
          icon={<CheckSquare className="w-5 h-5" />} 
          trend="+2 hoje"
          trendUp={true}
        />
        <StatsCard 
          title="Horas de Foco" 
          value="4h 30m" 
          icon={<Clock className="w-5 h-5" />} 
          trend="+1h vs ontem"
          trendUp={true}
        />
        <StatsCard 
          title="Objetivos Ativos" 
          value="3" 
          icon={<Target className="w-5 h-5" />} 
        />
        <StatsCard 
          title="Ofensiva (Dias)" 
          value="7" 
          icon={<Flame className="w-5 h-5" />} 
          trend="Fogo não apaga!"
          trendUp={true}
        />
      </div>
      
      {/* Espaço para futuros componentes (Gráficos ou Lista de Tarefas) */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center border-dashed">
        <p className="text-gray-400">Área reservada para o Gráfico de Desempenho (Em breve)</p>
      </div>
    </div>
  );
}
