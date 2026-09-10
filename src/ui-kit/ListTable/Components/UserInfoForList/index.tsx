import React, { FC, memo } from 'react';
import { Avatar } from '../../../index';
import AvatarImg from '../../../../assets/svg/contacts/ContactsPerson.svg';

interface IUser {
  user: {
    full_name: string;
    phone: string;
  };
  handleClickModalContact?: (name: string) => void;
  showAvatar?: boolean;
  className?: string;
}

// todo очень странный функционал handleClickModalContact
export const UserInfoForList: FC<IUser> = memo(
  ({ user, handleClickModalContact, showAvatar, className }) => {
    const { full_name, phone } = user;

    const onClickModalContact = (fullName: string) => {
      if (handleClickModalContact) {
        handleClickModalContact(fullName);
      }
    };

    return (
      <div
        className={`flex items-center ${className}`}
        onClick={() => onClickModalContact(full_name)}
      >
        {showAvatar && (
          <Avatar className='bg-background-l5 br-50 mr-8' image={AvatarImg} />
        )}
        <div className='fz-10'>
          <div className=''>{full_name}</div>
          <span className='color-secondary-l2'>{phone}</span>
        </div>
      </div>
    );
  }
);
