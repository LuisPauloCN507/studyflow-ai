import { create } from "zustand";

export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

export interface Objetivo {
  id: number;
  titulo: string;
  concluido: boolean;
}

export interface PlanoEtapa {
  semana: string;
  titulo: string;
  descricao: string;
}

export interface PlanoEstudo {
  id: number;
  assunto: string;
  etapas: PlanoEtapa[];
}

interface StudyState {
  tarefas: Tarefa[];
  objetivos: Objetivo[];
  planos: PlanoEstudo[];
  carregando: boolean;
  gerandoPlano: boolean;
  carregarTarefas: () => Promise<void>;
  adicionarTarefa: (texto: string) => Promise<void>;
  alternarTarefa: (id: number) => Promise<void>;
  removerTarefa: (id: number) => Promise<void>;
  carregarObjetivos: () => Promise<void>;
  adicionarObjetivo: (titulo: string) => Promise<void>;
  alternarObjetivo: (id: number) => Promise<void>;
  removerObjetivo: (id: number) => Promise<void>;
  carregarPlanos: () => Promise<void>;
  gerarPlano: (assunto: string) => Promise<void>;
  removerPlano: (id: number) => Promise<void>;
}

const API_URL = "http://localhost:3333";

export const useStudyStore = create<StudyState>((set) => ({
  tarefas: [],
  objetivos: [],
  planos: [],
  carregando: false,
  gerandoPlano: false,

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

  carregarObjetivos: async () => {
    try {
      const res = await fetch(`${API_URL}/objetivos`);
      const dados = await res.json();
      set({ objetivos: dados });
    } catch (erro) {
      console.error("Erro ao carregar objetivos:", erro);
    }
  },

  adicionarObjetivo: async (titulo) => {
    try {
      const res = await fetch(`${API_URL}/objetivos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo }),
      });
      const novo = await res.json();
      set((state) => ({ objetivos: [...state.objetivos, novo] }));
    } catch (erro) {
      console.error("Erro ao adicionar objetivo:", erro);
    }
  },

  alternarObjetivo: async (id) => {
    try {
      const res = await fetch(`${API_URL}/objetivos/${id}`, {
        method: "PATCH",
      });
      const atualizado = await res.json();
      set((state) => ({
        objetivos: state.objetivos.map((o) => (o.id === id ? atualizado : o)),
      }));
    } catch (erro) {
      console.error("Erro ao atualizar objetivo:", erro);
    }
  },

  removerObjetivo: async (id) => {
    try {
      await fetch(`${API_URL}/objetivos/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        objetivos: state.objetivos.filter((o) => o.id !== id),
      }));
    } catch (erro) {
      console.error("Erro ao remover objetivo:", erro);
    }
  },

  carregarPlanos: async () => {
    try {
      const res = await fetch(`${API_URL}/planos`);
      const dados = await res.json();
      set({ planos: dados });
    } catch (erro) {
      console.error("Erro ao carregar planos:", erro);
    }
  },

  gerarPlano: async (assunto) => {
    set({ gerandoPlano: true });
    try {
      const res = await fetch(`${API_URL}/planos/gerar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assunto }),
      });
      const novoPlano = await res.json();
      set((state) => ({
        planos: [novoPlano, ...state.planos],
        gerandoPlano: false,
      }));
    } catch (erro) {
      console.error("Erro ao gerar plano:", erro);
      set({ gerandoPlano: false });
    }
  },

  removerPlano: async (id) => {
    try {
      await fetch(`${API_URL}/planos/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        planos: state.planos.filter((p) => p.id !== id),
      }));
    } catch (erro) {
      console.error("Erro ao remover plano:", erro);
    }
  },
}));
