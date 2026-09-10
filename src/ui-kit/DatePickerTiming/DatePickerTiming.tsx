import React, { FC } from 'react';

import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import './DatePickerTiming.scss';
import classNames from 'classnames';

registerLocale('ru', ru);

interface IDatePickerForm {
  label?: string;
  value: Date | null;
  changeValue: (newDate: Date | null) => void;
  minDate?: Date | null;
  timeIntervals?: number;
  className?: string;
  disabled?: boolean;
  onCalendarClose?: () => void;
  error?: string | boolean;
}

export const DatePickerTiming: FC<IDatePickerForm> = (props) => {
  const {
    value,
    label,
    changeValue,
    minDate,
    timeIntervals,
    className,
    disabled,
    onCalendarClose,
    error,
  } = props;
  /*  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const current = currentDate.getTime();
    const selectedDate = new Date(time);
    const select = selectedDate.getTime();

    return current < select;
  }; */

  const minTime = value
    ? dayjs(new Date(value).setHours(7, 0, 0)).toDate()
    : new Date();
  const maxTime = value
    ? dayjs(new Date(value).setHours(21, 0, 0)).toDate()
    : new Date();

  return (
    <div
      className={classNames('DatePickerTiming', className, {
        DatePickerTiming__Error: error,
      })}
    >
      {label && <label className='DatePickerTiming__Label'>{label}</label>}
      <DatePicker
        wrapperClassName={classNames('date-picker', className)}
        selected={value}
        onChange={(date) => changeValue(date)}
        placeholderText='Не выбрано'
        dateFormat='dd.MM.yyyy   p'
        locale='ru'
        showTimeSelect
        timeCaption='время'
        timeFormat='p'
        timeIntervals={timeIntervals || 15}
        // filterTime={filterPassedTime}
        minDate={minDate || dayjs(new Date()).subtract(0, 'day').toDate()}
        minTime={minTime}
        maxTime={maxTime}
        disabled={disabled}
      />
      {error && <span className='TextError'>{error}</span>}
    </div>
  );
};
