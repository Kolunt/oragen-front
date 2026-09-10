import React, { FC, memo, MouseEvent, useState } from 'react';
import { Icon } from 'ui-kit';
import { IContact, useContactsStore } from 'store/useContactsStore';
import { OrganizationTypes, ROUTES } from 'enums';
import { useModalsStore } from 'store/useModalsStore';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import { useCurrentVisitsStore } from 'pages';
import './ListItemContacts.scss';

interface IListItemContacts {
  contact: IContact;
  handleClickModalContact: (name: string) => void;
}

export const ListItemContacts: FC<IListItemContacts> = memo((props) => {
  const {
    contact: { id, full_name, phone, position, address, organization_type },
    handleClickModalContact,
    contact,
  } = props;
  const showModal = useModalsStore((state) => state.handleApplicationContact);
  const setMonitoredContactId = useContactsStore(
    (state) => state.setMonitoredContactId
  );
  const setPerformerId = useCurrentVisitsStore((state) => state.setPerformerId);
  const me = useUserStore((state) => state.me);
  const navigate = useNavigate();
  const type = organization_type === OrganizationTypes.MPI ? 'ЛПУ' : 'Аптека';

  const handleShowModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMonitoredContactId(+id);
    showModal(true);
  };

  const onRedirectInfo = () => {
    /*setPerformerId(me.id);
    setMonitoredContactId(+id);
    navigate(ROUTES.CONTACTS_INFO);*/
  };
  return (
    <div className='ListItemContacts' onClick={onRedirectInfo}>
      <NavLink to={`/information-contact/${id}`}>
        <UserInfoForList
          className='pointer'
          showAvatar={false}
          user={{ full_name, phone }}
        />
      </NavLink>

      <div className='Cell'>{position}</div>

      <div className='Cell'>{type}</div>

      <div className='Cell'>{address}</div>

      <div className='Cell' onClick={(e) => handleShowModal(e)}>
        <Icon className='CustomIcon' type={'VisitsChangeTableData'} />
      </div>
    </div>
  );
});
