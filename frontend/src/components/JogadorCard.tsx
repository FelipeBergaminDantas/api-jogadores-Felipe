'use client';

import { Jogador } from '@/types/jogador';

interface JogadorCardProps {
  jogador: Jogador;
  onEdit: (jogador: Jogador) => void;
  onDelete: (id: number) => void;
}

export default function JogadorCard({ jogador, onEdit, onDelete }: JogadorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{jogador.nome}</h3>
          <p className="text-gray-600">{jogador.posicao}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          #{jogador.numeroCamisa}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <span className="text-gray-500">Clube:</span>
          <p className="font-medium">{jogador.clube}</p>
        </div>
        <div>
          <span className="text-gray-500">Idade:</span>
          <p className="font-medium">{jogador.idade} anos</p>
        </div>
        <div>
          <span className="text-gray-500">Nacionalidade:</span>
          <p className="font-medium">{jogador.nacionalidade}</p>
        </div>
        <div>
          <span className="text-gray-500">Gols:</span>
          <p className="font-medium">{jogador.golsMarcados}</p>
        </div>
        <div>
          <span className="text-gray-500">Altura:</span>
          <p className="font-medium">{jogador.altura}m</p>
        </div>
        <div>
          <span className="text-gray-500">Peso:</span>
          <p className="font-medium">{jogador.peso}kg</p>
        </div>
        <div>
          <span className="text-gray-500">Salário:</span>
          <p className="font-medium">R$ {jogador.salario.toLocaleString('pt-BR')}</p>
        </div>
        <div>
          <span className="text-gray-500">Status:</span>
          <p className="font-medium">{jogador.status}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(jogador)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(jogador.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
