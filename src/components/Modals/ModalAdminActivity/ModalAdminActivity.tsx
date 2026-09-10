import React, { useEffect, useMemo, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useModalsStore } from 'store/useModalsStore';
import {
  Button,
  DatePickerTiming,
  DatePickerSearchPanel,
  ISelectOption,
  Modal,
  SelectForm,
} from 'ui-kit';
import './ModalAdminActivity.scss';
import {
  CalendarType,
  useCalendarStore,
} from 'pages/CalendarPage/useCalendarStore';
import { v1 } from 'uuid';
import dayjs from 'dayjs';
import { AdminActivityTypes, DateFormats } from 'enums';

const typesAdminActivity: ISelectOption[] = [
  { value: AdminActivityTypes.HOLIDAY, label: 'Отпуск' },
  { value: AdminActivityTypes.HOSPITAL, label: 'Больничный' },
  { value: AdminActivityTypes.TRAINING, label: 'Тренинг' },
];

export const ModalAdminActivity = () => {
  const isShowModal = useModalsStore((state) => state.isAdminActivity);
  const changeShowModal = useModalsStore((state) => state.handleAdminActivity);
  const addCalendar = useCalendarStore((state) => state.addMarkedDate);
  const [typeSelect, setTypeSelect] = useState<
    SingleValue<ISelectOption> | MultiValue<ISelectOption>
  >();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const checkDurationTraining = useMemo(() => {
    return (
      //@ts-ignore
      typeSelect?.value === AdminActivityTypes.TRAINING &&
      dayjs(startDate).format(DateFormats.DATE_FORMAT_FOR_COMPARE) ===
        dayjs(endDate).format(DateFormats.DATE_FORMAT_FOR_COMPARE)
    );
    //@ts-ignore
  }, [startDate, endDate, typeSelect?.value]);

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  const handleAddCalendar = () => {
    const id = v1();
    if (typeSelect) {
      //@ts-ignore
      const type = typeSelect.value;

      addCalendar({
        id,
        startDate: startDate || new Date(),
        endDate: endDate || new Date(),
        type: type as CalendarType,
      });

      setTypeSelect(null);
      setStartDate(new Date());
      setEndDate(new Date());
      changeShowModal(false);
    }
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAdminActivity'>
        <h3 className='ModalAdminActivity__Header'>
          Административная активность
        </h3>

        <div className='ModalAdminActivity__Form'>
          <SelectForm
            value={typeSelect}
            onChange={setTypeSelect}
            options={typesAdminActivity}
            placeholder='Административная активность'
            label='Тип'
          />
          {checkDurationTraining ? (
            <>
              <DatePickerSearchPanel
                label='Дата начала'
                value={startDate}
                changeValue={setStartDate}
              />
              <DatePickerSearchPanel
                label='Дата окончания'
                value={endDate}
                changeValue={setEndDate}
              />
            </>
          ) : (
            <>
              <DatePickerTiming
                label='Дата начала'
                value={startDate}
                changeValue={setStartDate}
              />
              <DatePickerTiming
                label='Дата окончания'
                value={endDate}
                changeValue={setEndDate}
                minDate={startDate}
              />
            </>
          )}
        </div>

        <div className='ModalAdminActivity__ButtonGroup'>
          <Button
            className='ButtonCancel'
            onClick={() => changeShowModal(false)}
          >
            Отмена
          </Button>
          <Button className='ButtonCreate' onClick={handleAddCalendar}>
            Выбрать
          </Button>
        </div>
      </div>
    </Modal>
  );
};
