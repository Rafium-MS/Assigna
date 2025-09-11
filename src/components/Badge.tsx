import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  status: 'ativo' | 'devolvido' | 'atrasado';
}

const colors: Record<Props['status'], string> = {
  ativo: 'bg-green-600',
  devolvido: 'bg-blue-600',
  atrasado: 'bg-red-600',
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  return (
    <span className={`text-xs text-white px-2 py-1 rounded ${colors[status]}`}>{t(`status.${status}`)}</span>
  );
};

