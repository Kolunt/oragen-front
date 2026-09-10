import React, { memo, useState } from 'react';
import classNames from 'classnames';
import './Stepper.scss';

export interface IStep {
  id: string | number;
  label?: string | number;
}

export interface IStepper {
  className?: string;
  active?: string | number;
}

const steps: IStep[] = [
  { id: 1, label: 'Выбрать таргет' },
  { id: 2, label: 'Перейти к локальным таргетам' },
  { id: 3, label: 'Выбрать локальный таргет' },
  { id: 4, label: 'Просмотр локального таргета' },
];

export const StepperTargets: React.FC<IStepper> = memo((props) => {
  const { className, active = 0 } = props;
  const [selectedStepId, setSelectedStepId] = useState(active);

  return (
    <div className={classNames('Stepper', className)}>
      {steps &&
        steps.map((step, index) => (
          <div
            className={classNames('Step', {
              Step__selected: step.id === selectedStepId,
              Step__passing: selectedStepId > step.id,
            })}
            key={step.id}
          >
            <div
              className={classNames('Round', {
                Round__selected: step.id === selectedStepId,
                Round__passing: selectedStepId > step.id,
              })}
            >
              {selectedStepId > step.id ? <>&#10004;</> : index + 1}
            </div>
            <div
              className={classNames('Label', {
                Label__selected: step.id === selectedStepId,
                Label__passing: selectedStepId > step.id,
              })}
            >
              {step.label}
            </div>
          </div>
        ))}
    </div>
  );
});
