import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

export const disabledDateRangePicker: RangePickerProps['disabledDate'] = (
  current
) => {
  return current && current < dayjs().endOf('hour');
};
