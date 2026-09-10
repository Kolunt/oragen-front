import React, { FC } from 'react';
import { IReportQuestion } from 'api/pollsApi';
import { CheckboxRound, InputForm } from 'ui-kit';
import { v1 } from 'uuid';
import { ReportModeType } from 'components/Report/Report';
import { useReportStore } from 'components/Report/useReportStore';
import 'components/Report/sections/SectionRadio/SectionRadio.scss';

interface ISectionRadio {
  data: IReportQuestion;
  id: number;
  mode: ReportModeType;
}

export const SectionRadio: FC<ISectionRadio> = (props) => {
  const { data, id, mode } = props;
  const setAnswerRadio = useReportStore((state) => state.setAnswerRadio);

  const onChangeRadio = (title: string) => {
    if (mode === 'edit') {
      setAnswerRadio(id, title);
    }
  };

  return (
    <div className='SectionRadio'>
      <InputForm
        className='CustomInput'
        value={data.question}
        onChange={() => {}}
        label='Вопрос'
      />
      {data.variants.map((item) => (
        <div key={v1()} className='mb-10 flex items-center gap-x-20'>
          <div onClick={() => onChangeRadio(item)}>
            <CheckboxRound
              className='CustomCheckboxRound'
              isChecked={data.answer.includes(item)}
              onChange={() => {}}
            />
          </div>
          <InputForm className='w-full' value={item} onChange={() => {}} />
        </div>
      ))}
    </div>
  );
};
