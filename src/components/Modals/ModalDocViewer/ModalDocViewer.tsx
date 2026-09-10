import React from 'react';
import { Modal } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useMediaInfoStore } from 'pages';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import './ModalDocViewer.scss';

export const ModalDocViewer = () => {
  const isShowModal = useModalsStore((state) => state.isDocViewer);
  const changeShowModal = useModalsStore((state) => state.handleDocViewer);
  const url = useMediaInfoStore((state) => state.monitoredFileUrl);

  const docs = [
    {
      uri: url,
    },
  ];

  return (
    <Modal
      classNameContent={'ModalDocViewerStyle'}
      visibility={isShowModal}
      changeVisibility={changeShowModal}
      isIcon={true}
    >
      <div className='ModalDocViewer'>
        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
      </div>
    </Modal>
  );
};
