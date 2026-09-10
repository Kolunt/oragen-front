import React, { FC, memo, useMemo, useState } from 'react';
import { useModalsStore } from 'store/useModalsStore';
import {
  ApplicationType,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { ProposalType } from 'pages';
import { ModalInformationOnApplication } from 'components/Modals/ApplicationModals/ModalInformationOnApplication/ModalInformationOnApplication';
import { ApplicationApproval } from 'enums/ApplicationTypes';
import dayjs from 'dayjs';
import { DateFormats } from 'enums';
import './Application.scss';

interface IApplication {
  application: ApplicationType;
  isOpenDetails: boolean;
  handleOpenApplication: (type: ProposalType, newId: number | null) => void;
}

export const Application: FC<IApplication> = memo((props) => {
  const { application, isOpenDetails, handleOpenApplication } = props;

  const showModalCardContact = useModalsStore(
    (state) => state.handleCardContact
  );
  const addNameModalCardContact = useModalsStore(
    (state) => state.handleCardContactName
  );
  const acceptContactProposal = useApplicationsStore(
    (state) => state.acceptContactProposal
  );
  const acceptOrganizationProposal = useApplicationsStore(
    (state) => state.acceptOrganizationProposal
  );
  const declineContactProposal = useApplicationsStore(
    (state) => state.declineContactProposal
  );
  const declineOrganizationProposal = useApplicationsStore(
    (state) => state.declineOrganizationProposal
  );
  const monitoredApplication = useApplicationsStore(
    (state) => state.monitoredApplication
  );
  const getMonitoredApplication = useApplicationsStore(
    (state) => state.getMonitoredApplication
  );
  const [isOpen, setOpen] = useState(isOpenDetails);
  const isContact = 'full_name' in application;

  const handleOpen = () => {
    const type = isContact ? 'contact' : 'organization';
    handleOpenApplication(type, +application.id);
    setOpen((prev) => !prev);
  };

  const handleClickModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    addNameModalCardContact('Зубенко Геннадий Александрович');
    showModalCardContact(true);
  };

  let statusApplication, colorStyle;

  switch (application.approval) {
    case ApplicationApproval.ACCEPTED:
      statusApplication = 'Принята';
      colorStyle = 'Circle--completed';
      break;
    case ApplicationApproval.DECLINED:
      statusApplication = 'Отклонена';
      colorStyle = 'Circle--rejected';
      break;
    default:
      statusApplication = 'На рассмотрении';
      colorStyle = '';
  }

  const onAcceptProposalClick = () => {
    if (isContact) {
      acceptContactProposal(+application.id);
    } else acceptOrganizationProposal(+application.id);
    setOpen(false);
  };

  const onDeclineProposalClick = () => {
    if (isContact) {
      declineContactProposal(+application.id);
    } else declineOrganizationProposal(+application.id);
    setOpen(false);
  };

  const statusAction = useMemo(() => {
    return isContact
      ? application.contact_source &&
          Object.keys(application.contact_source).length > 0
      : application.organization_source &&
          Object.keys(application.organization_source).length > 0;
  }, [application]);
  return (
    <div key={application.id} className='Application' onClick={handleOpen}>
      <div className='Application__Header'>
        <div className='ApplicationNumber'>
          <div className='ApplicationNumber__Number color-secondary-l2'>
            № {application.id}
          </div>
          <div className='ApplicationNumber__Status'>
            <div className={`Circle ${colorStyle}`} />
            <span>{statusApplication}</span>
          </div>
        </div>
        <div className='justify-center flex items-center'>
          {dayjs(application?.created_at).format(DateFormats.APP_DATE_FORMAT)}
        </div>
        <div className='Profile'>
          <div className='Profile__Info'>
            <div className='Profile__Title fz-13 color-black-l2 mb-5'>
              {application.creator.last_name} {application.creator.first_name}
            </div>
            {/*{isContact && (*/}
            {/*  <span className='Profile__Phone color-secondary-l2 fz-12'>*/}
            {/*    {application.phone}*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
        </div>
        <div className='ml-auto flex'>
          <div className='ApplicationNumber__Status'>
            <div
              className={`Circle ${statusAction ? 'Circle--completed' : ''}`}
            />
            <span>{statusAction ? 'Изменение' : 'Добавление'}</span>
          </div>
        </div>
      </div>
      <ModalInformationOnApplication
        label={statusAction ? 'Заявка на изменение' : 'Заявка на добавление'}
        application={application}
        isShowModal={isOpen}
        changeShowModal={(v) => setOpen(v)}
        onDeclineProposalClick={() => onDeclineProposalClick()}
        onAcceptProposalClick={() => onAcceptProposalClick()}
      />
    </div>
  );
});
