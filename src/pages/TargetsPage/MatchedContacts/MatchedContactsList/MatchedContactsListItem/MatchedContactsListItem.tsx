import React, { FC, MouseEvent } from 'react';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import {
  IMatchedContact,
  IMatchedOrganization,
  IUpdateContactStatusPayload,
} from 'api/targetListApiLocal';
import { IVisitCountPayload, useModalsStore } from 'store/useModalsStore';
import { Switch } from 'ui-kit';
import { NumberStatusType } from 'api/drugsApi';
import { useTargetsLocalStore } from 'store/useTargetsLocalStore';
import { calculateLoyaltyCategory } from 'utils/calculateLoyaltyCategory';
import { ILoyaltyRange } from 'api/targetListApi';
import './MatchedContactsListItem.scss';

interface IMatchedContactsListItem {
  target: IMatchedContact | IMatchedOrganization;
  targetListId: number;
  remainingVisits: number;
  drug: string;
  loyaltyRange?: ILoyaltyRange[];
  loyalty?: number;
  potential?: number;
  potentialRange?: ILoyaltyRange[];
}

export const MatchedContactsListItem: FC<IMatchedContactsListItem> = (
  props
) => {
  const {
    target,
    remainingVisits,
    targetListId,
    drug,
    loyaltyRange,
    loyalty,
    potentialRange,
    potential,
  } = props;
  // const setCommentId = useModalsStore((state) => state.setCommentId);
  // const showModalComment = useModalsStore((state) => state.handleComment);
  const showModalVisit = useModalsStore((state) => state.handleVisitsCount);
  const setPayload = useModalsStore((state) => state.handleVisitsCountPayload);
  const changeContactStatus = useTargetsLocalStore(
    (state) => state.changeContactStatus
  );
  const changeOrganizationStatus = useTargetsLocalStore(
    (state) => state.changeOrganizationStatus
  );
  const isContact = 'full_name' in target;
  /*  const onOpenComment = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCommentId(id);
    showModalComment(true);
  };*/

  const onOpenVisits = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const payload: IVisitCountPayload = {
      targetListId: targetListId,
      contactId: +target.id,
      maxVisits: remainingVisits,
      currentValue: target.pivot.planned_visits,
      type: 'matchedContact',
      contactType: isContact ? 'contact' : 'organization',
    };
    setPayload(payload);
    showModalVisit(true);
  };

  const onChangeContactStatus = () => {
    const payload: IUpdateContactStatusPayload = {
      targetListId: targetListId,
      contactId: +target.id,
      status: target.pivot.status ? 0 : (1 as NumberStatusType),
    };
    isContact
      ? changeContactStatus(payload)
      : changeOrganizationStatus(payload);
  };

  /*  const currentLoyalty = isContact
    ? calculateLoyaltyCategory(loyaltyRange, loyalty)
    : '-';*/

  return (
    <div className='MatchedContactsListItem'>
      <UserInfoForList
        user={{
          full_name: `${isContact ? target.full_name : target.name}`,
          phone: `${isContact ? target.phone : ''}`,
        }}
      />

      <div className='Cell'>{isContact ? target.position : 'Провизор'}</div>

      <div className='Cell'>{drug}</div>

      <div className='Cell'>{target.address}</div>

      <div className='Cell Accent'>
        {calculateLoyaltyCategory(potentialRange, potential)}
      </div>

      <div className='Cell Accent'>
        {calculateLoyaltyCategory(loyaltyRange, loyalty)}
      </div>

      <div className='Cell Accent pointer' onClick={(e) => onOpenVisits(e)}>
        {target.pivot.planned_visits}
      </div>

      <div className='Cell'>
        <Switch
          checked={target.pivot.status}
          onChange={onChangeContactStatus}
          width={48}
          height={24}
          borderRadius={12}
          handleDiameter={20}
        />
      </div>

      {/*    <div className='Cell pointer' onClick={(e) => onOpenComment(e)}>
        <Icon type={'EventDescription'} />
      </div>*/}
    </div>
  );
};
