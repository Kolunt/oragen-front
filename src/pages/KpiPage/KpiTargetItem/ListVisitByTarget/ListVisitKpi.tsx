import React, { FC, memo } from 'react';
import { IContact } from 'store/useContactsStore';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import './style.scss';

interface IContactVisit {
  planned_visits: number;
  archived_visits: number;
  contact: IContact;
}

interface IListVisitKpi {
  contact: IContactVisit;
}

export const ListVisitKpi: FC<IListVisitKpi> = memo((props) => {
  const {
    contact: {
      planned_visits,
      archived_visits,
      contact: { full_name, company, position, phone },
    },
  } = props;
  return (
    <div className='listVisitKpi bg-white-l1 br-6 pt-12 pb-12 pl-20 pr-20 mb-5'>
      <UserInfoForList user={{ full_name, phone }} />
      <div className='justify-center flex'>{position}</div>
      <div className='justify-center flex'>{company}</div>
      <div className='justify-center fw-700 flex'>
        {archived_visits}/{planned_visits}
      </div>
    </div>
  );
});
