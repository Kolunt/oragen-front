import React, { FC, memo, MouseEvent } from 'react';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import { Switch } from 'ui-kit';
import { Tooltip } from 'antd';
import { ITargetLocal, IUpdateStatusPayload } from 'api/targetListApiLocal';
import { ISpecialty } from 'api/commonApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { useTargetsLocalStore } from 'store/useTargetsLocalStore';
import { IVisitCountPayload, useModalsStore } from 'store/useModalsStore';
import classNames from 'classnames';
import { NumberStatusType } from 'api/drugsApi';
import './TargetsMedRepListItem.scss';

interface ITargetsMedRepListItem {
  target: ITargetLocal;
}

export const TargetsMedRepListItem: FC<ITargetsMedRepListItem> = memo(
  (props) => {
    const {
      target: {
        id,
        performer,
        drug,
        parent_target_list_full_info,
        visits_count,
        matched_contacts,
        matched_organizations,
        status,
      },
    } = props;
    const setMonitoredTargetId = useTargetsLocalStore(
      (state) => state.setMonitoredTargetId
    );
    const showModal = useModalsStore((state) => state.handleVisitsCount);
    const setPayload = useModalsStore(
      (state) => state.handleVisitsCountPayload
    );
    const changeStatus = useTargetsLocalStore((state) => state.changeStatus);
    const navigate = useNavigate();

    const getAllPositions = (positions: ISpecialty[]) => {
      let result = '';
      positions.forEach((item) => {
        result += ` ${item.name},`;
      });
      return result;
    };

    const onRedirectMatchedContacts = () => {
      setMonitoredTargetId(id);
      navigate(ROUTES.TARGETS_MATCHED_CONTACTS);
    };

    const onShowModal = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const payload: IVisitCountPayload = {
        targetListId: id,
        currentValue: visits_count,
        type: 'local',
      };
      setPayload(payload);
      showModal(true);
    };

    const fillCheckVisit = () => {
      let visitsContact = 0;
      matched_contacts.forEach((item) => {
        visitsContact += item.pivot.planned_visits;
      });
      matched_organizations.forEach((item) => {
        visitsContact += item.pivot.planned_visits;
      });
      return visits_count <= visitsContact;
    };

    const onChangeStatus = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const payload: IUpdateStatusPayload = {
        id: id,
        status: status ? 0 : (1 as NumberStatusType),
      };
      changeStatus(payload);
    };

    return (
      <div
        className={classNames('TargetsMedRepListItem', {
          TargetsMedRepListItem__active: fillCheckVisit(),
        })}
        onClick={onRedirectMatchedContacts}
      >
        <UserInfoForList
          user={{
            full_name: `${performer.last_name} ${performer.first_name} ${
              performer.middle_name || ''
            }`,
            phone: `${performer.phone || ''}`,
          }}
        />

        <div className='Cell'>{drug.name}</div>

        <div className='Cell'>
          <Tooltip
            placement='left'
            title={getAllPositions(parent_target_list_full_info.positions)}
          >
            {/*{parent_target_list_full_info.positions[0].name}*/}
            Список специальностей
          </Tooltip>
        </div>

        {/*  <div className='Cell Accent' onClick={(e) => onShowModal(e)}>
          {visits_count}
        </div>*/}

        <div className='Cell Accent'>
          {matched_contacts.length + matched_organizations.length}
        </div>

        <div className='Cell'>
          <div onClick={(e) => onChangeStatus(e)}>
            <Switch
              checked={status}
              onChange={() => {}}
              width={48}
              height={24}
              borderRadius={12}
              handleDiameter={20}
            />
          </div>
        </div>
      </div>
    );
  }
);
