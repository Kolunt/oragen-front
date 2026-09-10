import React, { FC, memo, MouseEvent } from 'react';
import { Icon, Tooltip } from 'ui-kit';
import { IEvent, useEventsStore } from 'store/useEventsStore';
import { DateFormats, EventTypes, ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import './ListItemEvents.scss';
import dayjs from 'dayjs';
import { useUserStore } from 'store/useUserStore';

interface IListItemEvents {
  event: IEvent;
}

export const ListItemEvents: FC<IListItemEvents> = memo((props) => {
  const {
    event: {
      id,
      name,
      description,
      duration,
      started_at,
      finished_at,
      participants,
      status,
      type,
      owner_id,
    },
  } = props;
  const removeEvent = useEventsStore((state) => state.removeEvent);
  const addCurrentEvent = useEventsStore((state) => state.addMonitoredEvent);
  const me = useUserStore((state) => state.me);
  const navigate = useNavigate();

  const renderTooltipContent = (title: string) => {
    return <span>{title}</span>;
  };

  const handleRemoveEvent = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    removeEvent(id);
    // removeNews(id);
  };

  const goToEventInfo = (id: number) => {
    addCurrentEvent(id);
    navigate(ROUTES.EVENT_INFO);
  };

  let iconType, content;

  switch (type) {
    case EventTypes.ROUND_TABLES:
      iconType = 'UsersFour';
      content = 'Круглый стол';
      break;
    case EventTypes.ONLINE_RESIDENTS:
      iconType = 'StatusOnline';
      content = 'Онлайн-ординаторская';
      break;
    default:
      iconType = 'VideoCamera';
      content = 'Видеоконференция';
  }

  let styleStatus = 'ListItemEvents';
  if (status === 'live') {
    styleStatus = 'ListItemEvents ListItemEvents--active';
  }
  if (status === 'archived') {
    styleStatus = 'ListItemEvents ListItemEvents--archive';
  }

  return (
    <div className={styleStatus} onClick={() => goToEventInfo(id)}>
      <div className='Cell'>
        <div className='IconWrapper'>
          {/*{iconType && <Icon type={iconType} />}*/}
          <Icon type={'VideoCamera'} />
        </div>
      </div>
      <div className='Cell'>
        <span>{name}</span>
      </div>
      <div className='Cell'>
        <Tooltip content={renderTooltipContent(description)} placement='right'>
          <div className='IconWrapper'>
            <Icon type={'EventDescription'} />
          </div>
        </Tooltip>
      </div>
      <div className='Cell'>
        <span>{duration}</span>
      </div>
      <div className='Cell'>
        <span>{dayjs(started_at).format(DateFormats.FULL_DATE_FORMAT)}</span>
      </div>
      <div className='Cell'>
        <span>{dayjs(finished_at).format(DateFormats.FULL_DATE_FORMAT)}</span>
      </div>
      <div className='Cell'>
        <span>{participants}</span>
      </div>
      <div className='Cell Settings'>
        {status !== 'live' && owner_id === me.id && (
          <div onClick={(event) => handleRemoveEvent(event, id)}>
            <Icon type='VisitsDeleteTableData' />
          </div>
        )}
      </div>
    </div>
  );
});
