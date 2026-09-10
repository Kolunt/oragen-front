import React, { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useModalsStore } from 'store/useModalsStore';
import { Button, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { MultiValue, SingleValue } from 'react-select';
import './ModalChangeTarget.scss';

interface IChangeTargetForm {
  people: ISelectOption[];
}

export const ModalChangeTarget = () => {
  const { handleSubmit, control, reset } = useForm<IChangeTargetForm>({
    defaultValues: {
      people: undefined,
    },
  });
  const { errors } = useFormState({ control });

  const isShowModal = useModalsStore((state) => state.isChangeTarget);
  const changeShowModal = useModalsStore((state) => state.handleChangeTarget);
  const targetId = useModalsStore((state) => state.isChangeTargetId);
  // const changeTarget = useTargetsStore((state) => state.changeTarget);
  // const removeSelectedTarget = useTargetsStore(
  //   (state) => state.removeAvailableTarget
  // );
  // const targets = useTargetsStore((state) => state.availableTargets);
  const [contactSelection, setContactSelection] = useState<ISelectOption[]>([]);
  // const [target, setTarget] = useState<ITarget>();

  /* useEffect(() => {
    const dataMap: ISelectOption[] = [];
    for (let i = 0; i < targets.length; i++) {
      dataMap.push({ value: targets[i].id, label: targets[i].fullName });
    }
    setContactSelection(dataMap);
  }, [targets]);*/

  const handleContact = (
    event: SingleValue<ISelectOption> | MultiValue<ISelectOption>
  ) => {
    /*if (event) {
      //@ts-ignore
      const data = targets.find((item) => item.fullName === event.label);

      setTarget(data);
    }*/
  };

  const onSubmit: SubmitHandler<IChangeTargetForm> = (data) => {
    /*if (target) {
      const newTarget: ITarget = {
        id: target.id,
        fullName: target.fullName,
        phone: target.phone,
        company: target.company,
        position: target.position,
        type: target.type,
        address: target.address,
        email: target.email,
        visitsPlanned: target.visitsPlanned,
        visitsPerformed: target.visitsPerformed,
        creationDate: new Date(),
      };
      removeSelectedTarget(target.id);
      changeTarget(targetId, newTarget);
      changeShowModal(false);
      reset();
    }*/
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalChangeTarget'>
        <h3 className='ModalChangeTarget__Header'>Изменение таргет-листа</h3>

        <form
          className='ModalChangeTarget__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='people'
            rules={{ required: true }}
            render={({ field }) => (
              <SelectForm
                className='Select'
                value={field.value}
                onChange={(e) => {
                  handleContact(e);
                  field.onChange(e);
                }}
                options={contactSelection}
                label='Новый таргет'
              />
            )}
          />
          <div className='ModalChangeTarget__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
