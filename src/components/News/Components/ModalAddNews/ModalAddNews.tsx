import React, { FC, useState } from 'react';
import { useModalsStore } from 'store/useModalsStore';
import './ModalAddNews.scss';
import { useNewsStore } from '../../../../pages/HomePage/useNewsStore';
import {
  Button,
  DatePickerTiming,
  Icon,
  InputForm,
  ISelectOption,
  SelectForm,
  Title,
  Modal,
  TextArea,
} from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { ICreateNews } from '../../../../api/newsApi';

interface IModal {
  showModal: boolean;
  onCloseModal: () => void;
  getPayload: (payload: ICreateNews) => void;
}

export const ModalAddNews: FC<IModal> = ({
  showModal,
  onCloseModal,
  getPayload,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateNews>({
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const addNew: SubmitHandler<ICreateNews> = (data) => {
    getPayload(data);
    onCloseModal();
    reset();
  };
  return (
    <Modal
      className='bg-background-l8 br-10'
      visibility={showModal}
      changeVisibility={onCloseModal}
    >
      <div className='ModalAddNews'>
        <div className='ModalAddNews__IconClose' onClick={onCloseModal}>
          <Icon type='Close' />
        </div>
        <Title className='mb-20'>Добавить новость</Title>
        <form onSubmit={handleSubmit(addNew)}>
          <Controller
            control={control}
            name='title'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                className='mb-10'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите заголовок новости'
                label='Заголовок новости'
                error={errors.title && errors.title.message}
              />
            )}
          />
          <Controller
            control={control}
            name='text'
            rules={fullNameValidation}
            render={({ field }) => (
              <TextArea
                className='mb-10'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите текст новости'
                label='Текст новости'
                error={errors.text && errors.text.message}
              />
            )}
          />
          <div className='flex justify-end'>
            <Button className='' type='submit'>
              Добавить новость
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
