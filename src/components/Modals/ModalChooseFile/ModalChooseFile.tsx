import React, { useEffect, useState } from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { Modal } from 'ui-kit';
import { v1 } from 'uuid';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { Directory } from 'components/Modals/ModalChooseFile/components/Directory/Directory';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { DirectoryFile } from 'components/Modals/ModalChooseFile/components/DirectoryFile/DirectoryFile';
import './ModalChooseFile.scss';

export const ModalChooseFile = () => {
  const isShowModal = useModalsStore((state) => state.isChooseFile);
  const changeShowModal = useModalsStore((state) => state.handleChooseFile);
  const folders = useChooseFileStore((state) => state.folders);
  const getFolders = useChooseFileStore((state) => state.getFolders);
  const files = useChooseFileStore((state) => state.files);
  const getFiles = useChooseFileStore((state) => state.getFiles);
  const titleKey = useChooseFileStore((state) => state.titleKey);
  const [isModeFiles, setModeFiles] = useState<boolean>(false);

  useEffect(() => {
    if (isShowModal) {
      if (!isModeFiles) {
        getFolders();
      }
      if (isModeFiles) {
        getFiles();
      }
    }
  }, [isModeFiles, isShowModal]);

  return (
    <Modal
      visibility={isShowModal}
      changeVisibility={changeShowModal}
      isIcon={true}
    >
      <div className='ModalChooseFile'>
        {isModeFiles && (
          <Breadcrumbs
            className='m-0'
            links={[
              { title: 'Папки', callback: () => setModeFiles(false) },
              { title: 'Файлы' },
            ]}
          />
        )}
        <div className='Documents'>
          {isModeFiles
            ? files
                ?.filter((item) => item !== titleKey)
                .map((item) => <DirectoryFile key={v1()} name={item} />)
            : folders?.map((item) => (
                <Directory
                  key={v1()}
                  name={item}
                  showFiles={() => setModeFiles(true)}
                />
              ))}
        </div>
      </div>
    </Modal>
  );
};
