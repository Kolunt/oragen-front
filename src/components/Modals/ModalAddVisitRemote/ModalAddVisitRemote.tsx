import React, { useEffect, useState } from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { Button, InputForm, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useUserStore } from 'store/useUserStore';
import { useSelectOptions } from 'hooks';
import { ICreateVisitRemotePayload } from 'api/visitsApi';
import { useVisitsGroupStore } from 'pages/VisitsPage/useVisitsGroupStore';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { ChooseFiles } from 'components/ChooseFiles';
import { useAddVisitRemoteStore } from 'components/Modals/ModalAddVisitRemote/useAddVisitRemoteStore';
import { DatePicker } from 'antd';
import { disabledDateRangePicker } from 'utils';
import { useDebounceSelect } from 'hooks/useDebounceSelect';

interface IVisitForm {
  contact: ISelectOption;
  drug: ISelectOption;
  plannedDate: Date;
  duration: string;
  poll: ISelectOption;
  participants?: ISelectOption[];
}

export const ModalAddVisitRemote = () => {
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const clearStore = useChooseFileStore((state) => state.clearStore);
  const isShowModal = useModalsStore((state) => state.isVisitRemote);
  const changeShowModal = useModalsStore((state) => state.handleVisitRemote);
  const addVisit = useVisitsGroupStore((state) => state.addRemoteVisit);
  const drugs = useAddVisitRemoteStore((state) => state.drugs);
  const getDrugs = useAddVisitRemoteStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const contacts = useAddVisitRemoteStore((state) => state.contacts);
  const getContacts = useAddVisitRemoteStore((state) => state.getContacts);
  const [inputContact, setInputContact] = useState<string>('');
  const getParticipants = useAddVisitRemoteStore(
    (state) => state.getParticipants
  );
  const participants = useAddVisitRemoteStore((state) => state.participants);
  const [inputParticipants, setInputParticipants] = useState<string>('');
  const freePolls = useAddVisitRemoteStore((state) => state.polls);
  const getPolls = useAddVisitRemoteStore((state) => state.getPolls);
  const [inputPolls, setInputPolls] = useState<string>('');
  const me = useUserStore((state) => state.me);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IVisitForm>();

  useDebounceSelect(inputContact, getContacts);
  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputPolls, getPolls);
  useDebounceSelect(inputParticipants, getParticipants);

  const onReset = () => {
    changeShowModal(false);
    clearStore();
    reset();
  };

  const onSubmit: SubmitHandler<IVisitForm> = (data) => {
    const newVisit: ICreateVisitRemotePayload = {
      performer_id: me.id,
      contact_id: +data.contact.value,
      drug_id: +data.drug.value,
      planned_at: data.plannedDate.toISOString(),
      duration: +data.duration,
      participantsList: data.participants
        ? data.participants.map((item) => +item.value)
        : [],
      poll_id: +data.poll.value,
      files: selectedFiles,
    };
    addVisit(newVisit);
    onReset();
    changeShowModal(false);
  };

  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const contactsList = useSelectOptions(contacts, 'id', 'full_name');
  const pollList = useSelectOptions(freePolls, 'id', 'name');
  const participantsList = useSelectOptions(participants, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddVisit'>
        <h3 className='ModalAddVisit__Header'>Дистанционный визит</h3>

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
              />
            )}
          />
          <Controller
            control={control}
            name='duration'
            // rules={numberValidation}
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Продолжительность'
                label='Продолжительность'
                error={errors.duration && errors.duration.message}
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
};
