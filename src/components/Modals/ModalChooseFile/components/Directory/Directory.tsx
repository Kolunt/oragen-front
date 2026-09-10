import React, { FC } from 'react';
import { Icon } from 'ui-kit';
import { hideLastCharacter } from 'utils/hideLastCharacter';
import './Directory.scss';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';

interface IDirectory {
  name: string;
  showFiles: () => void;
}

export const Directory: FC<IDirectory> = (props) => {
  const { name, showFiles } = props;
  const setTitleKey = useChooseFileStore((state) => state.setTitleKey);

  const onShowFiles = () => {
    showFiles();
    setTitleKey(name);
  };

  return (
    <div className='Directory' onClick={onShowFiles}>
      <Icon type={'Folder'} />
      <span className='Title'>{hideLastCharacter(name)}</span>
    </div>
  );
};
