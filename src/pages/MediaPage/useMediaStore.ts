import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import AWS from 'aws-sdk';
import { useModalsStore } from 'store/useModalsStore';

export const S3_BUCKET = 'oragen-dev';
export const REGION = 'ru-central1';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

export const s3 = new AWS.S3({
  endpoint: 'https://storage.yandexcloud.net',
  region: REGION,
});

interface IMediaStore {
  folders: string[];
  monitoredFolder: string;
  getFolders: () => void;
  createFolder: (name: string) => void;
  removeFolder: () => void;
  setMonitoredFolder: (key: string) => void;
}

export const useMediaStore = create<IMediaStore>()(
  immer((set, get) => ({
    folders: [],
    monitoredFolder: '',
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
    createFolder: async (name) => {
      const params = {
        Bucket: S3_BUCKET,
        Key: `${name}/`,
      };
      await s3.putObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          get().getFolders();
        }
      });
    },
    removeFolder: async () => {
      const paramsGetObjects = {
        Bucket: S3_BUCKET,
        Prefix: get().monitoredFolder,
      };
      await s3.listObjectsV2(paramsGetObjects, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          const contents = data.Contents;
          const keys = contents?.every((item) => item)
            ? contents?.map((item) => ({ Key: `${item.Key}` }))
            : [];

          const params = {
            Bucket: S3_BUCKET,
            Delete: {
              Objects: keys,
              Quiet: false,
            },
          };
          s3.deleteObjects(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
              get().getFolders();
              useModalsStore.getState().handleRemoveFolder(false);
            }
          });
        }
      });
    },
    setMonitoredFolder: (key) => set({ monitoredFolder: key }),
  }))
);
