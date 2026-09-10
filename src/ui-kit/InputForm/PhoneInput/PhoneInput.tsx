import React from 'react';

import { Controller } from 'react-hook-form';

import Flag from 'assets/img/forms/FlagRussia.png';
import { phoneValidation } from 'validation/validation';
import { Avatar } from 'ui-kit/Avatar/Avatar';
import { InputForm } from 'ui-kit/InputForm/InputForm';
import './PhoneInput.scss';
import classNames from 'classnames';

export const PhoneInput = ({ control, errors, disabled, className }: any) => {
  const phoneFormat = (value: string) => {
    let content: string | string[] = value;

    if (!content) return;

    content = Array.from(content).filter(
      (ltr) => ltr.charCodeAt(0) > 47 && ltr.charCodeAt(0) < 58
    );

    const [
      countryCode,
      operatorCode,
      threeNumbers,
      firstTwoNumbers,
      secondTwoNumbers,
    ] = [
      (content[0] = '7'),
      content.slice(1, 4).join(''),
      content.slice(4, 7).join(''),
      content.slice(7, 9).join(''),
      content.slice(9, 11).join(''),
    ];

    // eslint-disable-next-line no-param-reassign
    value = countryCode.length ? `+${countryCode}` : '';
    // eslint-disable-next-line no-param-reassign
    if (operatorCode.length) value += `(${operatorCode}`;
    // eslint-disable-next-line no-param-reassign
    if (threeNumbers.length) value += `)${threeNumbers}`;
    // eslint-disable-next-line no-param-reassign
    if (firstTwoNumbers.length) value += `-${firstTwoNumbers}`;
    // eslint-disable-next-line no-param-reassign
    if (secondTwoNumbers.length) value += `-${secondTwoNumbers}`;

    return value;
  };

  return (
    <div className={classNames('PhoneInput', className)}>
      <Controller
        control={control}
        name='phone'
        rules={!disabled ? phoneValidation : { required: false }}
        render={({ field }) => (
          <InputForm
            value={phoneFormat(field.value)}
            onChange={(e) => field.onChange(e)}
            label='Номер телефона'
            error={errors.phone && errors.phone.message}
            maxLength={16}
            disabled={disabled}
          />
        )}
      />
      <Avatar className='PhoneInput__Image' image={Flag} />
    </div>
  );
};
