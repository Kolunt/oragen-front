import React, { FC, useState } from 'react';
import { KpiPeriod } from 'components/Kpi/KpiItem';
import { ITab, Tabs, Title } from 'ui-kit';
import { KpiData } from 'components/Kpi/KpiItem/KpiData';
import { IKpi } from 'api/kpiApi';

const tabs: ITab[] = [
  { id: 0, label: KpiPeriod.WEEK },
  { id: 1, label: KpiPeriod.MONTH },
  { id: 2, label: KpiPeriod.CYCLE },
];

interface IKpiCommon {
  title?: string;
  kpi: IKpi;
}

export const KpiCommon: FC<IKpiCommon> = (props) => {
  const { kpi, title } = props;
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div className='Kpi mb-10'>
      {title && <Title className='fz-16 mb-20 text-center'>{title}</Title>}
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
};
