import React from 'react';

interface Props {
  status: 'ativo' | 'devolvido' | 'atrasado';
}

const colors: Record<Props['status'], string> = {
  ativo: 'bg-green-600',
  devolvido: 'bg-blue-600',
  atrasado: 'bg-red-600',
};

const labels: Record<Props['status'], string> = {
  ativo: 'Ativo',
  devolvido: 'Devolvido',
  atrasado: 'Atrasado',
};

export const StatusBadge: React.FC<Props> = ({ status }) => (
  <span className={`text-xs text-white px-2 py-1 rounded ${colors[status]}`}>{labels[status]}</span>
);

