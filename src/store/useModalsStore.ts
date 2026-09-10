import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type VisitCountType = 'matchedContact' | 'local';
export type MatchedContactType = 'contact' | 'organization';

export interface IVisitCountPayload {
  targetListId: number;
  contactId?: number;
  maxVisits?: number;
  currentValue: number;
  type: VisitCountType;
  contactType?: MatchedContactType;
}

interface IModalsStore {
  isChangeVisitDate: boolean;
  isVisitFiles: boolean;
  isChooseFile: boolean;
  isMainFooter: boolean;
  isEvent: boolean;
  isContact: boolean;
  isOrganization: boolean;
  isApplication: boolean;
  isMessage: boolean;
  isTask: boolean;
  isMainVisit: boolean;
  isCardContact: boolean;
  cardContactName: string;
  isCardOrganization: boolean;
  cardOrganizationName: string;
  isVisit: boolean;
  isVisitRemote: boolean;
  isVisitPharmacy: boolean;
  isChangeOrganization: boolean;
  organizationId: string;
  isContactOnTarget: boolean;
  isChangeContact: boolean;
  contactId: string;
  isChangeVisit: boolean;
  isChangeVisitPharmacy: boolean;
  isChangeVisitMR: boolean;
  isChangeVisitPharmacyMR: boolean;
  isChooseDoctor: boolean;
  isChooseCompany: boolean;
  isAdminActivity: boolean;
  isSurvey: boolean;
  isPeople: boolean;
  isPeopleId: string;
  isChangeTarget: boolean;
  isChangeTargetId: string;
  isApplicationContact: boolean;
  isApplicationOrganization: boolean;
  isKeyMessage: boolean;
  isAddEventTime: boolean;
  isAddNews: boolean;
  isTaskSelection: boolean;
  isAddSubTask: boolean;
  isSubTaskInfo: boolean;
  isAddDrug: boolean;
  isAddCustomField: boolean;
  isErrorWidthScreen: boolean;
  isChangeEmployee: boolean;
  isAddBrick: boolean;
  isComment: boolean;
  isVisitsCount: boolean;
  isAddFolder: boolean;
  isRemoveFolder: boolean;
  isDocViewer: boolean;
  isVisitsCountPayload: IVisitCountPayload;
  handleVisitFiles: (value: boolean) => void;
  handleChangeVisitDate: (value: boolean) => void;
  handleChooseFile: (value: boolean) => void;
  handleMainFooter: (value: boolean) => void;
  handleEvent: (value: boolean) => void;
  handleContact: (value: boolean) => void;
  handleOrganization: (value: boolean) => void;
  handleApplication: (value: boolean) => void;
  handleMessage: (value: boolean) => void;
  handleTask: (value: boolean) => void;
  handleMainVisit: (value: boolean) => void;
  handleCardContact: (value: boolean) => void;
  handleCardContactName: (name: string) => void;
  handleCardOrganization: (value: boolean) => void;
  handleCardOrganizationName: (name: string) => void;
  handleVisit: (value: boolean) => void;
  handleVisitRemote: (value: boolean) => void;
  handleVisitPharmacy: (value: boolean) => void;
  handleChangeOrganization: (value: boolean) => void;
  handleChangeOrganizationId: (id: string) => void;
  handleContactOnTarget: (value: boolean) => void;
  handleChangeContact: (value: boolean) => void;
  handleChangeContactId: (id: string) => void;
  handleChangeVisit: (value: boolean) => void;
  handleChangeVisitPharmacy: (value: boolean) => void;
  handleChangeVisitMR: (value: boolean) => void;
  handleChangeVisitPharmacyMR: (value: boolean) => void;
  handleChooseDoctor: (value: boolean) => void;
  handleChooseCompany: (value: boolean) => void;
  handleAdminActivity: (value: boolean) => void;
  handleSurvey: (value: boolean) => void;
  handlePeople: (value: boolean) => void;
  handlePeopleId: (id: string) => void;
  handleChangeTarget: (value: boolean) => void;
  handleChangeTargetId: (id: string) => void;
  handleApplicationContact: (value: boolean) => void;
  handleApplicationOrganization: (value: boolean) => void;
  handleKeyMessage: (value: boolean) => void;
  handleAddEventTime: (value: boolean) => void;
  handleAddNews: (value: boolean) => void;
  handleTaskSelection: (value: boolean) => void;
  handleAddSubTask: (value: boolean) => void;
  handleSubTaskInfo: (value: boolean) => void;
  handleAddDrug: (value: boolean) => void;
  handleAddCustomField: (value: boolean) => void;
  handleErrorWidthScreen: (value: boolean) => void;
  handleChangeEmployee: (value: boolean) => void;
  handleAddBrick: (value: boolean) => void;
  handleComment: (value: boolean) => void;
  handleVisitsCount: (value: boolean) => void;
  handleVisitsCountPayload: (payload: IVisitCountPayload) => void;
  handleAddFolder: (value: boolean) => void;
  handleRemoveFolder: (value: boolean) => void;
  handleDocViewer: (value: boolean) => void;
}

