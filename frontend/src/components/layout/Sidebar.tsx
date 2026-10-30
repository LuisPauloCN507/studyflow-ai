import Link from "next/link";
import { LayoutDashboard, CheckSquare, Target, Sparkles } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          StudyFlow AI
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href="/tarefas" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors">
          <CheckSquare className="w-5 h-5" />
          Tarefas
        </Link>
        <Link href="/objetivos" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors">
          <Target className="w-5 h-5" />
          Objetivos
        </Link>
        <Link href="/planos" className="flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 rounded-lg transition-colors font-medium">
          <Sparkles className="w-5 h-5" />
          Gerar Plano com IA
        </Link>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 text-center">
          Versão 0.1.0 (MVP)
        </div>
      </div>
    </aside>
  );
}
