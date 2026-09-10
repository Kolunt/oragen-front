import React, { FC } from 'react';
import { Input } from 'antd';

interface NumericInputProps {
  style?: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

export const NumericInput: FC<NumericInputProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^\d+$/;
    if (reg.test(inputValue) || inputValue === '') {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  return (
    <div style={{ width: '100%' }}>
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Input a number'
        maxLength={16}
        allowClear={true}
      />
    </div>
  );
};
