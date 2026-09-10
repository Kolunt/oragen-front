import { ApplicationType } from 'store/useApplicationsStore';

export interface IModalInformationOnApplication {
  application: ApplicationType;
  isShowModal: boolean;
  changeShowModal: (value: boolean) => void;
  onAcceptProposalClick: () => void;
  onDeclineProposalClick: () => void;
  label: string;
}
