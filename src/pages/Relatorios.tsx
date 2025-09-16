import { useTranslation } from 'react-i18next';

export default function Relatorios(): JSX.Element {
  const { t } = useTranslation();

  return <div>{t('reports.title')}</div>;
}
