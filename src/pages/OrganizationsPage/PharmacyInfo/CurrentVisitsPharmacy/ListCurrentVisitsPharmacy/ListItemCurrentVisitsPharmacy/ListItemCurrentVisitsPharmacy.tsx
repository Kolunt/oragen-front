import React, { FC, memo, MouseEvent } from 'react';
import { useVisitsStore } from 'store/useVisitsStore';
import { useModalsStore } from 'store/useModalsStore';
import { useNavigate } from 'react-router-dom';
import { DateFormats, RoleTypes, ROUTES } from 'enums';
import dayjs from 'dayjs';
import { Button, Icon } from 'ui-kit';
import { IVisitPharmacy } from 'api/visitsPharmacyApi';
import { useReportStore } from 'components/Report';
import { useCurrentVisitsPharmacyStore } from 'pages';
import { useAddVisitorPharmacyStore } from 'components/Modals/ModalAddVisitor/useAddVisitorPharmacyStore';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { useVisitFilesStore } from 'components/Modals/ModalVisitFiles/useVisitFilesStore';
import { getVisitState } from 'utils';
import { getVisitApprovalStatus } from 'utils/getVisitApprovalStatus';
import classNames from 'classnames';
import { useUserStore } from 'store/useUserStore';
import './ListItemCurrentVisitsPharmacy.scss';

interface IListItemCurrentVisitsPharmacy {
  visit: IVisitPharmacy;
}

export const ListItemCurrentVisitsPharmacy: FC<IListItemCurrentVisitsPharmacy> =
  memo((props) => {
    const { visit } = props;
    const me = useUserStore((state) => state.me);
    const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
    const setComments = useVisitsStore((state) => state.setComments);
    const setEditMode = useReportStore((state) => state.setEditMode);
    const removeVisit = useCurrentVisitsPharmacyStore(
      (state) => state.removeVisit
    );
    const startVisit = useCurrentVisitsPharmacyStore(
      (state) => state.startVisit
    );
    const finishVisit = useCurrentVisitsPharmacyStore(
      (state) => state.finishVisit
    );
    const showComments = useModalsStore((state) => state.handleComment);
    const setMonitoredVisitId = useVisitsPharmacyStore(
      (state) => state.setMonitoredVisitId
    );
    const showModalChangeVisitMR = useModalsStore(
      (state) => state.handleChangeVisitPharmacyMR
    );
    const showModalAddVisitor = useAddVisitorPharmacyStore(
      (state) => state.changeIsShow
    );
    const setMonitoredReport = useReportStore(
      (state) => state.setMonitoredReport
    );
    const setParticipants = useAddVisitorPharmacyStore(
      (state) => state.setParticipants
    );
    const showModalFiles = useModalsStore((state) => state.handleVisitFiles);
    const setVisitFilesId = useVisitFilesStore(
      (state) => state.setMonitoredVisitId
    );
    const navigate = useNavigate();

    const onShowModalChangeApprovalStatus = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setMonitoredVisitId(visit.id);
      showModalChangeVisitMR(true);
    };

    const onShowComments = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setComments(visit.comments_with_author);
      showComments(true);
    };

    const onShowModalAddVisitor = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setMonitoredVisitId(visit.id);
      setParticipants(visit.participants_list ?? []);
      showModalAddVisitor(true);
    };

    const onShowReport = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setEditMode(false);
      setMonitoredReport(visit.report);
      navigate(ROUTES.VISIT_REPORT_PHARMACY);
    };

    const onStartVisit = (e: MouseEvent) => {
      e.stopPropagation();
      if (visit.status === 'live') {
        finishVisit(visit.id);
        setEditMode(true);
        setMonitoredReport(visit.report);
        navigate(ROUTES.VISIT_REPORT_PHARMACY);
      } else {
        startVisit(visit.id);
      }
    };

    const onDeleteVisit = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (visit.creation_type === 'manual') {
        removeVisit(visit.id);
      }
    };

    const onShowFiles = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setVisitFilesId(visit.id, true);
      showModalFiles(true);
    };

    const expirationCheck = visit.planned_at
      ? dayjs(visit.planned_at) > dayjs()
      : true;

    const isShowButtonStart =
      myRole === RoleTypes.MED_REP &&
      visit.status !== 'archived' &&
      visit.status !== 'finished';

    const isTimeOverStartVisit =
      !expirationCheck &&
      visit.status !== 'finished' &&
      visit.status !== 'archived' &&
      visit.status !== 'live';

    return (
      <div
        className={classNames('ListItemCurrentsVisitsPharmacy', {
          ListItemCurrentsVisitsPharmacy__medRep: myRole === RoleTypes.MED_REP,
          ListItemCurrentsVisitsPharmacy__active: visit.status === 'live',
          ListItemCurrentsVisitsPharmacy__timeOver: isTimeOverStartVisit,
        })}
      >
        <div className='Cell Cell--Start'>
          {visit.planned_at
            ? dayjs(visit.planned_at).format(DateFormats.FULL_DATE_FORMAT)
            : 'Дата не назначена'}
        </div>

        <div className='Cell'>{visit.drug.name}</div>

        <div className='Cell gap-x-10'>{getVisitState(visit.status)} </div>

        <div className='Cell gap-x-10'>
          {getVisitApprovalStatus(visit.approval)}
          {visit.status === 'upcoming' &&
            visit.approval === 'not_processed' &&
            myRole === RoleTypes.MED_REP && (
              <div
                className='shrink-0'
                onClick={onShowModalChangeApprovalStatus}
              >
                <Icon className='pointer' type='VisitsChangeTableData' />
              </div>
            )}
        </div>

        <div className='Cell'>
          <div onClick={onShowFiles}>
            <Icon className='pointer' type='EventDescription' />
          </div>
        </div>

        <div className='Cell'>
          <div onClick={onShowReport}>
            <Icon className='pointer' type='EventDescription' />
          </div>
        </div>

        <div className='Cell'>
          <div onClick={onShowComments}>
            <Icon className='pointer' type='EventDescription' />
          </div>
        </div>

        <div className='Cell'>
          <div onClick={onShowModalAddVisitor}>
            <Icon className='pointer' type='VisitsTwoUsers' />
          </div>
        </div>

        <div className='Cell'>
          <div>
            {visit.creation_type === 'manual' ? (
              <Icon type='ManualMode' />
            ) : (
              <Icon type='AutomaticMode' />
            )}
          </div>
        </div>

        {isShowButtonStart && (
          <div className='Cell'>
            <Button
              className={classNames('CustomButton', {
                CustomButton__active: visit.status === 'live',
              })}
              onClick={(e) => onStartVisit(e)}
              disabled={visit.approval !== 'accepted'}
            >
              {visit.status === 'live' ? 'Завершить' : 'Старт'}
            </Button>
          </div>
        )}

        {/*       <div className='Cell' onClick={onDeleteVisit}>
          {visit.creation_type === 'manual' && (
            <Icon className='pointer' type='VisitsDeleteTableData' />
          )}
        </div>*/}
      </div>
    );
  });
