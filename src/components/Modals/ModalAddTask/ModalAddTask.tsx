import React, { useState } from 'react';

import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import { fullNameValidation } from 'validation/validation';
import { Button, InputForm, Modal } from 'ui-kit';
import './ModalAddTask.scss';

/* const options: ISelectOption[] = [
  { value: '1', label: 'Не выбрано' },
  { value: '2', label: 'Зубенко Михаил Петрович' },
]; */

interface ITaskForm {
  taskName: string;
  contractor: string;
  deadline: string;
  phone: string;
  address: string;
}

export const ModalAddTask = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ITaskForm>({
    defaultValues: {
      taskName: '',
      contractor: '',
      deadline: '',
      phone: '',
      address: '',
    },
  });
  // const isShowModal = useModalsStore((state) => state.isTask);
  // const changeShowModal = useModalsStore((state) => state.handleTask);
  const [isShowModal, setShowModal] = useState(false);
  const onSubmit: SubmitHandler<ITaskForm> = (data) => {
    // const id = v1();
    // const newTask: ITaskForm & { id: string } = { id, ...data };

    // changeShowModal(false);
    reset();
  };

  return (
    <Modal
      visibility={isShowModal}
      changeVisibility={() => setShowModal(false)}
    >
      <div className='ModalAddTask'>
        <h3 className='ModalAddTask__Header'>Новая Задача</h3>

        <form className='ModalAddTask__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='taskName'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Название задачи'
                label='Название'
                error={errors.taskName && errors.taskName.message}
              />
            )}
          />
          <Controller
            control={control}
            name='contractor'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Исполнитель'
                label='Исполнитель'
                error={errors.contractor && errors.contractor.message}
              />
            )}
          />
          <Controller
            control={control}
            name='deadline'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Срок выполнения'
                label='Срок'
                error={errors.deadline && errors.deadline.message}
              />
            )}
          />
          <Controller
            control={control}
            name='phone'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Номер телефона'
                label='Номер телефона'
                error={errors.phone && errors.phone.message}
              />
            )}
          />
          <Controller
            control={control}
            name='address'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Адрес'
                label='Адрес'
                error={errors.address && errors.address.message}
              />
            )}
          />

          <div className='ModalAddTask__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => setShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Создать
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
