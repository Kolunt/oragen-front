import React, { memo, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { Button, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { useSelectOptions } from 'hooks';
import { ICreateVisitPayload } from 'api/visitsApi';
import { useUserStore } from 'store/useUserStore';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { ChooseFiles } from 'components/ChooseFiles';
import { useVisitsGroupStore } from 'pages/VisitsPage/useVisitsGroupStore';
import { useAddVisitStore } from 'components/Modals/ModalAddVisit/useAddVisitStore';
import { disabledDateRangePicker } from 'utils';
import { DatePicker } from 'antd';
import { useDebounceSelect } from 'hooks/useDebounceSelect';
import './ModalAddVisit.scss';

interface IVisitForm {
  contact: ISelectOption;
  drug: ISelectOption;
  plannedDate: Date;
  poll: ISelectOption;
  participants?: ISelectOption[];
}

export const ModalAddVisit = memo(() => {
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const clearStore = useChooseFileStore((state) => state.clearStore);
  const isShowModal = useModalsStore((state) => state.isVisit);
  const addVisit = useVisitsGroupStore((state) => state.addVisit);
  const drugs = useAddVisitStore((state) => state.drugs);
  const getDrugs = useAddVisitStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const changeShowModal = useModalsStore((state) => state.handleVisit);
  const contacts = useAddVisitStore((state) => state.contacts);
  const getContacts = useAddVisitStore((state) => state.getContacts);
  const [inputContact, setInputContact] = useState<string>('');
  const getParticipants = useAddVisitStore((state) => state.getParticipants);
  const participants = useAddVisitStore((state) => state.participants);
  const [inputParticipants, setInputParticipants] = useState<string>('');
  const freePolls = useAddVisitStore((state) => state.polls);
  const getPolls = useAddVisitStore((state) => state.getPolls);
  const [inputPolls, setInputPolls] = useState<string>('');
  const me = useUserStore((state) => state.me);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IVisitForm>();

  const onReset = () => {
    changeShowModal(false);
    clearStore();
    reset();
  };

  const onSubmit: SubmitHandler<IVisitForm> = (data) => {
    const newVisit: ICreateVisitPayload = {
      performer_id: me.id,
      contact_id: +data.contact.value,
      drug_id: +data.drug.value,
      planned_at: data.plannedDate.toISOString(),
      participantsList: data.participants
        ? data.participants.map((item) => +item.value)
        : [],
      poll_id: +data.poll.value,
      files: selectedFiles,
    };
    addVisit(newVisit);
    onReset();
  };

  useDebounceSelect(inputContact, getContacts);
  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputPolls, getPolls);
  useDebounceSelect(inputParticipants, getParticipants);

  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const contactsList = useSelectOptions(contacts, 'id', 'full_name');
  const pollList = useSelectOptions(freePolls, 'id', 'name');
  const participantsList = useSelectOptions(participants, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddVisit'>
        <h3 className='ModalAddVisit__Header'>Новый визит</h3>

        <form className='ModalAddVisit__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='plannedDate'
            rules={fullNameValidation}
            render={({ field }) => (
              <div className='date-picker'>
                <label>Дата</label>
                <DatePicker
                  onChange={(e) => field.onChange(e)}
                  format={'DD.MM.YYYY HH:mm'}
                  showTime={{ format: 'HH:mm', minuteStep: 5 }}
                  superNextIcon={false}
                  superPrevIcon={false}
                  showNow={false}
                  placeholder={'Не выбрано'}
                  disabledDate={disabledDateRangePicker}
                  status={errors.plannedDate && 'error'}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name='contact'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                iconType={'search'}
                inputValue={inputContact}
                onInputChange={setInputContact}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={contactsList}
                label='Контакт'
                error={errors.contact && errors.contact.message}
                isOptionDisabled={!inputContact.length}
                сlearable={true}
              />
            )}
          />
          <Controller
            control={control}
            name='drug'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                iconType={'search'}
                inputValue={inputDrug}
                onInputChange={setInputDrug}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={drugsList}
                label='Препарат'
                error={errors.drug && errors.drug.message}
                isOptionDisabled={!inputDrug.length}
                сlearable={true}
              />
            )}
          />
          <Controller
            control={control}
            name='participants'
            rules={{ required: false }}
            render={({ field }) => (
              <SelectForm
                iconType={'search'}
                inputValue={inputParticipants}
                onInputChange={setInputParticipants}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={participantsList}
                label='Участники'
                isMulti={true}
                error={errors.participants && errors.participants.message}
                isOptionDisabled={!inputParticipants.length}
              />
            )}
          />
          <Controller
            control={control}
            name='poll'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                iconType={'search'}
                inputValue={inputPolls}
                onInputChange={setInputPolls}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={pollList}
                label='Отчет'
                error={errors.poll && errors.poll.message}
                isOptionDisabled={!inputPolls.length}
                сlearable={true}
              />
            )}
          />
          <ChooseFiles />
          <div className='ModalAddVisit__ButtonGroup'>
            <Button className='ButtonCancel' onClick={onReset}>
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
});
