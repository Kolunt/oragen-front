import React, { FC, memo } from 'react';
import { Icon } from 'ui-kit';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import { IUser } from 'api/userApi';
import { getFormatPhoneRequest } from 'utils/getFormatPhoneRequest';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import './ListItemEmployees.scss';

interface IListItem {
  employee: IUser;
  handleClickModalContact: (name: string) => void;
}

export const ListItemEmployees: FC<IListItem> = memo((props) => {
  const {
    employee: { id, email, roles, name, phone },
    handleClickModalContact,
  } = props;
  const showModalUpdate = useModalsStore((state) => state.handleChangeEmployee);
  const setMonitoredUserId = useUserStore((state) => state.setMonitoredUserId);

  const handleShowModalUpdate = (id: number) => {
    showModalUpdate(true);
    setMonitoredUserId(id);
  };

  return (
    <div key={id} className='ListItem'>
      <UserInfoForList
        user={{ full_name: name, phone: getFormatPhoneRequest(`${phone}`) }}
        handleClickModalContact={handleClickModalContact}
      />
      <div className='flex items-center justify-center color-secondary-l2'>
        {roles[0].name}
      </div>
      <div className='flex items-center justify-center color-secondary-l2'>
        {email}
      </div>
      <div className='flex items-center justify-center color-secondary-l2'>
        <Icon
          className='pointer'
          type={'VisitsChangeTableData'}
          onClick={() => handleShowModalUpdate(id)}
        />
      </div>
    </div>
  );
});
