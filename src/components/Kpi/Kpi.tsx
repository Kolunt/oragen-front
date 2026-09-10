import React, { FC, memo, useEffect } from 'react';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { KpiTargetList } from 'components/Kpi/KpiTargetList/KpiTargetList';
import { KpiCommon } from 'components/Kpi/KpiCommon';
import { useKpiComponentStore } from 'components/Kpi/useKpiComponentStore';
import './Kpi.scss';

interface IKpiProps {
  isCommonKpi?: boolean;
  titleCommonKpi?: string;
  isKpiList?: boolean;
}

export const Kpi: FC<IKpiProps> = memo((props) => {
  const { isCommonKpi, titleCommonKpi, isKpiList } = props;
  const targets = useKpiComponentStore((state) => state.targets);
  const commonData = useKpiComponentStore((state) => state.commonData);
  const getKpi = useKpiComponentStore((state) => state.getKpi);

  useEffect(() => {
    getKpi();
  }, []);

  return (
    <div className='flex flex-column'>
      <ScrollBar>
        {isCommonKpi && <KpiCommon kpi={commonData} title={titleCommonKpi} />}
        {isKpiList && <KpiTargetList targets={targets} />}
      </ScrollBar>
    </div>
  );
});
