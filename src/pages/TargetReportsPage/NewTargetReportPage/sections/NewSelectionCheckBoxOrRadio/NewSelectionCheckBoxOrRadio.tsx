import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  INewReportQuestion,
  useNewTargetReportStore,
} from 'store/useNewTargetReportStore';
import { v1 } from 'uuid';
import classNames from 'classnames';
import { Icon } from 'ui-kit';
import { MultipleChoiceGroup } from '../../Components/MultipleChoiceGroup/MultipleChoiceGroup';
import './styles.scss';
import { InputFormWithValidation } from '../../Components/InputFormWithValidation/InputFormWithValidation';

interface INewSectionCheckBoxOrRadio {
  data: INewReportQuestion;
  isRadio?: boolean;
}

export const NewSelectionCheckBoxOrRadio: FC<INewSectionCheckBoxOrRadio> = (
  props
) => {
  const { data, isRadio } = props;
  const changeSectionTitle = useNewTargetReportStore(
    (state) => state.changeSectionTitle
  );
  const changeSectionAnswer = useNewTargetReportStore(
    (state) => state.changeSectionAnswer
  );
  const removeSection = useNewTargetReportStore((state) => state.removeSection);
  const reset = useNewTargetReportStore(
    (state) => state.resetSectionCustomField
  );
  const [options, setOptions] = useState([
    { label: '', id: v1() },
    { label: '', id: v1() },
  ]);

  const onRemove = () => {
    removeSection(data.id);
  };

  const onDelete = useCallback(
    (id: string | number) => {
      setOptions(options.filter((item) => item.id !== id));
    },
    [options]
  );

  const onAdd = useCallback(() => {
    setOptions((val) => {
      return [
        ...val,
        {
          label: '',
          id: v1(),
        },
      ];
    });
  }, [options]);

  const onInput = useCallback(
    (value: string, id: string | number) => {
      setOptions(
        options.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              label: value,
            };
          } else {
            return item;
          }
        })
      );
    },
    [options]
  );

  useEffect(() => {
    changeSectionAnswer(
      data.id,
      options.map(({ label }) => label)
    );
  }, [options]);

  return (
    <div className={classNames('NewSection')}>
      <div className='flex justify-space-between'>
        <InputFormWithValidation
          className='CustomInput'
          value={data?.question}
          onChange={(e) => changeSectionTitle(data.id, e.currentTarget.value)}
          label='Вопрос'
          placeholder='Введите название'
        />
        <Icon
          className='pointer ml-10'
          type={'VisitsDeleteTableData'}
          onClick={onRemove}
        />
      </div>
      <MultipleChoiceGroup
        options={options}
        onDelete={onDelete}
        onAdd={onAdd}
        onInput={onInput}
        iconRadio={isRadio}
      />
    </div>
  );
};
