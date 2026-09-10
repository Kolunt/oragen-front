import dayjs from 'dayjs';

export const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'майя',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const getFormatDate = (date: Date) => {
  const day = dayjs(date).format('D');
  const month = months[+dayjs(date).format('MM') - 1];
  const year = dayjs(date).format('YYYY');

  return `${day} ${month} ${year}`;
};
