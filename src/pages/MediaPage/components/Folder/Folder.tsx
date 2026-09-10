import React, { FC, MouseEvent } from 'react';
import { Icon } from 'ui-kit';
import { hideLastCharacter } from 'utils/hideLastCharacter';
import { ROUTES } from 'enums';
import { useMediaStore } from 'pages/MediaPage/useMediaStore';
import { useMediaInfoStore } from 'pages/MediaPage/MediaInfo';
import { useModalsStore } from 'store/useModalsStore';
import { useNavigate } from 'react-router-dom';
import './Folder.scss';

interface IFolder {
  name: string;
}

export const Folder: FC<IFolder> = (props) => {
  const { name } = props;
  const setTitleKey = useMediaInfoStore((state) => state.setTitleKey);
  const setMonitoredFolder = useMediaStore((state) => state.setMonitoredFolder);
  const showModalRemove = useModalsStore((state) => state.handleRemoveFolder);
  const navigate = useNavigate();

  const onShowModalRemove = (e: MouseEvent<HTMLDivElement>, key: string) => {
    e.preventDefault();
    setMonitoredFolder(key);
    showModalRemove(true);
  };

  const onRedirectMediaInfo = (key: string) => {
    setTitleKey(key);
    navigate(ROUTES.MEDIA_INFO);
  };

  return (
    <div
      className='Folder'
      onClick={() => onRedirectMediaInfo(name)}
      onContextMenu={(e) => onShowModalRemove(e, name)}
    >
      <Icon type={'Folder'} />
      <span className='Title'>{hideLastCharacter(name)}</span>
    </div>
  );
};
