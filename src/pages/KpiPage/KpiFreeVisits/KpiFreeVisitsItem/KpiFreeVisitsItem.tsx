import React, { FC, memo } from 'react';
import { IVisit } from 'api/visitsApi';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import './KpiFreeVisitsItem.scss';

interface IKpiFreeVisitsItem {
  visit: IVisit;
}

export const KpiFreeVisitsItem: FC<IKpiFreeVisitsItem> = memo((props) => {
  const {
    visit: { contact },
  } = props;
  return (
    <div className='KpiFreeVisitsItem'>
      <UserInfoForList
        user={{ full_name: contact.full_name, phone: contact.phone }}
      />
      <div className='Cell'>{contact.position}</div>
      <div className='Cell'>{contact.company}</div>
      <div className='Cell'>0/1</div>
    </div>
  );
});
