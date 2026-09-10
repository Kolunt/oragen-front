import React from 'react';

import './CalendarHeader.scss';
import { ISelectOption, SelectForm } from 'ui-kit';

const typesAdminActiv: ISelectOption[] = [
  { value: 'holiday', label: 'Отпуск' },
  { value: 'hospital', label: 'Больничный' },
  { value: 'training', label: 'Тренинг' },
];

export const CalendarHeader = () => {
  // const [typeSelect, setTypeSelect] = useState<ISelectOption>();

  return (
    <div className='CalendarHeader'>
      {/* <div className={'CalendarHeader__LeftBlock'}> */}
      {/*  <h3 className={'CalendarHeader__LeftBlock_title'}>Февраль 2023</h3> */}
      {/*  <SelectForm */}
      {/*    options={months} */}
      {/*    placeholder={'месяц'} */}
      {/*    value={month} */}
      {/*    // @ts-ignore */}
      {/*    onChange={(value) => setMonth(value)} */}
      {/*    className={'CalendarHeader__LeftBlock_select'} */}
      {/*  /> */}
      {/* </div> */}

      <div className='CalendarHeader__RightBlock'>
        {/* <SearchForm className={'CalendarHeader__RightBlock_search'} /> */}
        {/* <Button className={'CalendarHeader__RightBlock_button'}> */}
        {/* <label>Добавить событие</label> */}
        {/* <img src={plus} alt='plus-icon' /> */}
        {/* Административная активность */}
        {/* </Button> */}

        <SelectForm
          options={typesAdminActiv}
          placeholder='Административная активность'
        />
      </div>
    </div>
  );
};
