import React, { FC, MouseEvent } from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { useNavigate } from 'react-router-dom';
import { DateFormats, ROUTES } from 'enums';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Icon } from 'ui-kit';
import { IVisit } from 'api/visitsApi';
import './ListVisitInfoItem.scss';
import { useVisitsStore } from 'store/useVisitsStore';

interface IListVisitInfoItem {
  visit: IVisit;
}

export const ListVisitInfoItem: FC<IListVisitInfoItem> = (props) => {
  const { visit } = props;
  const setComments = useVisitsStore((state) => state.setComments);
  const handleChangeVisit = useModalsStore((state) => state.handleChangeVisit);
  const handleChangeVisitMR = useModalsStore(
    (state) => state.handleChangeVisitMR
  );
  const showComments = useModalsStore((state) => state.handleComment);
  const me = useUserStore((state) => state.me);
  const setMonitoredVisitId = useVisitsPharmacyStore(
    (state) => state.setMonitoredVisitId
  );
  const showModalChangeVisitMR = useModalsStore(
    (state) => state.handleChangeVisitMR
  );
  const navigate = useNavigate();
  const isMedRep = me.roles[0].id === 8;

  const showModalChangeVisit = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isModalChangeCheck) {
      setMonitoredVisitId(visit.id);
      if (isMedRep) {
        handleChangeVisitMR(true);
      } else {
        handleChangeVisit(true);
      }
    }
  };

  const showModalContact = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isModalCommentCheck) {
      setMonitoredVisitId(visit.id);
      showComments(true);
    }
  };

  const redirectVisitInfo = () => {
    if (visit.approval === 'accepted') {
      setMonitoredVisitId(visit.id);
      navigate(ROUTES.VISIT_INFO);
    }
  };

  const onShowModalChangeApprovalStatus = () => {
    setComments(visit.comments_with_author);
    showModalChangeVisitMR(true);
  };

  const onShowComments = () => {
    showComments(true);
  };

  let borderStyle;
  switch (visit.approval) {
    case 'accepted':
      borderStyle = 'border-positive';
      break;
    case 'declined':
      borderStyle = 'border-negative';
      break;
    case 'canceled':
      borderStyle = 'border-blue';
      break;
    default:
      borderStyle = 'border-grey';
  }

  const isModalChangeCheck =
    visit.approval === 'accepted' || visit.approval === 'not_processed';
  const isModalCommentCheck = !!visit.comments_with_author.length;

  let visitStatus = '';
  switch (visit.approval) {
    case 'accepted':
      visitStatus = 'Принят';
      break;
    case 'declined':
      visitStatus = 'Отклонен';
      break;
    case 'canceled':
      visitStatus = 'Отменен';
      break;
    default:
      visitStatus = 'Не назначен';
  }

  return (
    <div
      className={classNames(`ListVisitInfoItem ${borderStyle}`, {
        // IListVisitInfoItem__MedRep: isMedRep,
      })}
      onClick={redirectVisitInfo}
    >
      <div className='Cell Cell--Start gap-x-10'>
        {visit.planned_at
          ? dayjs(visit.planned_at).format(DateFormats.FULL_DATE_FORMAT)
          : 'Дата не назначена'}
        <Icon
          // className={isModalChangeCheck ? '' : 'DisabledIcon'}
          className='pointer'
          type='VisitsChangeTableData'
        />
      </div>

      <div className='Cell'>
        {visit.mode === 'local' ? 'Визит с врачом' : 'Дистанционный'}
      </div>

      <div className='Cell'>С</div>

      <div className='Cell'>А</div>

      <div className='Cell gap-x-10'>
        {visitStatus}
        <Icon
          // className={isModalChangeCheck ? '' : 'DisabledIcon'}
          className='pointer'
          type='VisitsChangeTableData'
          onClick={onShowModalChangeApprovalStatus}
        />
      </div>

      <div className='Cell'>
        <Icon
          // className={isModalCommentCheck ? 'ActiveIcon' : 'cursor-default'}
          className='pointer'
          type='EventDescription'
          onClick={onShowComments}
        />
      </div>
    </div>
  );
};
