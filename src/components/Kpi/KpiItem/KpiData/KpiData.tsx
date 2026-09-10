import { IKpi, IKpiItem } from 'api/kpiApi';
import React, { FC } from 'react';
import { Icon } from 'ui-kit';

interface IKpiDataProps {
  data: IKpiItem;
}

export const KpiData: FC<IKpiDataProps> = ({ data }) => {
  return (
    <div className='KpiList'>
      <div className='KpiList__Item'>
        <div className='KpiList__ItemType'>
          <div className='KpiList__IconWrapper'>
            <Icon type='KpiFlash' />
          </div>
          <span>План</span>
        </div>
        <div className='KpiList__ItemResult'>
          <span>{data.plan}</span>
        </div>
      </div>

      <div className='KpiList__Item'>
        <div className='KpiList__ItemType'>
          <div className='KpiList__IconWrapper'>
            <Icon type='KpiShield' />
          </div>
          <span>Факт</span>
        </div>
        <div className='KpiList__ItemResult'>
          <span>{data.fact}</span>
        </div>
      </div>

      <div className='KpiList__Item'>
        <div className='KpiList__ItemType'>
          <div className='KpiList__IconWrapper'>
            <Icon type='KpiLineFill' />
          </div>
          <span>Осталось</span>
        </div>
        <div className='KpiList__ItemResult'>
          <span>{data.left}</span>
        </div>
      </div>

      <div className='KpiList__Item'>
        <div className='KpiList__ItemType'>
          <div className='KpiList__IconWrapper'>
            <Icon type='KpiEye' />
          </div>
          <span>% выполнения плана</span>
        </div>
        <div className='KpiList__ItemResult'>
          <span>{data.percent}</span>
        </div>
      </div>
    </div>
  );
};
