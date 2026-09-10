import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { s3, S3_BUCKET } from 'pages/MediaPage/useMediaStore';

interface IMediaInfoStore {
  titleKey: string;
  files: string[];
  monitoredMediaFile: string;
  monitoredFileUrl: string;
  getFiles: () => void;
  setTitleKey: (name: string) => void;
  // createFolder:(name:string) => void
  removeMediaFile: (key: string) => void;
  setMonitoredMediaFile: (key: string) => void;
  getFileUrl: (key: string) => void;
}

export const useMediaInfoStore = create<IMediaInfoStore>()(
  persist(
    immer((set, get) => ({
      titleKey: '',
      files: [],
      monitoredMediaFile: '',
      monitoredFileUrl: '',
      setTitleKey: (name) => set({ titleKey: name }),
      getFiles: () => {
        const params = {
          Bucket: S3_BUCKET,
          Prefix: get().titleKey,
        };
        s3.listObjectsV2(params, function (err, data) {
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
      setMonitoredMediaFile: (key) => set({ monitoredMediaFile: key }),
      removeMediaFile: async (key) => {
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
        };
        await s3.deleteObject(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            get().getFiles();
          }
        });
      },
      getFileUrl: async (key: string) => {
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
        };
        const url = await s3.getSignedUrl('getObject', params);
        set({ monitoredFileUrl: url });
      },
    })),
    {
      name: 'media-info',
      partialize: (state) => ({
        titleKey: state.titleKey,
      }),
    }
  )
);
