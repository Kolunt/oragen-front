import React, { useState } from 'react';
import { Button, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { useSelectOptions } from 'hooks';
import { ICreateVisitPayloadPharmacy } from 'api/visitsPharmacyApi';
import { useAddVisitPharmacyStore } from 'components/Modals/ModalAddVisitPharmacy/useAddVisitPharmacyStore';
import { useVisitsGroupPharmacyStore } from 'pages';
import { ChooseFiles } from 'components/ChooseFiles';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { DatePicker } from 'antd';
import { disabledDateRangePicker } from 'utils';
import { useDebounceSelect } from 'hooks/useDebounceSelect';

interface IVisitForm {
  pharmacy: ISelectOption;
  drug: ISelectOption;
  plannedDate: Date;
  poll: ISelectOption;
  participants?: ISelectOption[];
}

export const ModalAddVisitPharmacy = () => {
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const clearStore = useChooseFileStore((state) => state.clearStore);
  const isShowModal = useModalsStore((state) => state.isVisitPharmacy);
  const changeShowModal = useModalsStore((state) => state.handleVisitPharmacy);
  const addVisit = useVisitsGroupPharmacyStore((state) => state.addVisit);
  const drugs = useAddVisitPharmacyStore((state) => state.drugs);
  const getDrugs = useAddVisitPharmacyStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const getParticipants = useAddVisitPharmacyStore(
    (state) => state.getParticipants
  );
  const participants = useAddVisitPharmacyStore((state) => state.participants);
  const [inputParticipants, setInputParticipants] = useState<string>('');
  const pharmacies = useAddVisitPharmacyStore((state) => state.pharmacies);
  const getPharmacies = useAddVisitPharmacyStore(
    (state) => state.getPharmacies
  );
  const [inputOrganization, setInputOrganization] = useState<string>('');
  const freePolls = useAddVisitPharmacyStore((state) => state.polls);
  const getPolls = useAddVisitPharmacyStore((state) => state.getPolls);
  const [inputPolls, setInputPolls] = useState<string>('');
  const me = useUserStore((state) => state.me);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IVisitForm>();

  const onReset = () => {
    reset();
    clearStore();
    changeShowModal(false);
  };

  const onSubmit: SubmitHandler<IVisitForm> = (data) => {
    const newVisit: ICreateVisitPayloadPharmacy = {
      performer_id: me.id,
      organization_id: +data.pharmacy.value,
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

  useDebounceSelect(inputOrganization, getPharmacies);
  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputPolls, getPolls);
  useDebounceSelect(inputParticipants, getParticipants);

  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const pharmaciesList = useSelectOptions(pharmacies, 'id', 'name');
  const pollList = useSelectOptions(freePolls, 'id', 'name');
  const participantsList = useSelectOptions(participants, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddVisit'>
        <h3 className='ModalAddVisit__Header'>Новый визит в аптеку</h3>

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
            name='pharmacy'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                iconType={'search'}
                inputValue={inputOrganization}
                onInputChange={setInputOrganization}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={pharmaciesList}
                label='Организация'
                error={errors.pharmacy && errors.pharmacy.message}
                isOptionDisabled={!inputOrganization.length}
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
};
