import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IContactApplication } from 'store/useApplicationsStore';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  getContactProposalUnAuth,
  IUserAgreementPayload,
  setContactProposalUserAgreement,
} from 'api/applicationsApi';
import { useMessageStore } from 'components';

interface IAgreementStore {
  data?: IContactApplication;
  getAgreementData: (id: number) => void;
  sendAgreement: (payload: IUserAgreementPayload, redirect: () => void) => void;
}

export const useAgreementStore = create<IAgreementStore>()(
  immer((set) => ({
    getAgreementData: async (id) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await getContactProposalUnAuth(id);
        if (data) {
          set({ data: data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    sendAgreement: async (payload, redirect) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await setContactProposalUserAgreement(payload);
        if (data) {
          useMessageStore
            .getState()
            .showMessage('success', 'Согласие отправлено!');
          redirect();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
