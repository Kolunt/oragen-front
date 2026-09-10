import dayjs from 'dayjs';

export const howMuchTimeHasPassed = (date: Date | undefined) => {
  const nowYear = +dayjs(new Date()).format('YYYY');
  const thenYear = +dayjs(date).format('YYYY');
  const nowMonth = +dayjs(new Date()).format('MM');
  const thenMonth = +dayjs(date).format('MM');
  const nowDay = +dayjs(new Date()).format('DD');
  const thenDay = +dayjs(date).format('DD');
  const nowHours = +dayjs(new Date()).format('HH');
  const thenHours = +dayjs(date).format('HH');

  if (nowYear > thenYear) return `более ${nowYear - thenYear} лет`;
  if (nowMonth > thenMonth) return `более ${nowMonth - thenMonth} месяцев`;
  if (nowDay > thenDay) return `более ${nowDay - thenDay} дней`;
  if (nowHours > thenHours) return `более ${nowHours - thenHours} часов`;
};
