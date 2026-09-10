import React, { FC, memo, MouseEvent } from 'react';
import { IVisit } from 'api/visitsApi';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { DateFormats, ROUTES } from 'enums';
import { Icon } from 'ui-kit';
import { useVisitsStore } from 'store/useVisitsStore';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { useNavigate } from 'react-router-dom';
import { getVisitState } from 'utils';
import { getVisitApprovalStatus } from 'utils/getVisitApprovalStatus';
import './ListItemAllVisits.scss';
import { getBorderStyleVisit } from 'utils/getBorderStyleVisit';

interface IListItemAllVisits {
  visit: IVisit;
}

export const ListItemAllVisits: FC<IListItemAllVisits> = memo((props) => {
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

  const onShowModalChangeApprovalStatus = () => {
    setComments(visit.comments_with_author);
    showModalChangeVisitMR(true);
  };

  const onShowComments = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setComments(visit.comments_with_author);
    showComments(true);
  };

  const isModalChangeCheck =
    visit.approval === 'accepted' || visit.approval === 'not_processed';
  const isModalCommentCheck = !!visit.comments_with_author.length;

  return (
    <div className={`ListItemAllVisits ${getBorderStyleVisit(visit.approval)}`}>
      <div className='Cell Cell--Start'>
        {visit.planned_at
          ? dayjs(visit.planned_at).format(DateFormats.FULL_DATE_FORMAT)
          : 'Дата не назначена'}
      </div>

      <div className='Cell'>{visit.drug.name}</div>

      <div className='Cell'>
        {visit.mode === 'local' ? 'Визит к врачу' : 'Дистанционный'}
      </div>

      <div className='Cell'>{getVisitState(visit.status)}</div>

      <div className='Cell'>{getVisitApprovalStatus(visit.approval)}</div>

      <div className='Cell'>{visit.performer.name}</div>

      <div className='Cell' onClick={onShowComments}>
        <Icon
          // className={isModalCommentCheck ? 'ActiveIcon' : 'cursor-default'}
          className='pointer'
          type='EventDescription'
        />
      </div>
    </div>
  );
});
