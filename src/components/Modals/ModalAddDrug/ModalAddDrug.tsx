import React from 'react';
import { Button, InputForm, Modal } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { useDrugsStore } from 'store/useDrugsStore';
import './ModalAddDrug.scss';

interface IDrugForm {
  name: string;
}

export const ModalAddDrug = () => {
  const isShowModal = useModalsStore((state) => state.isAddDrug);
  const changeShowModal = useModalsStore((state) => state.handleAddDrug);
  const addDrug = useDrugsStore((state) => state.addDrug);
  // const [activity, setActivity] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IDrugForm>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<IDrugForm> = (data) => {
    addDrug(data.name);
    reset();
    changeShowModal(false);
  };
  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddDrug'>
        <h3 className='ModalAddDrug__Header'>Новый препарат</h3>

        <form className='ModalAddDrug__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='name'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Название препарата'
                label='Название препарата'
                error={errors.name && errors.name.message}
              />
            )}
          />
          {/*          <div className='SwitchWrapper'>
            <span className='SwitchTitle'>Активность</span>
            <Switch
              checked={activity}
              onChange={setActivity}
              width={48}
              height={24}
              borderRadius={12}
              handleDiameter={20}
            />
          </div>*/}
          <div className='ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
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
