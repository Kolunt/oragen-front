import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { useModalsStore } from 'store/useModalsStore';
import './NewContact.scss';
import { useContactsStore } from 'store/useContactsStore';
import dayjs from 'dayjs';

interface INewContact {
  contactId: string;
}

export const NewContact = ({ contactId }: INewContact) => {
  const navigate = useNavigate();
  const contact = useContactsStore((state) =>
    state.contacts.find(({ id }) => id === contactId)
  );

  const showModalCardContact = useModalsStore(
    (state) => state.handleCardContact
  );
  const addUserName = useModalsStore((state) => state.handleCardContactName);

  const handleClickModal = () => {
    addUserName(contact?.full_name || '');
    showModalCardContact(true);
  };

  return (
    <div className='NewContact'>
      <div className='NewContact__Header'>
        <div className='Info'>
          <div className='Info__Name '>
            <div className='pr-5'>{contact?.full_name}</div>
            <span
              className='fw-400 pl-5'
              onClick={() => navigate(ROUTES.CONTACTS)}
            >
              Новый&nbsp;контакт
            </span>
          </div>
        </div>
        <div className='TimeWrapper'>
          <p className='Time'>
            {dayjs(contact?.created_at).locale('ru').fromNow()}
          </p>
        </div>
      </div>
      <ul className='InfoList'>
        <li className='InfoList__Item'>{contact?.position}</li>
        <li className='InfoList__Item'>{contact?.company}</li>
        <li className='InfoList__Item'>{contact?.phone}</li>
        <li className='InfoList__Item'>{contact?.address}</li>
      </ul>
    </div>
  );
};
