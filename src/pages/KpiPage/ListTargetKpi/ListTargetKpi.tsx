import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateFormats, URL_NAME } from 'enums';
import dayjs from 'dayjs';
import { ITargetLocal } from 'api/targetListApiLocal';

interface IListItemTargets {
  target: ITargetLocal;
}

export const ListTargetKpi: FC<IListItemTargets> = memo((props) => {
  const {
    target: {
      drug,
      planned_visits_count,
      id,
      started_at,
      finished_at,
      finished_visits_count,
      parent_target_list_full_info: { name },
    },
  } = props;
  const navigate = useNavigate();

  const date = (date: Date) =>
    dayjs(dayjs(date).toDate()).format(DateFormats.DATE_FORMAT);
  return (
    <div
      className='listTargetKpi bg-white-l1 br-6 pt-12 pb-12 pl-20 pr-20 mb-5 pointer'
      onClick={() => navigate(`/${URL_NAME.TARGET_KPI}/${id}`)}
    >
      <div className='justify-start fw-700 flex'>{name}</div>
      <div className='justify-center fw-700 flex'>{drug.name}</div>
      <div className='justify-center flex'>{date(started_at)}</div>
      <div className='justify-center flex'>{date(finished_at)}</div>
      <div className='justify-center fw-700 flex'>
        {finished_visits_count}/{planned_visits_count}
      </div>
    </div>
  );
});
