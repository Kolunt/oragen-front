import React, { FC } from 'react';
import { IReportQuestion } from 'api/pollsApi';
import {
  Loyalty,
  SectionCheckBox,
  SectionCustomField,
} from 'components/Report/sections';
import { SectionRadio } from 'components/Report/sections/SectionRadio/SectionRadio';
import { v1 } from 'uuid';
import { Button } from 'ui-kit';
import { useReportStore } from 'components/Report/useReportStore';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './Report.scss';
import { Potential } from 'components/Report/sections/Potential';

export type ReportModeType = 'view' | 'edit';

interface IReport {
  questions: IReportQuestion[];
  mode: ReportModeType;
  redirect?: () => void;
}

export const Report: FC<IReport> = (props) => {
  const { questions, mode, redirect } = props;
  const monitoredReport = useReportStore((state) => state.monitoredReport);
  const fillOutReport = useReportStore((state) => state.fillOutReport);

  const onChangeReport = () => {
    if (monitoredReport?.id) {
      fillOutReport(monitoredReport.id);
      redirect && redirect();
    }
  };

  return (
    <div className='Report relative flex-container hidden'>
      <ScrollBar>
        {mode === 'edit' && <Loyalty />}
        {mode === 'edit' && <Potential />}
        {questions.map((item, index) => {
          if (item.type === 'field') {
            return (
              <SectionCustomField
                key={v1()}
                data={item}
                id={index}
                mode={mode}
              />
            );
          }
          if (item.type === 'checkbox') {
            return (
              <SectionCheckBox key={v1()} data={item} id={index} mode={mode} />
            );
          }
          if (item.type === 'radio') {
            return (
              <SectionRadio key={v1()} data={item} id={index} mode={mode} />
            );
          }
        })}
      </ScrollBar>
      {mode === 'edit' && (
        <div className='mt-20 flex justify-center'>
          <Button onClick={onChangeReport}>Сохранить</Button>
        </div>
      )}
    </div>
  );
};
