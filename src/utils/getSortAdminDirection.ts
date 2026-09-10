import { DrugOrderByType } from 'api/drugsApi';

export const getSortAdminDirection = (orderBy: DrugOrderByType) => {
  if (orderBy === 'orderBy') {
    return 'orderByDesc';
  } else return 'orderBy';
};
