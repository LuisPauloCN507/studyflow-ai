import { create } from "zustand";

export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

interface StudyState {
  tarefas: Tarefa[];
  carregando: boolean;
  carregarTarefas: () => Promise<void>;
  adicionarTarefa: (texto: string) => Promise<void>;
  alternarTarefa: (id: number) => Promise<void>;
  removerTarefa: (id: number) => Promise<void>;
}

const API_URL = "http://localhost:3333";

export const useStudyStore = create<StudyState>((set) => ({
  tarefas: [],
  carregando: false,

  carregarTarefas: async () => {
    set({ carregando: true });
    try {
      const res = await fetch(`${API_URL}/tarefas`);
      const dados = await res.json();
      set({ tarefas: dados, carregando: false });
    } catch (erro) {
      console.error("Erro ao carregar tarefas:", erro);
      set({ carregando: false });
    }
  },

  adicionarTarefa: async (texto) => {
    try {
      const res = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });
      const nova = await res.json();
      set((state) => ({ tarefas: [...state.tarefas, nova] }));
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  },

  alternarTarefa: async (id) => {
    try {
      const res = await fetch(`${API_URL}/tarefas/${id}`, {
        method: "PATCH",
      });
      const atualizada = await res.json();
      set((state) => ({
        tarefas: state.tarefas.map((t) => (t.id === id ? atualizada : t)),
      }));
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  },

  removerTarefa: async (id) => {
    try {
      await fetch(`${API_URL}/tarefas/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        tarefas: state.tarefas.filter((t) => t.id !== id),
      }));
    } catch (erro) {
      console.error("Erro ao remover tarefa:", erro);
    }
  },
}));
