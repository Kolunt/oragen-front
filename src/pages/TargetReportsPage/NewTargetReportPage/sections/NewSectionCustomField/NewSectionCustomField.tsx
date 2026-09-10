import React, { FC } from 'react';
import { Icon } from 'ui-kit';
import {
  INewReportQuestion,
  useNewTargetReportStore,
} from 'store/useNewTargetReportStore';
import '../NewSelectionCheckBoxOrRadio/styles.scss';
import classNames from 'classnames';
import { InputFormWithValidation } from '../../Components/InputFormWithValidation/InputFormWithValidation';

interface ISectionCustomField {
  data: INewReportQuestion;
}

export const NewSectionCustomField: FC<ISectionCustomField> = (props) => {
  const { data } = props;
  const changeSectionTitle = useNewTargetReportStore(
    (state) => state.changeSectionTitle
  );
  const removeSection = useNewTargetReportStore((state) => state.removeSection);
  const reset = useNewTargetReportStore(
    (state) => state.resetSectionCustomField
  );

  const onRemove = () => {
    removeSection(data.id);
  };

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
    </div>
  );
};
