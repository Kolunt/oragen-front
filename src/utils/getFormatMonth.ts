import dayjs from 'dayjs';

import { months } from './getFormatDate';

export const getFormatMonth = (date: Date) => {
  const day = dayjs(date).format('D');
  const month = +dayjs(date).format('MM') - 1;

  return `${day} ${months[month]}`;
};