export const useModalsStore = create<IModalsStore>()(
  immer((set) => ({
    isVisitFiles: false,
    isChangeVisitDate: false,
    isChooseFile: false,
    isMainFooter: false,
    isEvent: false,
    isContact: false,
    isOrganization: false,
    isApplication: false,
    isMessage: false,
    isTask: false,
    isMainVisit: false,
    isCardContact: false,
    cardContactName: '',
    isCardOrganization: false,
    cardOrganizationName: '',
    isVisit: false,
    isVisitRemote: false,
    isVisitPharmacy: false,
    isChangeOrganization: false,
    organizationId: '',
    isContactOnTarget: false,
    isChangeContact: false,
    contactId: '',
    isChangeVisit: false,
    isChangeVisitPharmacy: false,
    isChangeVisitMR: false,
    isChangeVisitPharmacyMR: false,
    isChooseDoctor: false,
    isChooseCompany: false,
    isAdminActivity: false,
    isSurvey: false,
    isPeople: false,
    isPeopleId: '',
    isChangeTarget: false,
    isChangeTargetId: '',
    isApplicationContact: false,
    isApplicationOrganization: false,
    isKeyMessage: false,
    isAddEventTime: false,
    isAddNews: false,
    isTaskSelection: false,
    isAddSubTask: false,
    isSubTaskInfo: false,
    isAddDrug: false,
    isAddCustomField: false,
    isErrorWidthScreen: false,
    isChangeEmployee: false,
    isAddBrick: false,
    isComment: false,
    isVisitsCount: false,
    isAddFolder: false,
    isRemoveFolder: false,
    isDocViewer: false,
    isVisitsCountPayload: {} as IVisitCountPayload,
    handleVisitFiles: (value) => set({ isVisitFiles: value }),
    handleChangeVisitDate: (value) => set({ isChangeVisitDate: value }),
    handleChooseFile: (value) => set({ isChooseFile: value }),
    handleMainFooter: (value) => set({ isMainFooter: value }),
    handleEvent: (value) => set({ isEvent: value }),
    handleContact: (value) => set({ isContact: value }),
    handleOrganization: (value) => set({ isOrganization: value }),
    handleApplication: (value) => set({ isApplication: value }),
    handleMessage: (value) => set({ isMessage: value }),
    handleTask: (value) => set({ isTask: value }),
    handleMainVisit: (value) => set({ isMainVisit: value }),
    handleCardContact: (value) => set({ isCardContact: value }),
    handleCardContactName: (name) => set({ cardContactName: name }),
    handleCardOrganization: (value) => set({ isCardOrganization: value }),
    handleCardOrganizationName: (name) => set({ cardOrganizationName: name }),
    handleVisit: (value) => set({ isVisit: value }),
    handleChangeOrganization: (value) => set({ isChangeOrganization: value }),
    handleChangeOrganizationId: (id) => set({ organizationId: id }),
    handleContactOnTarget: (value) => set({ isContactOnTarget: value }),
    handleChangeContact: (value) => set({ isChangeContact: value }),
    handleChangeContactId: (id) => set({ contactId: id }),
    handleChangeVisit: (value) => set({ isChangeVisit: value }),
    handleChangeVisitPharmacy: (value) => set({ isChangeVisitPharmacy: value }),
    handleVisitRemote: (value) => set({ isVisitRemote: value }),
    handleVisitPharmacy: (value) => set({ isVisitPharmacy: value }),
    handleChangeVisitMR: (value) => set({ isChangeVisitMR: value }),
    handleChangeVisitPharmacyMR: (value) =>
      set({ isChangeVisitPharmacyMR: value }),
    handleChooseDoctor: (value) => set({ isChooseDoctor: value }),
    handleChooseCompany: (value) => set({ isChooseCompany: value }),
    handleAdminActivity: (value) => set({ isAdminActivity: value }),
    handleSurvey: (value) => set({ isSurvey: value }),
    handlePeople: (value) => set({ isPeople: value }),
    handlePeopleId: (id) => set({ isPeopleId: id }),
    handleChangeTarget: (value) => set({ isChangeTarget: value }),
    handleChangeTargetId: (id) => set({ isChangeTargetId: id }),
    handleApplicationContact: (value) => set({ isApplicationContact: value }),
    handleApplicationOrganization: (value) =>
      set({ isApplicationOrganization: value }),
    handleKeyMessage: (value) => set({ isKeyMessage: value }),
    handleAddEventTime: (value) => set({ isAddEventTime: value }),
    handleAddNews: (value) => set({ isAddNews: value }),
    handleTaskSelection: (value) => set({ isTaskSelection: value }),
    handleAddSubTask: (value) => set({ isAddSubTask: value }),
    handleSubTaskInfo: (value) => set({ isSubTaskInfo: value }),
    handleAddDrug: (value) => set({ isAddDrug: value }),
    handleAddCustomField: (value) => set({ isAddCustomField: value }),
    handleErrorWidthScreen: (value) => set({ isErrorWidthScreen: value }),
    handleChangeEmployee: (value) => set({ isChangeEmployee: value }),
    handleAddBrick: (value) => set({ isAddBrick: value }),
    handleComment: (value) => set({ isComment: value }),
    handleVisitsCount: (value) => set({ isVisitsCount: value }),
    handleVisitsCountPayload: (payload) =>
      set({ isVisitsCountPayload: payload }),
    handleAddFolder: (value) => set({ isAddFolder: value }),
    handleRemoveFolder: (value) => set({ isRemoveFolder: value }),
    handleDocViewer: (value) => set({ isDocViewer: value }),
  }))
);
