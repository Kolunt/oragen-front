import React from 'react';
import { Avatar, Button } from 'ui-kit';
import AvatarImg from 'assets/img/tasks/avatar.jpg';
import './AuthorTaskInfo.scss';

export const AuthorTaskInfo = () => {
  return (
    <div className='AuthorInfo'>
      <div className='AuthorInfo__Header'>
        <div className='Title'>
          <span className='Position'>Фармацевт провизор</span>

          <span className='Name'>Рождественский</span>
          <span className='Name'>Константин Николаевич</span>
        </div>

        <Avatar className='CustomAvatar' image={AvatarImg} />
      </div>

      <div className='AuthorInfo__Content'>
        <div className='AuthorInfoList'>
          <div className='AuthorInfoListItem'>
            <span className='Title'>Email</span>
            <span className='Link'>i.mitsiev@gmail.com</span>
          </div>

          <div className='AuthorInfoListItem'>
            <span className='Title'>Мобильный телефон</span>
            <span className='Link'>+7 (999) 964-76-27 </span>
          </div>

          <div className='AuthorInfoListItem'>
            <span className='Title'>Часовой пояс</span>
            <span className='Info'>(UTC +05:00)</span>
          </div>

          <div className='AuthorInfoListItem'>
            <span className='Title'>Должность</span>
            <span className='Info'>Екатеринбург</span>
          </div>
        </div>

        <div className='Buttons'>
          <Button className='CustomButton'>Написать сообщение</Button>
          <Button className='CustomButton'>Поставить задачу</Button>
        </div>
      </div>
    </div>
  );
};
