import React, { FC, memo } from 'react';
import { ITargetListKpi } from 'api/kpiApi';
import { KpiItem } from 'components';
import { v1 } from 'uuid';

interface IKpiTargetList {
  targets: ITargetListKpi[];
}

export const KpiTargetList: FC<IKpiTargetList> = memo((props) => {
  const { targets } = props;
  return (
    <div className='flex flex-column gap-y-10'>
      {targets.map((target) => (
        <KpiItem
          key={v1()}
          kpi={target.kpi}
          name={target.parent_target_list.name}
        />
      ))}
    </div>
  );
});
