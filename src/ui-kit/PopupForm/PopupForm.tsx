import React, { FC, memo } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AuthorTaskInfo } from 'components/AuthorTaskInfo';
import './PopupForm.scss';

interface IPopup {
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined;
}

export const PopupForm: FC<IPopup> = memo((props) => {
  const { trigger } = props;

  const popupStyle = {
    width: 378,
    padding: 0,
    borderRadius: 15,
    boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
    border: 'none',
  };

  return (
    <Popup
      contentStyle={popupStyle}
      arrow={false}
      trigger={trigger}
      position='bottom right'
    >
      <AuthorTaskInfo />
    </Popup>
  );
});
