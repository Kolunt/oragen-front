import React from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { Icon, Modal } from 'ui-kit';
import './ModalVisitMain.scss';

export const ModalVisitMain = () => {
  const isShowModal = useModalsStore((state) => state.isMainVisit);
  const changeShowModal = useModalsStore((state) => state.handleMainVisit);
  const showVisit = useModalsStore((state) => state.handleVisit);
  const showRemoteVisit = useModalsStore((state) => state.handleVisitRemote);
  const showPharmacyVisit = useModalsStore(
    (state) => state.handleVisitPharmacy
  );

  const onShowModalAddVisit = () => {
    changeShowModal(false);
    showVisit(true);
  };

  const onShowModalRemoteVisit = () => {
    changeShowModal(false);
    showRemoteVisit(true);
  };

  const onShowModalPharmacyVisit = () => {
    changeShowModal(false);
    showPharmacyVisit(true);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalVisitMain'>
        <div className='ModalVisitMain__Item' onClick={onShowModalAddVisit}>
          <div className='ModalVisitMain__Icon'>
            <Icon type='VisitsTwoUsers' />
          </div>
          <p>Визит к врачу</p>
        </div>

        <div className='ModalVisitMain__Item' onClick={onShowModalRemoteVisit}>
          <div className='ModalVisitMain__Icon'>
            <Icon type='VisitsTv' />
          </div>
          <p>Дистанционный визит</p>
        </div>

        <div
          className='ModalVisitMain__Item'
          onClick={onShowModalPharmacyVisit}
        >
          <div className='ModalVisitMain__Icon'>
            <Icon type='VisitsUnion' />
          </div>
          <p>Визит в аптеку</p>
        </div>

        {/*     <div className='wrapper'>
          <div
            className='ModalVisitMain__Big-Item'
            onClick={() => showDoctor(true)}
          >
            <div className='ModalVisitMain__Big-Icon'>
              <Icon type={'VisitsHeroAccent'} />
            </div>
            <p>Врач</p>
          </div> */}

        {/*<div
          className='ModalVisitMain__Big-Item'
          onClick={() => showCompany(true)}
         >
          <div className='ModalVisitMain__Big-Icon'>
            <Icon type={'VisitsCrossAccent'} />
          </div>
          <p>Организация</p>
         </div>
         </div> */}
      </div>
    </Modal>
  );
};
