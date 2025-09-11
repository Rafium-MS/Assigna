import { useTranslation } from 'react-i18next';
import { formatDate, formatNumber } from '../utils/format';

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const today = formatDate(new Date());
  const value = formatNumber(1234567.89);

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.today', { date: today })}</p>
      <p>{t('home.exampleNumber', { value })}</p>
    </div>
  );
}
