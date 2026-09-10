import React, { FC, FocusEventHandler, useRef } from 'react';
import classNames from 'classnames';
import {
  ActionMeta,
  default as ReactSelect,
  GroupBase,
  MenuPlacement,
  MultiValue,
  MultiValueRemoveProps,
  OnChangeValue,
  SingleValue,
  StylesConfig,
  components,
  DropdownIndicatorProps,
} from 'react-select';
import './SelectForm.scss';
import { Icon } from 'ui-kit/Icon/Icon';

export interface ISelectOption {
  value: string;
  label: string;
}

type IconTypeSelect = 'search';

export type isMultiType = false | true;

export type MultiValueRemoveType = React.ComponentType<
  MultiValueRemoveProps<any, isMultiType, GroupBase<any>>
>;

export interface ISelectFormProps {
  className?: string;
  label?: string;
  options: ISelectOption[];
  placeholder?: string;
  isMulti?: isMultiType;
  MultiValueRemove?: MultiValueRemoveType;
  styles?: StylesConfig<ISelectOption, isMultiType, GroupBase<ISelectOption>>;
  value?: SingleValue<ISelectOption> | MultiValue<ISelectOption>;
  defaultValue?: SingleValue<ISelectOption> | MultiValue<ISelectOption>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (
    value: OnChangeValue<ISelectOption, isMultiType>,
    action: ActionMeta<ISelectOption>
  ) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  isOptionDisabled?: boolean;
  menuIsOpen?: boolean;
  menuPlacement?: MenuPlacement;
  inputValue?: string;
  onInputChange?: (newValue: string) => void;
  error?: string;
  iconType?: IconTypeSelect;
  сlearable?: boolean;
}

export const SelectForm: FC<ISelectFormProps> = (props) => {
  const {
    options,
    label,
    placeholder,
    className,
    value,
    onBlur,
    onFocus,
    onChange,
    defaultValue,
    isMulti = false,
    MultiValueRemove,
    disabled,
    isOptionDisabled,
    inputValue,
    onInputChange,
    menuPlacement,
    error,
    iconType,
    сlearable,
  } = props;

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        {/*<EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />*/}
        <Icon type={'Search'} />
      </components.DropdownIndicator>
    );
  };

  return (
    <div
      className={classNames('SelectForm', className, {
        SelectForm__Error: error,
      })}
    >
      <label className='SelectForm__Label'>{label}</label>
      <ReactSelect
        isClearable={сlearable}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder || 'Не выбрано'}
        defaultValue={defaultValue && defaultValue}
        classNamePrefix='custom-select'
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        isDisabled={disabled}
        menuIsOpen={isOptionDisabled ? false : undefined}
        menuPlacement={menuPlacement}
        inputValue={inputValue}
        onInputChange={onInputChange}
        // isClearable={true}
        //@ts-ignore
        components={iconType ? { DropdownIndicator } : undefined}
        className='relative'
      />
      {error && <span className='TextError'>{error}</span>}
    </div>
  );
};
