import React, { useEffect } from 'react';
import { useVisitFilesStore } from 'components/Modals/ModalVisitFiles/useVisitFilesStore';
import { useModalsStore } from 'store/useModalsStore';
import { Button, Icon, Modal, Tooltip } from 'ui-kit';
import { v1 } from 'uuid';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { ChooseFiles } from 'components/ChooseFiles';
import './ModalVisitFiles.scss';
import { RoleTypes } from '../../../enums';
import { useUserStore } from '../../../store/useUserStore';

export const ModalVisitFiles = () => {
  const isShowModal = useModalsStore((state) => state.isVisitFiles);
  const changeShowModal = useModalsStore((state) => state.handleVisitFiles);
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const clearStore = useChooseFileStore((state) => state.clearStore);
  const getKeys = useVisitFilesStore((state) => state.getKeys);
  const keys = useVisitFilesStore((state) => state.keys);
  const addFiles = useVisitFilesStore((state) => state.addFiles);
  const deleteFile = useVisitFilesStore((state) => state.removeFile);
  const myRole = useUserStore((state) => state.me.roles[0].name);

  useEffect(() => {
    if (isShowModal) {
      getKeys();
    }
  }, [isShowModal]);

  const getFileExtension = (file: string) => {
    const string = file.split('.');
    return string[string.length - 1];
  };

  const getFileName = (file: string) => {
    const string = file.split('/');
    return string[string.length - 1];
  };

  const renderTooltipContent = (title: string) => {
    return <span>{title}</span>;
  };

  const onAddFiles = () => {
    addFiles(selectedFiles);
    clearStore();
  };

  return (
    <Modal
      visibility={isShowModal}
      changeVisibility={changeShowModal}
      isIcon={true}
      minPriority={true}
    >
      <div className='ModalVisitFiles'>
        <div className='FileList'>
          {keys.map((item) => (
            <div key={v1()} className='FileListItem'>
              <div className='IconBlock'>
                <div className='IconBlock__Title'>{getFileExtension(item)}</div>
                <div className='IconBlock__Wrapper'>
                  <Icon type={'File'} />
                </div>
              </div>
              <Tooltip
                content={renderTooltipContent(getFileName(item))}
                placement='top'
              >
                <span className='Title'>{getFileName(item)}</span>
              </Tooltip>
              {myRole !== RoleTypes.MED_REP && (
                <div className='IconDelete' onClick={() => deleteFile(item)}>
                  <Icon type={'MediaDeleteFile'} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='FilesToAdd'>
          <ChooseFiles hideAddFile={myRole === RoleTypes.MED_REP} />
          {!!selectedFiles.length && (
            <Button className='mt-10' onClick={onAddFiles}>
              Добавить
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
