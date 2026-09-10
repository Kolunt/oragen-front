import React, { FC } from 'react';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';
import './DatePickerSearchPanel.scss';
import classNames from 'classnames';

registerLocale('ru', ru);

interface IDatePickerSearchPanel {
  className?: string;
  label?: string;
  value: Date | null;
  changeValue: (newDate: Date | null) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  selectsRange?: boolean;
  minDate?: Date | null;
  error?: string | boolean;
}

export const DatePickerSearchPanel: FC<IDatePickerSearchPanel> = (props) => {
  const {
    value,
    changeValue,
    startDate,
    endDate,
    className,
    label,
    selectsRange,
    minDate,
    error,
  } = props;

  const dateStart =
    minDate === null ? null : dayjs(new Date()).subtract(0, 'day').toDate();

  return (
    <div
      className={classNames('DatePickerSearchPanel', className, {
        DatePickerTiming__Error: error,
      })}
    >
      {label && <label className='DatePickerSearchPanel__Label'>{label}</label>}
      <DatePicker
        wrapperClassName={classNames('date-picker', className)}
        selected={value}
        //@ts-ignore
        onChange={(date) => changeValue(date)}
        startDate={startDate}
        endDate={endDate}
        placeholderText='Не выбрано'
        dateFormat='dd MMMM yyyy'
        locale='ru'
        // filterTime={filterPassedTime}
        minDate={dateStart}
        selectsRange={selectsRange}
      />
      {error && <span className='TextError'>{error}</span>}
    </div>
  );
};
