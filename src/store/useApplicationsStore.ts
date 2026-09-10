import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IOrganization } from './useOrganizationsStore';
import { FilterApplicationTypes, RoleTypes } from 'enums';
import { IContact } from 'store/useContactsStore';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { IGetContact, OrderByType } from 'api/contactApi';
import {
  createContactApplication,
  createOrganizationApplication,
  fetchContactApplications,
  fetchOrganizationApplications,
} from 'api';
import {
  acceptContactApplication,
  acceptOrganizationApplication,
  declineContactApplication,
  declineOrganizationApplication,
  IGetContactProposal,
  UserAgreementType,
} from 'api/applicationsApi';
import { useUserStore } from 'store/useUserStore';
import { useMessageStore } from 'components';

export type FilterApplicationType =
  | FilterApplicationTypes.UNDER_REVIEW
  | FilterApplicationTypes.COMPLETED
  | FilterApplicationTypes.REJECTED;

export type ApplicationStatus = 'inprocess' | 'declined' | 'accepted';

interface ICreator {
  first_name: string;
  last_name: string;
  name: string;
}

export interface IContactApplication extends IContact {
  contact_id?: number;
  approval: ApplicationStatus;
  created_by: number;
  contact_source?: IContact;
  creator: ICreator;
  user_agreement: boolean;
  user_agreement_contact: boolean;
  user_agreement_mail: boolean;
  user_agreement_sms: boolean;
}

export interface CreateContactApplicationType {
  id?: number;
  full_name: string;
  company: string;
  phone: string;
  position: string;
  organization_type: string;
  address: string;
  email: string;
}
export interface CreateOrganizationApplicationType {
  id?: number;
  name: string;
  number_of_employees: string;
  organization_type: string;
  address: string;
  phone?: string;
}

export interface IOrganizationApplication extends IOrganization {
  organization_id: number | null;
  approval: ApplicationStatus;
  created_by: number;
  organization_source?: IOrganization;
  creator: ICreator;
}

export interface IWhere {
  approval?: ApplicationStatus;
}

interface IApplicationFiltration {
  where: IWhere;
  user_agreement?: UserAgreementType;
  user_agreement_contact?: UserAgreementType;
}

export interface IGetApplications {
  where?: string;
  like?: string;
  order?: IContactApplication;
  orderBy?: OrderByType;
  created_by?: number;
}

export type ApplicationType = IContactApplication | IOrganizationApplication;

interface IApplicationsStore {
  monitoredApplication: ApplicationType;
  applications: ApplicationType[];
  getMonitoredApplication: (id: number, isContact: boolean) => void;
  getContactApplications: (params?: IGetContactProposal) => void;
  getOrganizationApplications: (params?: IGetContactProposal) => void;
  addContactApplication: (newApplication: CreateContactApplicationType) => void;
  addOrganizationApplication: (
    newApplication: CreateOrganizationApplicationType
  ) => void;
  acceptContactProposal: (id: number) => void;
  acceptOrganizationProposal: (id: number) => void;
  declineContactProposal: (id: number) => void;
  declineOrganizationProposal: (id: number) => void;
  filtration: IApplicationFiltration;
  setFiltration: (filtration: IApplicationFiltration) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  pageSize: number;
  numberOfApplication: number;
}

/*const foo = async (set: any, params: any) => {
  useAuthStore.getState().setLoading(true);
  try {
    const res = await fetchOrganizationApplications(params);
    const { data } = await fetchContactApplications(params);
    if (data && res.data) {
      set({ applications: { ...data, ...res.data } });
    }
  } finally {
    useAuthStore.getState().setLoading(false);
  }
}*/

/*(params) => foo(set, params)*/

