import React, { FC, memo, useState } from 'react';
import { ITab, Tabs, Title } from 'ui-kit';
import { KpiData } from 'components/Kpi/KpiItem/KpiData';
import { IKpi } from 'api/kpiApi';

export interface IKpiItemProps {
  name: string;
  kpi: IKpi;
}

export enum KpiPeriod {
  WEEK = 'Неделя',
  MONTH = 'Месяц',
  CYCLE = 'Цикл',
}

const tabs: ITab[] = [
  { id: 0, label: KpiPeriod.WEEK },
  { id: 1, label: KpiPeriod.MONTH },
  { id: 2, label: KpiPeriod.CYCLE },
];

export const KpiItem: FC<IKpiItemProps> = memo((props) => {
  const { name, kpi } = props;
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div className='Kpi'>
      <Title className='mb-10 text-center'>{name}</Title>
      <Tabs
        className='Tabs'
        selectedId={selectedTabId}
        tabs={tabs}
        onClick={setSelectedTabId}
      />
      {selectedTabId === 0 && <KpiData data={kpi.week} />}
      {selectedTabId === 1 && <KpiData data={kpi.month} />}
      {selectedTabId === 2 && <KpiData data={kpi.cycle} />}
    </div>
  );
});
