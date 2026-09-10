import React, { FC } from 'react';
import { Icon, Tooltip } from 'ui-kit';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { useModalsStore } from 'store/useModalsStore';
import './DirectoryFile.scss';
import includes from 'lodash/includes';
import { useMessageStore } from '../../../../MessageComponent';

interface IDirectoryFile {
  name: string;
}

export const DirectoryFile: FC<IDirectoryFile> = (props) => {
  const { name } = props;
  const titleKey = useChooseFileStore((state) => state.titleKey);
  const addFile = useChooseFileStore((state) => state.addFile);
  const closeModal = useModalsStore((state) => state.handleChooseFile);
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const showMessage = useMessageStore((state) => state.showMessage);

  const getFileExtension = (file: string) => {
    const string = file.split('.');
    return string[string.length - 1];
  };

  const getFileName = (file: string) => {
    return file.replace(`${titleKey}`, '');
  };

  const renderTooltipContent = (title: string) => {
    return <span>{title}</span>;
  };

  const onAddFile = () => {
    if (includes(selectedFiles, name)) {
      showMessage('error', 'Нельзя добавить дубликат файла!');
    } else {
      addFile(name);
    }
    closeModal(false);
  };

  return (
    <div className='DirectoryFile' onClick={onAddFile}>
      <div className='IconBlock'>
        <div className='IconBlock__Title'>{getFileExtension(name)}</div>
        <div className='IconBlock__Wrapper'>
          <Icon type={'File'} />
        </div>
      </div>
      <Tooltip
        content={renderTooltipContent(getFileName(name))}
        placement='top'
      >
        <span className='Title'>{getFileName(name)}</span>
      </Tooltip>
    </div>
  );
};
