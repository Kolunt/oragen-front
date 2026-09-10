import React, { FC } from 'react';
import { Icon } from 'ui-kit';
import { v1 } from 'uuid';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { useModalsStore } from 'store/useModalsStore';
import './ChooseFiles.scss';

interface IChooseFiles {
  hideAddFile?: boolean;
}
// работает с ModalChooseFile
export const ChooseFiles: FC<IChooseFiles> = ({ hideAddFile }) => {
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const removeFile = useChooseFileStore((state) => state.removeFile);
  const showModalChooseFile = useModalsStore((state) => state.handleChooseFile);

  const getFileName = (file: string) => {
    const string = file.split('/');
    return string[string.length - 1];
  };

  return (
    <div className='ChooseFiles'>
      <div>
        {!hideAddFile && (
          <Icon
            type={'AddFile'}
            className='pointer'
            onClick={() => showModalChooseFile(true)}
          />
        )}
      </div>
      <div className='Files'>
        {selectedFiles.map((key) => (
          <div key={v1()} className='File'>
            <div>{getFileName(key)}</div>
            <div onClick={() => removeFile(key)}>
              <Icon type={'DeleteUser'} className='pointer' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
