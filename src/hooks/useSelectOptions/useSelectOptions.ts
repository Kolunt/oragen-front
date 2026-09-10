import { useMemo, useState } from 'react';
import { ISelectOption } from 'ui-kit';

export const useSelectOptions = <T>(
  array: T[],
  property: keyof T,
  property2: keyof T
) => {
  const [selectOptions, setSelectOptions] = useState<ISelectOption[]>([]);

  useMemo(() => {
    const options: ISelectOption[] = [];
    array.forEach((item) => {
      options.push({
        value: `${item[property]}`,
        label: `${item[property2]}`,
      });
    });
    setSelectOptions(options);
  }, [array]);

  return selectOptions;
};
