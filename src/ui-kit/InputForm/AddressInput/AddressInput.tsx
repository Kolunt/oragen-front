import React, { FC, useEffect, useState } from 'react';
import {
  AddressSuggestions,
  DaDataAddress,
  DaDataSuggestion,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import classNames from 'classnames';
import { useDaDataStore } from 'store/useDaDataStore';
import './AddreessInput.scss';

const tokenKey = process.env.REACT_APP_DADATA_API_KEY;

interface AddressInputProps {
  label?: string;
  className?: string;
  error?: string;
}

export const AddressInput: FC<AddressInputProps> = (props) => {
  const { label, className, error } = props;
  const setCurrentAddress = useDaDataStore((state) => state.setCurrentAddress);
  const [value, setValue] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();

  useEffect(() => {
    setCurrentAddress(value?.value || '');
  }, [value]);

  return (
    <div
      className={classNames('AddressInput', className, {
        AddressInput__Error: error,
      })}
    >
      {label && <label className='AddressInput__Label'>{label}</label>}
      <AddressSuggestions
        token={tokenKey as string}
        value={value}
        onChange={setValue}
        selectOnBlur={true}
        minChars={2}
        delay={500}
        count={8}
        // httpCache={true}
      />
      {error && <span className='AddressInput__TextError'>{error}</span>}
    </div>
  );
};
