import React, { FC, useMemo } from 'react';
import { Button, ISelectOption, Modal, SelectForm, Title } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useBrickStore } from 'store/useBrickStore';
import { useParams } from 'react-router-dom';
import './ModalAddBrick.scss';

interface IAddBrickForm {
  bricks: ISelectOption;
}

interface IModal {
  showModal: boolean;
  onCloseModal: () => void;
  getPayload: (payload: number | string) => void;
}

export const ModalAddBrick: FC<IModal> = ({
  showModal,
  onCloseModal,
  getPayload,
}) => {
  const freeSource = useBrickStore((state) => state.freeSource);
  const monitoredBlock = useBrickStore((state) => state.monitoredBlock);
  const addBlockSource = useBrickStore((state) => state.addBlockSource);
  const { id_brick } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IAddBrickForm>({
    defaultValues: {
      bricks: undefined,
    },
  });

  const onSubmit: SubmitHandler<IAddBrickForm> = (data) => {
    getPayload(data.bricks.value);
    onCancel();
  };

  const freeSourceList: ISelectOption[] = useMemo(() => {
    return freeSource
      .map((brick) => ({
        value: `${brick.id}`,
        label: brick.name,
      }))
      .filter((brick) => +brick.value !== +(id_brick ?? -1));
  }, [freeSource]);

  const onCancel = () => {
    reset();
    onCloseModal();
  };

  return (
    <Modal
      classNameContent='ModalWrapper'
      visibility={showModal}
      changeVisibility={onCloseModal}
    >
      <div className='ModalAddBrick'>
        <div className='mb-20'>
          <Title>Добавить брик</Title>
        </div>

        <form
          className='BrickOrganizationForm'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='bricks'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={freeSourceList}
                label='Брики'
                error={errors.bricks && errors.bricks.message}
              />
            )}
          />

          <div className='mt-20 flex gap-x-10'>
            <Button type='submit'>Добавить</Button>

            <Button className='btn cancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
