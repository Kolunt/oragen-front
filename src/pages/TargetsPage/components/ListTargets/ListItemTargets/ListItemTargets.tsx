import React, { FC, memo, MouseEvent } from 'react';
import { ITarget } from 'api/targetListApi';
import { Icon } from 'ui-kit';
import { useTargetsStore } from 'store/useTargetsStore';
import { useNavigate } from 'react-router-dom';
import { DateFormats, ROUTES } from 'enums';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';
import './ListItemTargets.scss';

interface IListItemTargets {
  target: ITarget;
}

export const ListItemTargets: FC<IListItemTargets> = memo((props) => {
  const {
    target: { name, drug, visits_count, id, started_at, finished_at, status },
  } = props;
  const removeTargetList = useTargetsStore((state) => state.removeTargetList);
  const setMonitoredTargetId = useTargetsStore(
    (state) => state.setMonitoredTargetId
  );
  const navigate = useNavigate();

  const onRemoveTargetList = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    removeTargetList(id);
  };

  const onRedirectTargetInfo = () => {
    setMonitoredTargetId(id);
    navigate(ROUTES.TARGET_INFO);
  };

  return (
    <div className='ListItemTargets' onClick={onRedirectTargetInfo}>
      <div className='Cell Cell--Start Accent'>{name}</div>

      <div className='Cell Accent'>{drug.name}</div>

      <div className='Cell'>
        {dayjs(started_at).format(DateFormats.DATE_FORMAT)}
      </div>

      <div className='Cell'>
        {dayjs(finished_at).format(DateFormats.DATE_FORMAT)}
      </div>

      <div className='Cell Accent'>
        <div className='pointer' onClick={(e) => e.stopPropagation()}>
          <Tooltip title='Выгрузить данные в Excel'>
            <a href={`https://admin3.oragen.ru/export/${id}`}>
              <Icon className='CustomIcon' type={'MediaDownload'} />
            </a>
          </Tooltip>
        </div>
      </div>

      <div className='Cell Accent'>
        {status === 'preparation' && (
          <div className='pointer' onClick={(e) => onRemoveTargetList(e)}>
            <Icon className='CustomIcon' type={'VisitsDeleteTableData'} />
          </div>
        )}
      </div>
    </div>
  );
});
