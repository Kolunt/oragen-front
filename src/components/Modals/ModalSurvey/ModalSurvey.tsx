import React, { useEffect, useState } from 'react';

import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import { fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { Button, InputForm, Modal, ISelectOption, SelectForm } from 'ui-kit';
import './ModalSurvey.scss';
import { useContactsStore } from 'store/useContactsStore';

const options: ISelectOption[] = [{ value: 'contacts', label: 'Контакты' }];

interface ISurveyForm {
  type: ISelectOption;
  amount: string;
  percent: string;
  percent2: string;
}

export const ModalSurvey = () => {
  const { handleSubmit, control, reset } = useForm<ISurveyForm>({
    defaultValues: {
      type: undefined,
      amount: '',
      percent: '',
      percent2: '',
    },
  });
  const { errors } = useFormState({ control });
  const isShowModal = useModalsStore((state) => state.isSurvey);
  const changeShowModal = useModalsStore((state) => state.handleSurvey);
  const contacts = useContactsStore((state) => state.contacts);
  const [contactSelection, setContactSelection] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (contacts) {
      const data: ISelectOption[] = [];
      contacts.forEach((item) =>
        data.push({ value: item.id, label: item.full_name })
      );
      setContactSelection(data);
    }
  }, []);

  const onSubmit: SubmitHandler<ISurveyForm> = (data) => {
    reset();
    changeShowModal(false);
  };

  return (
    <Modal
      className='ModalStyle'
      visibility={isShowModal}
      changeVisibility={changeShowModal}
    >
      <div className='ModalSurvey'>
        <h3 className='ModalSurvey__Header'>Опросник</h3>

        <form className='ModalSurvey__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='type'
            rules={{ required: true }}
            render={({ field }) => (
              <SelectForm
                className='SelectStyle'
                // @ts-ignore
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={contactSelection}
                label='Контакты'
              />
            )}
          />
          <Controller
            control={control}
            name='amount'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите количество'
                label='Количество пациентов в день'
                error={errors.amount && errors.amount.message}
              />
            )}
          />
          <Controller
            control={control}
            name='percent'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите количество'
                label='Количество пациентов, которым может быть назначен препарат'
                error={errors.percent && errors.percent.message}
              />
            )}
          />
          <Controller
            control={control}
            name='percent2'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите количество'
                label='Количество пациентов, которым назначен препарат'
                error={errors.percent2 && errors.percent2.message}
              />
            )}
          />
          <div className='ModalSurvey__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Создать опросник
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
