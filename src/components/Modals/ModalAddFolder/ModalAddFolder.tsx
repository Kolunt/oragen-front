import React from 'react';
import { Button, InputForm, Modal } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { useMediaStore } from 'pages/MediaPage/useMediaStore';
import './ModalAddFolder.scss';

interface IFolderForm {
  name: string;
}

export const ModalAddFolder = () => {
  const isShowModal = useModalsStore((state) => state.isAddFolder);
  const changeShowModal = useModalsStore((state) => state.handleAddFolder);
  const addFolder = useMediaStore((state) => state.createFolder);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFolderForm>({
    defaultValues: { name: '' },
  });

  const onSubmit: SubmitHandler<IFolderForm> = (data) => {
    addFolder(data.name);
    reset();
    changeShowModal(false);
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddFolder'>
        <h3 className='ModalAddFolder__Header'>Новая папка</h3>

        <form
          className='ModalAddFolder__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='name'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Название'
                label='Название'
                error={errors.name && errors.name.message}
              />
            )}
          />
          <div className='ButtonGroup'>
            <Button className='ButtonCancel' onClick={onCancel}>
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
