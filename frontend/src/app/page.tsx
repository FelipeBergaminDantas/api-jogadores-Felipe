'use client';

import { useState, useEffect } from 'react';
import { Jogador } from '@/types/jogador';
import { jogadorService } from '@/services/api';
import JogadorCard from '@/components/JogadorCard';
import JogadorForm from '@/components/JogadorForm';

export default function Home() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJogador, setEditingJogador] = useState<Jogador | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    carregarJogadores();
  }, []);

  const carregarJogadores = async () => {
    try {
      setLoading(true);
      const data = await jogadorService.listarTodos();
      setJogadores(data);
    } catch (error) {
      showMessage('Erro ao carregar jogadores. Verifique se o backend está rodando.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmitJogador = async (jogador: Omit<Jogador, 'id'> | Jogador) => {
    try {
      if ('id' in jogador && jogador.id) {
        // Atualizar jogador existente
        await jogadorService.atualizar(jogador.id, jogador as Jogador);
        showMessage('Jogador atualizado com sucesso!', 'success');
      } else {
        // Adicionar novo jogador
        await jogadorService.adicionar(jogador);
        showMessage('Jogador adicionado com sucesso!', 'success');
      }
      setShowForm(false);
      setEditingJogador(null);
      carregarJogadores();
    } catch (error) {
      showMessage('Erro ao salvar jogador', 'error');
    }
  };

  const handleDeleteJogador = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este jogador?')) return;
    
    try {
      await jogadorService.deletar(id);
      showMessage('Jogador deletado com sucesso!', 'success');
      carregarJogadores();
    } catch (error) {
      showMessage('Erro ao deletar jogador', 'error');
    }
  };

  const handleEditClick = (jogador: Jogador) => {
    setEditingJogador(jogador);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingJogador(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚽ Gerenciador de Jogadores</h1>
          <p className="text-gray-600">Sistema de gerenciamento de jogadores de futebol</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
          >
            + Adicionar Jogador
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Carregando jogadores...</p>
          </div>
        ) : jogadores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">Nenhum jogador cadastrado ainda.</p>
            <p className="text-gray-500 mt-2">Clique em "Adicionar Jogador" para começar!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jogadores.map((jogador) => (
              <JogadorCard
                key={jogador.id}
                jogador={jogador}
                onEdit={handleEditClick}
                onDelete={handleDeleteJogador}
              />
            ))}
          </div>
        )}

        {showForm && (
          <JogadorForm
            jogador={editingJogador}
            onSubmit={handleSubmitJogador}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
}
