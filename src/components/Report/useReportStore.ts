import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  fetchUpdatePoll,
  fillOutReport,
  IFillOutReportPayload,
  IReportQuestion,
} from 'api/pollsApi';
import { IVisitReport } from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface IReportStore {
  questions: IReportQuestion[];
  editMode: boolean;
  monitoredReport: null | IVisitReport;
  loyalty: number;
  potential: number;
  setQuestions: (data: IReportQuestion[]) => void;
  setAnswerCheckBox: (indexSection: number, title: string) => void;
  setAnswerCustomField: (indexSection: number, title: string) => void;
  setAnswerRadio: (indexSection: number, title: string) => void;
  setMonitoredReport: (value: null | IVisitReport) => void;
  updateReport: (id: number) => void;
  setEditMode: (value: boolean) => void;
  fillOutReport: (id: number) => void;
  setLoyalty: (value: number) => void;
  setPotential: (value: number) => void;
}

export const useReportStore = create<IReportStore>()(
  immer((set, get) => ({
    questions: [],
    editMode: false,
    monitoredReport: null,
    loyalty: 0,
    potential: 0,
    setQuestions: (data) =>
      set({
        questions: data,
      }),
    setMonitoredReport: (value) => set({ monitoredReport: value }),
    setAnswerCustomField: (index, title) => {
      set({
        questions: get().questions.map((section, i) =>
          i === index ? { ...section, answer: [title] } : section
        ),
      });
    },
    setAnswerRadio: (index, title) => {
      set({
        questions: get().questions.map((section, i) =>
          i === index ? { ...section, answer: [title] } : section
        ),
      });
    },
    setAnswerCheckBox: (indexSection, title) => {
      set({
        questions: get().questions.map((section, i) =>
          i === indexSection
            ? {
                ...section,
                answer: section.answer.includes(title)
                  ? section.answer.filter((item) => item !== title)
                  : [...section.answer, title],
              }
            : section
        ),
      });
    },
    updateReport: async (id) => {
      useAuthStore.getState().setLoading(true);

      const payload = {
        name: get().monitoredReport !== null ? get().monitoredReport?.name : '',
        status: 'new',
        questions: get().questions,
      };

      try {
        await fetchUpdatePoll(id, payload);
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    fillOutReport: async (id) => {
      useAuthStore.getState().setLoading(true);

      const payload: IFillOutReportPayload = {
        id,
        questions: JSON.stringify(get().questions),
        loyality: get().loyalty,
        potential: get().potential,
      };

      try {
        await fillOutReport(payload);
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    setEditMode: (value) => set({ editMode: value }),
    setLoyalty: (value) => set({ loyalty: value }),
    setPotential: (value) => set({ potential: value }),
  }))
);
