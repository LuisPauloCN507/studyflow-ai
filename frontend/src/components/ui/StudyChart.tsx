"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { dia: "Seg", horas: 2.5 },
  { dia: "Ter", horas: 3.0 },
  { dia: "Qua", horas: 1.5 },
  { dia: "Qui", horas: 4.0 },
  { dia: "Sex", horas: 3.5 },
  { dia: "Sáb", horas: 5.0 },
  { dia: "Dom", horas: 4.5 },
];

export function StudyChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Horas de Estudo na Semana</h3>
        <p className="text-sm text-gray-500">Acompanhe a sua consistência diária.</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} unit="h" />
            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }}
            />
            <Bar dataKey="horas" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
