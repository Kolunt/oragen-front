import React, { FC } from 'react';
import { IReportQuestion } from 'api/pollsApi';
import { CheckboxCustom, InputForm } from 'ui-kit';
import { v1 } from 'uuid';
import { ReportModeType } from 'components/Report/Report';
import { useReportStore } from 'components/Report/useReportStore';
import 'components/Report/sections/SectionCheckBox/SectionCheckBox.scss';

interface ISectionCheckBox {
  data: IReportQuestion;
  id: number;
  mode: ReportModeType;
}

export const SectionCheckBox: FC<ISectionCheckBox> = (props) => {
  const { data, id, mode } = props;
  const setAnswer = useReportStore((state) => state.setAnswerCheckBox);

  const onChangeCheckBox = (title: string) => {
    if (mode === 'edit') {
      setAnswer(id, title);
    }
  };

  return (
    <div className='SectionCheckBox'>
      <InputForm
        className='CustomInput'
        value={data.question}
        onChange={() => {}}
        label='Вопрос'
      />
      {data.variants.map((item, index) => (
        <div key={v1()} className='mb-10 flex items-center gap-x-20'>
          <div onClick={() => onChangeCheckBox(item)}>
            <CheckboxCustom
              className='CustomCheckbox'
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
