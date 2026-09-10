import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  fetchCreatePoll,
  ICreatePollPayload,
  IReportQuestion,
  ReportQuestionType,
} from 'api/pollsApi';
import { v1 } from 'uuid';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

export interface ICreateReportPayload {
  question: string;
  type: NewTargetCustomFieldType;
  variants: string[];
  advice: string;
  answer: string[];
}

// export type NewTargetCustomFieldType = 'checkbox' | 'radio' | 'file' | 'custom';
export type NewTargetCustomFieldType =
  | 'field'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'percent';

export interface NewTargetReportField {
  id: string;
  type: NewTargetCustomFieldType;
  title: string;
  isSelected: boolean;
}

export interface INewTargetReportSection {
  /*  id: string;
  type: NewTargetCustomFieldType;
  title: string;
  fields: NewTargetReportField[];*/
  id: string;
  question: string;
  type: NewTargetCustomFieldType;
  variants: string[];
  advice: string;
  answer: string[];
  fields: NewTargetReportField[];
}

export interface INewReportQuestion extends IReportQuestion {
  id: string;
}

interface INewTargetReportStore {
  newTargetReport: INewReportQuestion[];
  title: string;
  changeTitle: (value: string) => void;
  addSection: (type: ReportQuestionType) => void;
  changeSectionTitle: (id: string, value: string) => void;
  changeSectionAnswer: (id: string, value: string[]) => void;
  setReady: (id: string, value: boolean) => void;
  addField: (id: string, value: string) => void;
  removeSection: (id: string) => void;
  removeField: (id: string, title: string) => void;
  createReport: () => void;
  reset: () => void;
  resetSectionCustomField: (id: string) => void;
}

export const useNewTargetReportStore = create<INewTargetReportStore>()(
  immer((set, get) => ({
    newTargetReport: [],
    title: '',
    changeTitle: (value) => set({ title: value }),
    addSection: (type) => {
      const newSection = {
        id: v1(),
        advice: '',
        answer: [],
        question: '',
        type,
        variants: [],
      };
      set({ newTargetReport: [...get().newTargetReport, newSection] });
    },
    changeSectionTitle: (id, value) =>
      set({
        newTargetReport: [
          ...get().newTargetReport.map((section) =>
            section.id === id ? { ...section, question: value } : section
          ),
        ],
      }),
    changeSectionAnswer: (id, value) =>
      set({
        newTargetReport: [
          ...get().newTargetReport.map((section) =>
            section.id === id ? { ...section, variants: value } : section
          ),
        ],
      }),
    // это надо?
    setReady: (id, value) =>
      set({
        newTargetReport: [
          ...get().newTargetReport.map((section) =>
            section.id === id ? { ...section } : section
          ),
        ],
      }),
    resetSectionCustomField: (id) =>
      set({
        newTargetReport: [
          ...get().newTargetReport.map((section) =>
            section.id === id ? { ...section, question: '' } : section
          ),
        ],
      }),
    addField: (id, value) => {
      set({
        newTargetReport: get().newTargetReport.map((section) =>
          section.id === id
            ? { ...section, variants: [...section.variants, value] }
            : section
        ),
      });
    },
    removeSection: (id) => {
      set({
        newTargetReport: get().newTargetReport.filter((item) => item.id !== id),
      });
    },
    removeField: (id, title) => {
      set({
        newTargetReport: get().newTargetReport.map((section) =>
          section.id === id
            ? {
                ...section,
                variants: section.variants.filter((item) => item !== title),
              }
            : section
        ),
      });
    },
    // todo этот код больше не используется
    createReport: async () => {
      const filteredQuestions = get().newTargetReport.map((item) => {
        let { id, ...rest } = item;
        return rest;
      });
      const payload: ICreatePollPayload = {
        name: get().title,
        questions: filteredQuestions,
      };
      try {
        const { data } = await fetchCreatePoll(payload);
        if (data.success) {
          get().reset();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    reset: () => set({ newTargetReport: [], title: '' }),
  }))
);
