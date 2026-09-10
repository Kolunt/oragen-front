import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { InputForm } from '../../../../../ui-kit';
import { DefaultInputPropsType } from 'ui-kit/InputForm/InputForm';

type IInputFormWithValidation = DefaultInputPropsType & {
  value: string | undefined;
  label?: string;
};

export const InputFormWithValidation: FC<IInputFormWithValidation> = (
  props
) => {
  const { value, label, ...other } = props;
  const [inputEmpty, setInputEmpty] = useState(false);

  const onBlur = useCallback(() => {
    if (value && value.length > 0) {
      setInputEmpty(false);
    } else {
      setInputEmpty(true);
    }
  }, [value]);

  const onFocus = useCallback(() => {
    setInputEmpty(false);
  }, [value]);
  return (
    <InputForm
      onBlur={onBlur}
      onFocus={onFocus}
      error={inputEmpty ? 'Это поле должно быть заполнено' : ''}
      label={label}
      {...other}
    />
  );
};
