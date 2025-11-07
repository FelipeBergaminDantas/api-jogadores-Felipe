import axios from 'axios';
import { Jogador } from '@/types/jogador';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/jogadores/Felipe';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jogadorService = {
  listarTodos: async (): Promise<Jogador[]> => {
    const response = await api.get('');
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Jogador> => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  adicionar: async (jogador: Omit<Jogador, 'id'>): Promise<string> => {
    const response = await api.post('', jogador);
    return response.data;
  },

  atualizar: async (id: number, jogador: Jogador): Promise<string> => {
    const response = await api.put(`/${id}`, jogador);
    return response.data;
  },

  deletar: async (id: number): Promise<string> => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};
