'use client';

import { Jogador } from '@/types/jogador';
import { useState, useEffect } from 'react';

interface JogadorFormProps {
  jogador?: Jogador | null;
  onSubmit: (jogador: Omit<Jogador, 'id'> | Jogador) => void;
  onCancel: () => void;
}

export default function JogadorForm({ jogador, onSubmit, onCancel }: JogadorFormProps) {
  const [formData, setFormData] = useState<Omit<Jogador, 'id'>>({
    nome: '',
    posicao: '',
    idade: 0,
    altura: 0,
    peso: 0,
    nacionalidade: '',
    clube: '',
    salario: 0,
    numeroCamisa: 0,
    golsMarcados: 0,
    status: 'Ativo',
  });

  useEffect(() => {
    if (jogador) {
      setFormData(jogador);
    }
  }, [jogador]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jogador) {
      onSubmit({ ...formData, id: jogador.id });
    } else {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['idade', 'altura', 'peso', 'salario', 'numeroCamisa', 'golsMarcados'].includes(name)
        ? parseFloat(value) || 0
        : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {jogador ? 'Editar Jogador' : 'Adicionar Jogador'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posição</label>
              <input
                type="text"
                name="posicao"
                value={formData.posicao}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
              <input
                type="number"
                step="0.01"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
              <input
                type="text"
                name="nacionalidade"
                value={formData.nacionalidade}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clube</label>
              <input
                type="text"
                name="clube"
                value={formData.clube}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salário (R$)</label>
              <input
                type="number"
                step="0.01"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número da Camisa</label>
              <input
                type="number"
                name="numeroCamisa"
                value={formData.numeroCamisa}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gols Marcados</label>
              <input
                type="number"
                name="golsMarcados"
                value={formData.golsMarcados}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Ativo">Ativo</option>
                <option value="Lesionado">Lesionado</option>
                <option value="Suspenso">Suspenso</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              {jogador ? 'Atualizar' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
