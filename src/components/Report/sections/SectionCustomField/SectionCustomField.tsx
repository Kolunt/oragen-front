import React, { ChangeEvent, FC, memo, useState } from 'react';
import { IReportQuestion } from 'api/pollsApi';
import { InputForm } from 'ui-kit';
import { useReportStore } from 'components/Report/useReportStore';
import { ReportModeType } from 'components/Report/Report';
import 'components/Report/sections/SectionCustomField/SectionCustomField.scss';

interface ISectionCustomField {
  data: IReportQuestion;
  id: number;
  mode: ReportModeType;
}

export const SectionCustomField: FC<ISectionCustomField> = memo((props) => {
  const { data, id, mode } = props;
  const setAnswerCustomField = useReportStore(
    (state) => state.setAnswerCustomField
  );
  const [title, setTitle] = useState(data.answer[0]);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onSetAnswer = () => {
    if (mode === 'edit') {
      setAnswerCustomField(id, title);
    }
  };

  return (
    <div className='SectionCustomField'>
      <InputForm
        className='CustomInput'
        value={data.question}
        onChange={() => {}}
        label='Вопрос'
        placeholder='Введите название'
      />
      <InputForm
        value={title}
        onChange={onChangeTitle}
        onBlur={onSetAnswer}
        disabled={mode === 'view'}
      />
    </div>
  );
});
