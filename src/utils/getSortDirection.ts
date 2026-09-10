import { OrderByType } from 'api/contactApi';

export const getSortDirection = (orderBy: OrderByType) => {
  if (orderBy === 'asc') {
    return 'desc';
  } else return 'asc';
};
