import React, { FC, memo, MouseEvent } from 'react';
import { useVisitsStore } from 'store/useVisitsStore';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { useNavigate } from 'react-router-dom';
import { DateFormats, ROUTES } from 'enums';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Icon } from 'ui-kit';
import { IVisitPharmacy } from 'api/visitsPharmacyApi';
import './ListItemAllVisitsPharmacy.scss';

interface IListItemAllVisitsPharmacy {
  visit: IVisitPharmacy;
}

export const ListItemAllVisitsPharmacy: FC<IListItemAllVisitsPharmacy> = memo(
  (props) => {
    const { visit } = props;
    const setComments = useVisitsStore((state) => state.setComments);
    const handleChangeVisit = useModalsStore(
      (state) => state.handleChangeVisit
    );
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

    let visitState = '';
    switch (visit.status) {
      case 'upcoming':
        visitState = 'Предстоящий';
        break;
      case 'live':
        visitState = 'Сейчас идёт';
        break;
      default:
        visitState = 'Завершен';
    }

    return (
      <div
        className={classNames(`ListItemAllVisits ${borderStyle}`, {
          // IListVisitInfoItem__MedRep: isMedRep,
        })}
      >
        <div className='Cell Cell--Start'>
          {visit.planned_at
            ? dayjs(visit.planned_at).format(DateFormats.FULL_DATE_FORMAT)
            : 'Дата не назначена'}
        </div>

        <div className='Cell'>{visit.drug.name}</div>

        <div className='Cell'>Визит в аптеку</div>

        <div className='Cell'>{visitState}</div>

        <div className='Cell'>{visitStatus}</div>

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
  }
);
