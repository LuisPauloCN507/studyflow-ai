import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

interface StudyState {
  tarefas: Tarefa[];
  adicionarTarefa: (texto: string) => void;
  alternarTarefa: (id: number) => void;
  removerTarefa: (id: number) => void;
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set) => ({
      tarefas: [],
      adicionarTarefa: (texto) => set((state) => ({
        tarefas: [...state.tarefas, { id: Date.now(), texto, concluida: false }]
      })),
      alternarTarefa: (id) => set((state) => ({
        tarefas: state.tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
      })),
      removerTarefa: (id) => set((state) => ({
        tarefas: state.tarefas.filter(t => t.id !== id)
      })),
    }),
    { name: "studyflow-storage" } // O nome do "cofre" no navegador
  )
);
