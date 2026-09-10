import dayjs from 'dayjs';

export const getUtcDate = (date: Date) => {
  return dayjs(date).utc(true).toDate();
};
