import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Button, Input, Label, Textarea } from '../components/ui';

const campaignSchema = z.object({
  name: z.string().min(1, 'campaign.validation.nameRequired'),
  startDate: z.string().min(1, 'campaign.validation.startDateRequired'),
  endDate: z.string().min(1, 'campaign.validation.endDateRequired'),
  presets: z.string().min(1, 'campaign.validation.presetsRequired'),
});

type CampaignForm = z.infer<typeof campaignSchema>;

const CampaignPage: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<CampaignForm>({
    resolver: zodResolver(campaignSchema),
  });

  const onSubmit = (data: CampaignForm) => {
    console.log(data);
    // TODO: Implement logic to save campaign data
  };

  return (
    <Card title={t('campaign.title', 'Nova Campanha')}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="name">{t('campaign.name', 'Nome da Campanha')}</Label>
          <Input id="name" {...register('name')} />
          {errors.name?.message && <p className="text-sm text-red-600">{t(errors.name.message)}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="startDate">{t('campaign.startDate', 'Data de Início')}</Label>
            <Input id="startDate" type="date" {...register('startDate')} />
            {errors.startDate?.message && <p className="text-sm text-red-600">{t(errors.startDate.message)}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="endDate">{t('campaign.endDate', 'Data de Fim')}</Label>
            <Input id="endDate" type="date" {...register('endDate')} />
            {errors.endDate?.message && <p className="text-sm text-red-600">{t(errors.endDate.message)}</p>}
          </div>
        </div>

        <div className="grid gap-1">
          <Label htmlFor="presets">{t('campaign.presets', 'Predefinições de Designação')}</Label>
          <Textarea
            id="presets"
            {...register('presets')}
            rows={7}
            placeholder={t('campaign.presetsPlaceholder', 'Ex:\nSegunda-feira: Manhã, Tarde\nTerça-feira: Manhã\n...')}
          />
          {errors.presets?.message && <p className="text-sm text-red-600">{t(errors.presets.message)}</p>}
        </div>

        <div className="flex justify-end">
          <Button type="submit">{t('campaign.create', 'Criar Campanha')}</Button>
        </div>
      </form>
    </Card>
  );
};

export default CampaignPage;