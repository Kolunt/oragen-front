import React, { useState } from 'react';

import { Button, Modal } from 'ui-kit';
import './ModalAddDoubleVisit.scss';

/* const employeeSelection: ISelectOption[] = [
  { value: '1', label: 'Адамов Роман Станиславович' },
  { value: '2', label: 'Билялетдинов Динияр Ринатович' },
  { value: '3', label: 'Васин Виктор Владимирович' },
  { value: '4', label: 'Габулов Владимир Борисович' },
  { value: '5', label: 'Джикия Георгий Тамазович' },
];

const contactSelection: ISelectOption[] = [
  { value: '1', label: 'Енин Артём Валерьевич' },
  { value: '2', label: 'Игнашевич Сергей Николаевич' },
  { value: '3', label: 'Кокорин Александр Александрович' },
  { value: '4', label: 'Мамаев Павел Константинович' },
  { value: '5', label: 'Олеников Николай Владимирович' },
];

const typesVisit: ISelectOption[] = [
  { value: 'remoteVisit', label: 'Дистанционный визит' },
  { value: 'doctorVisit', label: 'Визит к врачу' },
  { value: 'pharmacyVisit', label: 'Визит в аптеку' },
]; */

export const ModalAddDoubleVisit = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Modal visibility={isShow} changeVisibility={setIsShow}>
      <div className='ModalDoubleVisit'>
        <h3 className='ModalDoubleVisit__Header'>Двойной визит к врачу</h3>

        {/* <div className='ModalDoubleVisit__Form'> */}
        {/*  <SelectForm */}
        {/*    className='Select' */}
        {/*    options={employees} */}
        {/*    label={'Выбор сотрудника'} */}
        {/*  /> */}
        {/*  <SelectForm */}
        {/*    className='Select' */}
        {/*    options={employees} */}
        {/*    label={'Выбор контакта'} */}
        {/*  /> */}
        {/*  <DatePickerTiming /> */}
        {/*  <Uploader className='Uploader' /> */}
        {/*  <InputForm placeholder='Введите текст' label='Комментарии' /> */}
        {/* </div> */}

        <div className='ModalDoubleVisit__ButtonGroup'>
          <Button className='ButtonCancel'>Отмена</Button>
          <Button className='ButtonCreate'>Создать</Button>
        </div>
      </div>
    </Modal>
  );
};
