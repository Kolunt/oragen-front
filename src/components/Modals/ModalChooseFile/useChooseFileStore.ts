import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { s3, S3_BUCKET } from 'pages';

interface IChooseFileStore {
  titleKey: string;
  folders: string[];
  files: string[];
  selectedFiles: string[];
  getFolders: () => void;
  getFiles: () => void;
  setTitleKey: (name: string) => void;
  addFile: (key: string) => void;
  addFiles: (keys: string[]) => void;
  removeFile: (key: string) => void;
  clearStore: () => void;
}

export const useChooseFileStore = create<IChooseFileStore>()(
  immer((set, get) => ({
    titleKey: '',
    folders: [],
    files: [],
    selectedFiles: [],
    setTitleKey: (name) => set({ titleKey: name }),
    getFolders: async () => {
      const params = {
        Bucket: S3_BUCKET,
        Delimiter: '.',
      };
      await s3.listObjectsV2(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          const contents = data.Contents;
          const newKeys = contents?.every((item) => item)
            ? contents?.filter((item) => item.Key).map((item) => item.Key)
            : [];
          set({ folders: newKeys as string[] });
        }
      });
    },
    getFiles: async () => {
      const params = {
        Bucket: S3_BUCKET,
        Prefix: get().titleKey,
      };
      await s3.listObjectsV2(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          const contents = data.Contents;
          const newKeys = contents?.every((item) => item)
            ? contents?.filter((item) => item.Key).map((item) => item.Key)
            : [];
          set({ files: newKeys as string[] });
        }
      });
    },
    addFile: (key) => set({ selectedFiles: [...get().selectedFiles, key] }),
    addFiles: (keys) =>
      set({ selectedFiles: [...get().selectedFiles, ...keys] }),
    removeFile: (key) =>
      set({
        selectedFiles: get().selectedFiles.filter((item) => item !== key),
      }),
    clearStore: () => set({ selectedFiles: [] }),
  }))
);
