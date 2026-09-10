import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import classNames from 'classnames';
import './AddressInputControl.scss';
import { Controller } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';

const tokenKey = process.env.REACT_APP_DADATA_API_KEY;

export const AddressInputControl = ({ control, errors, className }: any) => {
  return (
    <div
      className={classNames('AddressInputControl', className, {
        AddressInputControl__Error: errors.address,
      })}
    >
      <label className='AddressInputControl__Label'>Адрес</label>
      <Controller
        control={control}
        name='address'
        rules={fullNameValidation}
        render={({ field }) => (
          <AddressSuggestions
            token={tokenKey as string}
            value={field.value}
            onChange={(e) => field.onChange(e)}
            selectOnBlur={true}
            minChars={2}
            delay={500}
            count={8}
            // httpCache={true}
          />
        )}
      />
      {errors.address && (
        <span className='AddressInputControl__TextError'>
          {errors.address.message}
        </span>
      )}
    </div>
  );
};
