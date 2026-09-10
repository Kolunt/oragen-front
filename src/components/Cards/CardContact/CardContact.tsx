import React, { FC, useState } from 'react';

import BigAvatar from 'assets/svg/contacts/ContactsPerson.svg';
import { useModalsStore } from 'store/useModalsStore';
import { Button, Icon, Tabs } from 'ui-kit';
import { Avatar } from 'ui-kit/Avatar/Avatar';
import { ITab } from 'ui-kit/Tabs/Tabs';
import './CardContact.scss';
import { ProfileContact } from './ProfileContact/ProfileContact';
import { IContact } from '../../../store/useContactsStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../enums';

// type TypeCardInner = 'profile' | 'history' | 'disk' | 'liveTape' | 'groups';

const TAB_PROFILE = 'profile';
const TAB_HISTORY_INTERACTION = 'profile';
const TAB_LOYALTY = 'profile';

const tabs: ITab[] = [
  { id: '1', label: 'Профиль' },
  { id: '2', label: 'История взаимодействия' },
  // { id: '3', label: 'Потенциал' },
  { id: '4', label: 'Лояльность' },
  // { id: '5', label: 'Группы' },
];

interface ICardContact {
  informationContact: IContact;
}

export const CardContact: FC<ICardContact> = ({ informationContact }) => {
  const { full_name, id } = informationContact;
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const handleTabClick = (id: string | number) => {
    setSelectedTabId(id);
  };

  return (
    <div className='CardContact'>
      <div className='IconWrapper'>
        <Icon type='CardChange' />
      </div>

      <div className='CardContact__Title'>
        <div className='AvatarWrapper'>{id}</div>
        <h3 className='CardContact__Name'>{full_name}</h3>
      </div>

      <Tabs
        className='CustomTabs'
        selectedId={selectedTabId}
        tabs={tabs}
        onClick={handleTabClick}
      />

      <div className='CardInner'>
        {selectedTabId === '1' && (
          <ProfileContact informationContact={informationContact} />
        )}

        {selectedTabId === '2' && (
          <ul className='HistoryList'>
            <li className='HistoryList__Item'>
              <div className='IconWrapper'>
                <Icon type='ArrowRight' />
              </div>
              <div className='Info'>
                <h4 className='Info__Title'>Двойной визит в аптеку</h4>
                <span className='Info__Date'>14 октября 2022 г.</span>
              </div>
            </li>

            <li className='HistoryList__Item'>
              <div className='IconWrapper'>
                <Icon type='ArrowRight' />
              </div>
              <div className='Info'>
                <h4 className='Info__Title'>Двойной визит в аптеку</h4>
                <span className='Info__Date'>14 октября 2022 г.</span>
              </div>
            </li>

            <li className='HistoryList__Item'>
              <div className='IconWrapper'>
                <Icon type='ArrowRight' />
              </div>
              <div className='Info'>
                <h4 className='Info__Title'>Двойной визит в аптеку</h4>
                <span className='Info__Date'>14 октября 2022 г.</span>
              </div>
            </li>

            <li className='HistoryList__Item'>
              <div className='IconWrapper'>
                <Icon type='ArrowRight' />
              </div>
              <div className='Info'>
                <h4 className='Info__Title'>Двойной визит в аптеку</h4>
                <span className='Info__Date'>14 октября 2022 г.</span>
              </div>
            </li>
          </ul>
        )}
      </div>

      {/*<div className='CardContact__Buttons'>*/}
      {/*  <Button>Написать сообщение</Button>*/}
      {/*  <Button className='ButtonVideo'>Видеозвонок</Button>*/}
      {/*</div>*/}
    </div>
  );
};
