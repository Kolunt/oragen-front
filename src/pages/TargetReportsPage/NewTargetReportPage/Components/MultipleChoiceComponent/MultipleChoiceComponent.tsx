import React, { FC, useCallback, useState } from 'react';
import { Icon } from 'ui-kit';
import './styles.scss';
import classNames from 'classnames';
import styled from 'styled-components';
import { Input } from '../Input/Input';

interface IMultipleChoiceComponent {
  className?: string;
  iconRadio?: boolean;
  label?: string;
  onDelete: (id: string | number) => void;
  onAdd: () => void;
  onInput: (value: string, id: string | number) => void;
  id: string | number;
  showBtnDelete?: boolean;
  showBtnAdd?: boolean;
}

export const MultipleChoiceComponent: FC<IMultipleChoiceComponent> = (
  props
) => {
  const {
    className,
    iconRadio,
    label,
    onDelete,
    onAdd,
    onInput,
    id,
    showBtnDelete,
    showBtnAdd,
    ...other
  } = props;
  const [inputEmpty, setInputEmpty] = useState(false);
  const onBlur = useCallback(() => {
    if (label && label?.length > 0) {
      setInputEmpty(false);
    } else {
      setInputEmpty(true);
    }
  }, [label]);

  const onFocus = useCallback(() => {
    setInputEmpty(false);
  }, [label]);
  return (
    <div className={classNames('flex items-center', className)}>
      <div className={`icon mr-20 ${iconRadio ? 'radio' : ''}`}></div>
      <div className='w-full'>
        <Input
          sectionId={id}
          value={label}
          className={inputEmpty ? 'error relative' : ''}
          onInputComponent={onInput}
          placeholder='Введите данные'
          onBlur={onBlur}
          onFocus={onFocus}
          {...other}
        />
        {inputEmpty && (
          <div className='color-negative fz-12 absolute'>
            Это поле должно быть заполнено
          </div>
        )}
      </div>
      <div className='flex icon-list ml-10'>
        {!showBtnDelete && (
          <Icon
            className={'pointer'}
            type={'VisitsDeleteTableData'}
            onClick={() => onDelete(id)}
          />
        )}
        {showBtnAdd && (
          <Icon className={'pointer'} type='TasksAddSquare' onClick={onAdd} />
        )}
      </div>
    </div>
  );
};
