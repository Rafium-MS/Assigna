import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the StatusBadge component.
 */
interface Props {
  /** The status to display in the badge. */
  status: 'ativo' | 'devolvido' | 'atrasado';
}

const colors: Record<Props['status'], string> = {
  ativo: 'bg-green-600',
  devolvido: 'bg-blue-600',
  atrasado: 'bg-red-600',
};

/**
 * A component for displaying a status badge.
 * @param props The props for the component.
 * @returns A JSX element representing the status badge.
 */
export const StatusBadge: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  return (
    <span className={`text-xs text-white px-2 py-1 rounded ${colors[status]}`}>{t(`status.${status}`)}</span>
  );
};
