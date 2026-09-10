import dayjs from 'dayjs';
import { DateFormats } from 'enums';

export const getLocalTime = (utcDate: string) => {
  let offsetDate = dayjs(utcDate).utcOffset();
  return dayjs(utcDate)
    .add(offsetDate, 'minutes')
    .format(DateFormats.FULL_DATE_FORMAT);
};
