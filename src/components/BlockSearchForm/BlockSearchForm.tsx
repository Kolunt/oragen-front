import React, { FC } from 'react';
import { Button, Icon, ISelectOption, SearchForm, SelectForm } from 'ui-kit';
import { MultiValue, SingleValue } from 'react-select';
import './style.scss';

export type isSelectForm = false | true;

interface ISearchForm {
  onHandleResetParams: () => void;
  onChangeSelectForm?: () => void;
  onChangeSearch: (value: string) => void;
  label?: string;
  options?: ISelectOption[];
  value?: SingleValue<ISelectOption> | MultiValue<ISelectOption>;
  filtration?: string;
  children?: React.ReactNode;
  isSelectForm?: isSelectForm;
}

export const BlockSearchForm: FC<ISearchForm> = (props) => {
  const {
    filtration,
    isSelectForm = false,
    children,
    options = [],
    onHandleResetParams,
    label,
    onChangeSelectForm,
    value,
    onChangeSearch,
  } = props;
  return (
    <div className='block-search-form'>
      <div className='Form ml-40'>
        <SearchForm
          className=''
          value={filtration}
          onChangeText={onChangeSearch}
        />
        {isSelectForm && (
          <SelectForm
            className='SelectStyle'
            value={value}
            onChange={onChangeSelectForm}
            options={options}
            label={label}
          />
        )}
        <Button className='btn max ButtonReset' onClick={onHandleResetParams}>
          Сброс параметров
        </Button>
        <div className='IconResetWrapper' onClick={onHandleResetParams}>
          <Icon type={'Reset'} />
        </div>
      </div>
      <div className='flex justify-center'>{children}</div>
    </div>
  );
};
