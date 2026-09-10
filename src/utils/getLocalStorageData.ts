export type GetLocalStorageData =
  | 'contacts'
  | 'events'
  | 'organizations'
  | 'targets';

export const getLocalStorageData = (key: string, type: GetLocalStorageData) => {
  return [];
};