export const useApplicationsStore = create<IApplicationsStore>()(
  immer((set, get) => ({
    monitoredApplication: {} as ApplicationType,
    applications: [],
    filtration: {
      where: {} as IWhere,
    } as IApplicationFiltration,
    pageSize: 10,
    currentPage: 1,
    numberOfApplication: 0,
    getMonitoredApplication: async (id, isContact) => {
      useAuthStore.getState().setLoading(true);
      try {
        if (isContact) {
          const { data } = await fetchContactApplications({ id });
          if (data) {
            set({ monitoredApplication: data as any });
          }
        } else {
          const { data } = await fetchOrganizationApplications({ id });
          if (data) {
            set({ monitoredApplication: data as any });
          }
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    getContactApplications: async () => {
      useAuthStore.getState().setLoading(true);
      /*    const like = JSON.stringify({
        full_name: get().filtration.search,
      });*/
      const user = useUserStore.getState().me;
      const myRole = user.roles[0].name;
      const userId = myRole !== RoleTypes.CALL_CENTER ? user.id : undefined;

      const where = JSON.stringify({
        approval: get().filtration.where.approval,
      });

      const params: IGetContactProposal = {
        where,
        created_by: userId,
        user_agreement: get().filtration.user_agreement,
        user_agreement_contact: get().filtration.user_agreement_contact,
      };

      const payload = {
        paginationMethod: 'full',
        page: get().currentPage,
        pageSize: get().pageSize,
      };

      try {
        const { data } = await fetchContactApplications(params, payload);
        if (data) {
          set({
            applications: data.data,
            currentPage: data.current_page,
            numberOfApplication: data.total,
          });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    getOrganizationApplications: async () => {
      useAuthStore.getState().setLoading(true);
      /*    const like = JSON.stringify({
        name: get().filtration.search,
      });*/
      const user = useUserStore.getState().me;
      const myRole = user.roles[0].name;
      const userId = myRole !== RoleTypes.CALL_CENTER ? user.id : undefined;

      const where = JSON.stringify({
        approval: get().filtration.where.approval,
      });

      const params: IGetContact = {
        where,
        created_by: userId,
      };

      const payload = {
        paginationMethod: 'full',
        page: get().currentPage,
        pageSize: get().pageSize,
      };
      try {
        const { data } = await fetchOrganizationApplications(params, payload);
        if (data) {
          set({
            applications: data.data,
            currentPage: data.current_page,
            numberOfApplication: data.total,
          });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    addOrganizationApplication: async (newApplication) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await createOrganizationApplication(newApplication);
        if (data.success) {
          useMessageStore
            .getState()
            .showMessage('success', 'Заявка успешно создана!');
          useApplicationsStore.getState().getOrganizationApplications();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    addContactApplication: async (newApplication) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await createContactApplication(newApplication);
        if (data.success) {
          useMessageStore
            .getState()
            .showMessage('success', 'Заявка успешно создана!');
          useApplicationsStore.getState().getContactApplications();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    acceptContactProposal: async (id: number) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await acceptContactApplication(id);
        if (data) {
          useApplicationsStore.getState().getContactApplications();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    acceptOrganizationProposal: async (id: number) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await acceptOrganizationApplication(id);
        if (data) {
          useApplicationsStore.getState().getOrganizationApplications();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    declineContactProposal: async (id: number) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await declineContactApplication(id);
        if (data) {
          useApplicationsStore.getState().getContactApplications();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    declineOrganizationProposal: async (id: number) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await declineOrganizationApplication(id);
        if (data) {
          useApplicationsStore.getState().getOrganizationApplications();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    setFiltration: ({ where, user_agreement, user_agreement_contact }) =>
      set((state) => {
        state.filtration.where.approval = where.approval;
        state.filtration.user_agreement = user_agreement;
        state.filtration.user_agreement_contact = user_agreement_contact;
      }),
    setCurrentPage: (currentPage) =>
      set((state) => {
        state.currentPage = currentPage;
      }),
    setPageSize: (pageSize) =>
      set((state) => {
        state.pageSize = pageSize;
      }),
  }))
);
