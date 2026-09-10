import React, { useState } from 'react';

import BigCross from 'assets/svg/organizationsPage/OrganizationsCase.svg';
import { useModalsStore } from 'store/useModalsStore';
import { Avatar, Button, Icon } from 'ui-kit';
import { ITab, Tabs } from 'ui-kit/Tabs/Tabs';
import './CardOrganization.scss';

const tabs: ITab[] = [
  { id: '1', label: 'Профиль' },
  // { id: '2', label: 'Задачи' },
  // { id: '3', label: 'Календарь' },
  // { id: '4', label: 'Диск' },
  // { id: '5', label: 'Живая лента' },
  // { id: '6', label: 'Группы' },
];

export const CardOrganization = () => {
  const name = useModalsStore((state) => state.cardOrganizationName);
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabClick = (id: string | number) => {
    setSelectedTabId(id);
  };

  return (
    <div className='CardOrganization'>
      <div className='IconWrapper'>
        <Icon type='CardChange' />
      </div>

      <div className='CardOrganization__Title'>
        <div className='AvatarWrapper'>
          <Avatar image={BigCross} />
        </div>
        <span className='CardOrganization__Type'>Аптека</span>
        <span className='CardOrganization__Name'>{name}</span>
      </div>

      <Tabs
        className='CustomTabs'
        selectedId={selectedTabId}
        tabs={tabs}
        onClick={handleTabClick}
      />

      <div className='CardInnerProfile'>
        <ul className='List'>
          <li className='List__Item'>
            <span className='Title'>Адрес</span>
            <span>Улица Пушкина, дом 41, офис 703</span>
          </li>
          <li className='List__Item'>
            <span className='Title'>Количество сотрудников</span>
            <span>126</span>
          </li>
          <li className='List__Item'>
            <span className='Title'>Email</span>
            <span className='Link'>i.mitsiev@gmail.com</span>
          </li>
          <li className='List__Item'>
            <span className='Title'>Мобильный телефон</span>
            <span className='Link'>+7 (999) 964-76-27</span>
          </li>
          <li className='List__Item'>
            <span className='Title'>Рабочий телефон</span>
            <span className='Link'>+7 (999) 964-76-27</span>
          </li>
        </ul>
      </div>

      {/*<div className='CardOrganization__Buttons'>*/}
      {/*  <Button>Написать сообщение</Button>*/}
      {/*  <Button className='ButtonVideo'>Видеозвонок</Button>*/}
      {/*</div>*/}
    </div>
  );
};
