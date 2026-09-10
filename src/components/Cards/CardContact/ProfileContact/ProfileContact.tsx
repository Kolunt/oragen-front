import React, { FC } from 'react';
import { IContact } from '../../../../store/useContactsStore';
import './style.scss';

interface IProfileContact {
  informationContact: IContact;
}

export const ProfileContact: FC<IProfileContact> = ({ informationContact }) => {
  const { phone, position, company, email, full_name, address } =
    informationContact;
  return (
    <div className='grid'>
      {/*<div className='mb-10 item'>*/}
      {/*    <span className='fw-600 pr-20'>ФИО</span>*/}
      {/*    <span className=''>{full_name}</span>*/}
      {/*</div>*/}
      <div className='mb-10 item'>
        <span className='fw-600 pr-20'>Организация</span>
        <span className=''>{company}</span>
      </div>
      <div className='mb-10 item'>
        <span className='fw-600 pr-20'>Адрес организации</span>
        <span className=''>{address}</span>
      </div>
      <div className='mb-10 item'>
        <span className='fw-600 pr-20'>Специальность</span>
        <span>{position}</span>
      </div>
      <div className='mb-10 item'>
        <span className='fw-600 pr-20'>Email</span>
        <span className=''>{email}</span>
      </div>
      <div className='mb-10 item'>
        <span className='fw-600 pr-20'>Мобильный телефон</span>
        <span className=''>{phone}</span>
      </div>
      {/*<li className='ProfileList__Item'>*/}
      {/*    <span className='Title'>Рабочий телефон</span>*/}
      {/*    <span className='Link'>+7 (999) 964-76-27</span>*/}
      {/*</li>*/}
      {/*<li className='ProfileList__Item'>*/}
      {/*    <span className='Title'>Внутренний телефон</span>*/}
      {/*    <span>12</span>*/}
      {/*</li>*/}
      {/*<li className='ProfileList__Item'>*/}
      {/*    <span className='Title'>Дата рождения</span>*/}
      {/*    <span>30.01.1999</span>*/}
      {/*</li>*/}
    </div>
  );
};
