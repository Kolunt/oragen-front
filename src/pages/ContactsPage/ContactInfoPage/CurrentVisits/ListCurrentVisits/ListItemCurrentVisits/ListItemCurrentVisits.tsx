import React, { FC, memo, MouseEvent } from 'react';
import { IVisit } from 'api/visitsApi';
import { useVisitsStore } from 'store/useVisitsStore';
import { useModalsStore } from 'store/useModalsStore';
import { useNavigate } from 'react-router-dom';
import { DateFormats, RoleTypes, ROUTES } from 'enums';
import dayjs from 'dayjs';
import { Button, Icon } from 'ui-kit';
import { useReportStore } from 'components/Report';
import { useCurrentVisitsStore, usePresentationStore } from 'pages';
import { useAddVisitorStore } from 'components/Modals/ModalAddVisitor/useAddVisitorStore';
import { useVisitFilesStore } from 'components/Modals/ModalVisitFiles/useVisitFilesStore';
import { getVisitState } from 'utils';
import { getVisitApprovalStatus } from 'utils/getVisitApprovalStatus';
import classNames from 'classnames';
import { useUserStore } from 'store/useUserStore';
import './ListItemCurrentVisits.scss';

interface IListItemCurrentVisits {
  visit: IVisit;
}

export const ListItemCurrentVisits: FC<IListItemCurrentVisits> = memo(
  (props) => {
    const { visit } = props;
    const me = useUserStore((state) => state.me);
    const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
    const setComments = useVisitsStore((state) => state.setComments);
    const removeVisit = useCurrentVisitsStore((state) => state.removeVisit);
    const startVisit = useCurrentVisitsStore((state) => state.startVisit);
    const finishVisit = useCurrentVisitsStore((state) => state.finishVisit);
    const startRemoteVisit = useCurrentVisitsStore(
      (state) => state.startRemoteVisit
    );
    const setEditMode = useReportStore((state) => state.setEditMode);
    const setPresentationVisit = usePresentationStore(
      (state) => state.setMonitoredVisit
    );
    const showModalFiles = useModalsStore((state) => state.handleVisitFiles);
    const setVisitFilesId = useVisitFilesStore(
      (state) => state.setMonitoredVisitId
    );
    const showComments = useModalsStore((state) => state.handleComment);
    const setMonitoredVisitId = useVisitsStore(
      (state) => state.setMonitoredVisitId
    );
    const showModalChangeVisitMR = useModalsStore(
      (state) => state.handleChangeVisitMR
    );
    const showModalAddVisitor = useAddVisitorStore(
      (state) => state.changeIsShow
    );
    const setParticipants = useAddVisitorStore(
      (state) => state.setParticipants
    );
    const setMonitoredReport = useReportStore(
      (state) => state.setMonitoredReport
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
      navigate(ROUTES.VISIT_REPORT);
    };

    const onStartVisit = async (e: MouseEvent) => {
      e.stopPropagation();
      if (visit.status === 'live') {
        finishVisit(visit.id);
        setEditMode(true);
        setMonitoredReport(visit.report);
        navigate(ROUTES.VISIT_REPORT);
      } else {
        if (visit.mode === 'local') {
          setPresentationVisit(visit);
          navigate(ROUTES.PRESENTATION);
          startVisit(visit.id);
        } else {
          startRemoteVisit(visit.id, visit.videocall_id as number, navigate);
        }
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
      setVisitFilesId(visit.id);
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

    const isDisabledButtonStart =
      (isTimeOverStartVisit && visit.mode === 'remote') ||
      visit.approval !== 'accepted';

    return (
      <div
        className={classNames('ListItemCurrentVisits', {
          ListItemCurrentVisits__medRep: myRole === RoleTypes.MED_REP,
          ListItemCurrentVisits__active: visit.status === 'live',
          ListItemCurrentVisits__timeOver: isTimeOverStartVisit,
        })}
      >
        <div className='Cell Cell--Start'>
          {visit.planned_at
            ? dayjs(visit.planned_at).format(DateFormats.FULL_DATE_FORMAT)
            : 'Дата не назначена'}
        </div>

        <div className='Cell'>{visit.drug.name}</div>

        <div className='Cell'>
          {visit.mode === 'local' ? (
            <Icon type={'VisitsUser'} />
          ) : (
            <Icon type={'VisitsTv'} />
          )}
        </div>

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
              disabled={isDisabledButtonStart}
            >
              {visit.status === 'live' ? 'Завершить' : 'Старт'}
            </Button>
          </div>
        )}

        {/*        <div className='Cell' onClick={onDeleteVisit}>
          {visit.creation_type === 'manual' && (
            <Icon className='pointer' type='VisitsDeleteTableData' />
          )}
        </div>*/}
      </div>
    );
  }
);
