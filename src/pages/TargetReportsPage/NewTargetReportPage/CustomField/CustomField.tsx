import React, { FC, memo, useState } from 'react';
import { CheckboxCustom, CheckboxRound, Icon, InputForm } from 'ui-kit';
import { NewTargetReportField } from 'store/useNewTargetReportStore';
import './CustomField.scss';

interface ICustomFieldItem {
  field: NewTargetReportField;
  removeField: (id: string) => void;
}

export const CustomField: FC<ICustomFieldItem> = memo((props) => {
  const {
    field: { id, type },
    removeField,
  } = props;
  const [title, setTitle] = useState<string>('');

  return (
    <div className='CustomField'>
      <div className='RowItem'>
        {type === 'checkbox' && (
          <CheckboxCustom
            className='CustomCheckbox'
            isChecked={false}
            onChange={() => {}}
          />
        )}
        {type === 'radio' && (
          <CheckboxRound
            className='CustomCheckboxRound'
            isChecked={false}
            onChange={() => {}}
          />
        )}
        <InputForm
          className='CustomInput'
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder='Укажите название поля'
        />
      </div>

      <div className='RowItem'>
        <Icon
          className='CustomIcon'
          type={'VisitsDeleteTableData'}
          onClick={() => removeField(id)}
        />
      </div>
    </div>
  );
});
