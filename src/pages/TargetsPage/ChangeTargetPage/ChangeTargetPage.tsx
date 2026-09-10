import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Button, InputForm, ISelectOption, SelectForm, Title } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { useCommonStore } from 'store/useCommonStore';
import { useTargetsStore } from 'store/useTargetsStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { ILoyaltyRange } from 'api/targetListApi';
import {
  DateFormats,
  OrganizationTypes,
  RoleTypes,
  ROUTES,
  SideMenuTypes,
} from 'enums';
import dayjs from 'dayjs';
import { useSelectOptions } from 'hooks';
import { useChangeTargetStore } from 'pages/TargetsPage/ChangeTargetPage/useChangeTargetStore';
import { OrganizationType } from 'TypeInterface';
import { ICreateTargetPayload } from 'pages/TargetsPage/NewTargetPage';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { ChooseFiles } from 'components/ChooseFiles';
import { disabledDateRangePicker, displayCheck } from 'utils';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { useDebounceSelect } from 'hooks/useDebounceSelect';
import './ChangeTargetPage.scss';
import { useUserStore } from 'store/useUserStore';

const { RangePicker } = DatePicker;

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

interface IChangeTargetForm {
  name: string;
  drug: ISelectOption;
  owner: ISelectOption;
  date: any;
  numberOfVisits: string;
  numberOfVisitsA: string;
  numberOfVisitsB: string;
  numberOfVisitsC: string;
  numberOfVisitsD: string;
  numberOfVisitsF: string;
  bricks: ISelectOption[];
  specialties: ISelectOption[];
  poll: ISelectOption;
  potentialOfVisitsA: string;
  potentialOfVisitsB: string;
  potentialOfVisitsC: string;
  potentialOfVisitsD: string;
  potentialOfVisitsF: string;
}

export const ChangeTargetPage = () => {
  const performers = useChangeTargetStore((state) => state.performers);
  const getPerformers = useChangeTargetStore((state) => state.getPerformers);
  const [inputPerformer, setInputPerformer] = useState<string>('');
  const drugs = useChangeTargetStore((state) => state.drugs);
  const getDrugs = useChangeTargetStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const specialties = useCommonStore((state) => state.specialties);
  const getSpecialties = useCommonStore((state) => state.getSpecialties);
  const [inputSpecialties, setInputSpecialties] = useState<string>('');
  const bricks = useChangeTargetStore((state) => state.bricks);
  const getBricks = useChangeTargetStore((state) => state.getBricks);
  const [inputBrick, setInputBrick] = useState<string>('');
  const monitoredTarget = useTargetsStore((state) => state.monitoredTarget);
  const updateTarget = useChangeTargetStore((state) => state.updateTarget);
  const freePolls = useChangeTargetStore((state) => state.polls);
  const getPolls = useChangeTargetStore((state) => state.getPolls);
  const [inputPolls, setInputPolls] = useState<string>('');
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const clearStore = useChooseFileStore((state) => state.clearStore);
  const addFiles = useChooseFileStore((state) => state.addFiles);
  const [typeOrganization, setTypeOrganization] = useState<ISelectOption>(
    monitoredTarget.type === 'mpi' ? options[0] : options[1]
  );
  const navigate = useNavigate();
  const loyalityRange: ILoyaltyRange[] =
    monitoredTarget.type === 'mpi' ? monitoredTarget.loyality_range : [];
  const potentialRange: ILoyaltyRange[] =
    monitoredTarget.type === 'mpi' ? monitoredTarget.potential_range : [];
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  const changeDateFormatForAntD = (date: Date) => {
    return dayjs(date).format(DateFormats.DATE_FORMAT);
  };

  const defaultValueRangePicker: RangePickerProps['defaultValue'] = [
    dayjs(changeDateFormatForAntD(monitoredTarget.started_at), 'DD.MM.YYYY'),
    dayjs(changeDateFormatForAntD(monitoredTarget.finished_at), 'DD.MM.YYYY'),
  ];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IChangeTargetForm>({
    defaultValues: {
      name: monitoredTarget.name,
      drug: {
        value: `${monitoredTarget.drug.id}`,
        label: monitoredTarget.drug.name,
      },
      owner: {
        value: `${monitoredTarget.owner.id}`,
        label: monitoredTarget.owner.name,
      },
      date: defaultValueRangePicker,
      numberOfVisits: `${monitoredTarget.visits_count}`,
      numberOfVisitsA:
        `${loyalityRange.find((item) => item.name === 'A')?.value}` || '',
      numberOfVisitsB:
        `${loyalityRange.find((item) => item.name === 'B')?.value}` || '',
      numberOfVisitsC:
        `${loyalityRange.find((item) => item.name === 'C')?.value}` || '',
      numberOfVisitsD:
        `${loyalityRange.find((item) => item.name === 'D')?.value}` || '',
      numberOfVisitsF:
        `${loyalityRange.find((item) => item.name === 'F')?.value}` || '',
      bricks: monitoredTarget.blocks.map((block) => ({
        value: `${block.id}`,
        label: block.name,
      })),
      specialties: monitoredTarget.positions.map((position) => ({
        value: `${position.id}`,
        label: position.name,
      })),
      poll: {
        value: `${monitoredTarget.report.id}`,
        label: monitoredTarget.report.name,
      },
      potentialOfVisitsA:
        `${potentialRange.find((item) => item.name === 'A')?.value}` || '',
      potentialOfVisitsB:
        `${potentialRange.find((item) => item.name === 'B')?.value}` || '',
      potentialOfVisitsC:
        `${potentialRange.find((item) => item.name === 'C')?.value}` || '',
      potentialOfVisitsD:
        `${potentialRange.find((item) => item.name === 'D')?.value}` || '',
      potentialOfVisitsF:
        `${potentialRange.find((item) => item.name === 'F')?.value}` || '',
    },
  });

  useEffect(() => {
    clearStore();
    addFiles(monitoredTarget.files ?? []);
  }, []);

  useDebounceSelect(inputPerformer, getPerformers);
  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputPolls, getPolls);
  useDebounceSelect(inputSpecialties, getSpecialties);
  useDebounceSelect(inputBrick, getBricks);

  const onSubmit: SubmitHandler<IChangeTargetForm> = async (data) => {
    const payload: ICreateTargetPayload = {
      name: data.name,
      drug_id: +data.drug.value,
      owner_id: +data.owner.value,
      started_at: data.date[0].toISOString(),
      finished_at: data.date[1].toISOString(),
      visits: +data.numberOfVisits,
      visitsA: +data.numberOfVisitsA,
      visitsB: +data.numberOfVisitsB,
      visitsC: +data.numberOfVisitsC,
      visitsD: +data.numberOfVisitsD,
      visitsF: +data.numberOfVisitsF,
      blocks_list: data.bricks ? data.bricks.map((item) => +item.value) : [],
      positions_list:
        typeOrganization.value === 'mpi'
          ? data.specialties
            ? data.specialties.map((item) => +item.value)
            : []
          : [93],
      poll_id: +data.poll.value,
      type: typeOrganization.value as OrganizationType,
      files: selectedFiles,
      potentialA: +data.potentialOfVisitsA,
      potentialB: +data.potentialOfVisitsB,
      potentialC: +data.potentialOfVisitsC,
      potentialD: +data.potentialOfVisitsD,
      potentialF: +data.potentialOfVisitsF,
    };
    await updateTarget(monitoredTarget.id, payload);
    reset();
    navigate(ROUTES.TARGET_INFO);
  };

  const performersList = useSelectOptions(performers, 'id', 'name');
  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const specialtiesList = useSelectOptions(specialties, 'id', 'name');
  const bricksList = useSelectOptions(bricks, 'id', 'name');
  const pollList = useSelectOptions(freePolls, 'id', 'name');

  const onCancel = () => {
    clearStore();
    navigate(ROUTES.TARGETS);
  };

  if (!displayCheck(SideMenuTypes.TARGET_REPORTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='ChangeTargetPage'>
      <Layout>
        <div className='NewTargetPage__Header'>
          <Title>Таргет-лист: изменение</Title>
        </div>

        <form className='ContactsPageForm' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='name'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                className='CustomInput'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите название'
                label='Название таргет-лист'
                error={errors.name && errors.name.message}
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
          {/*          <Controller
            control={control}
            name='owner'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                inputValue={inputPerformer}
                onInputChange={setInputPerformer}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={performersList}
                label='Ответственный'
                error={errors.owner && errors.owner.message}
                isOptionDisabled={!inputPerformer.length}
                сlearable={true}
              />
            )}
          />*/}
          <Controller
            control={control}
            name='date'
            rules={dateValidation}
            render={({ field }) => (
              <div className='range-picker w-500'>
                <label>Выбор диапазона времени</label>
                <RangePicker
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  format={'DD.MM.YYYY'}
                  superNextIcon={false}
                  superPrevIcon={false}
                  disabledDate={disabledDateRangePicker}
                  status={errors.date && 'error'}
                />
              </div>
            )}
          />
          <SelectForm
            className='CustomSelect'
            value={typeOrganization}
            onChange={(e) => setTypeOrganization(e as ISelectOption)}
            options={options}
            label='Тип'
            disabled={true}
          />
          {typeOrganization.value === 'mpi' && (
            <Controller
              control={control}
              name='specialties'
              rules={fullNameValidation}
              render={({ field }) => (
                <SelectForm
                  className='CustomSelect'
                  iconType={'search'}
                  inputValue={inputSpecialties}
                  onInputChange={setInputSpecialties}
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  options={specialtiesList}
                  label='Специальности'
                  isMulti={true}
                  error={errors.specialties && errors.specialties.message}
                  isOptionDisabled={!inputSpecialties.length}
                />
              )}
            />
          )}
          <div className={'NumberOfVisitsGrid'}>
            {typeOrganization.value === 'pharmacy' && (
              <Controller
                control={control}
                name='numberOfVisits'
                rules={fullNameValidation}
                render={({ field }) => (
                  <InputForm
                    type='number'
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    placeholder='Укажите количество'
                    label='Количество визитов'
                    error={
                      errors.numberOfVisits && errors.numberOfVisits.message
                    }
                  />
                )}
              />
            )}
            {typeOrganization.value === 'mpi' && (
              <>
                <Controller
                  control={control}
                  name='numberOfVisitsA'
                  rules={fullNameValidation}
                  render={({ field }) => (
                    <InputForm
                      type='number'
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      placeholder='Укажите количество'
                      label='Лояльность А'
                      error={
                        errors.numberOfVisitsA && errors.numberOfVisitsA.message
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='numberOfVisitsB'
                  rules={fullNameValidation}
                  render={({ field }) => (
                    <InputForm
                      type='number'
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      placeholder='Укажите количество'
                      label='Лояльность B'
                      error={
                        errors.numberOfVisitsB && errors.numberOfVisitsB.message
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='numberOfVisitsC'
                  rules={fullNameValidation}
                  render={({ field }) => (
                    <InputForm
                      type='number'
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      placeholder='Укажите количество'
                      label='Лояльность C'
                      error={
                        errors.numberOfVisitsC && errors.numberOfVisitsC.message
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='numberOfVisitsD'
                  rules={fullNameValidation}
                  render={({ field }) => (
                    <InputForm
                      type='number'
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      placeholder='Укажите количество'
                      label='Лояльность D'
                      error={
                        errors.numberOfVisitsD && errors.numberOfVisitsD.message
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='numberOfVisitsF'
                  rules={fullNameValidation}
                  render={({ field }) => (
                    <InputForm
                      type='number'
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      placeholder='Укажите количество'
                      label='Неизвестная лояльность'
                      error={
                        errors.numberOfVisitsF && errors.numberOfVisitsF.message
                      }
                    />
                  )}
                />
              </>
            )}
          </div>
          {typeOrganization.value === 'mpi' && (
            <div className={'NumberOfVisitsGrid'}>
              <Controller
                control={control}
                name='potentialOfVisitsA'
                rules={fullNameValidation}
                render={({ field }) => (
                  <InputForm
                    type='number'
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    placeholder='Укажите количество'
                    label='Потенциал А'
                    error={
                      errors.potentialOfVisitsA &&
                      errors.potentialOfVisitsA.message
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name='potentialOfVisitsB'
                rules={fullNameValidation}
                render={({ field }) => (
                  <InputForm
                    type='number'
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    placeholder='Укажите количество'
                    label='Потенциал B'
                    error={
                      errors.potentialOfVisitsB &&
                      errors.potentialOfVisitsB.message
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name='potentialOfVisitsC'
                rules={fullNameValidation}
                render={({ field }) => (
                  <InputForm
                    type='number'
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    placeholder='Укажите количество'
                    label='Потенциал C'
                    error={
                      errors.potentialOfVisitsC &&
                      errors.potentialOfVisitsC.message
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name='potentialOfVisitsD'
                rules={fullNameValidation}
                render={({ field }) => (
                  <InputForm
                    type='number'
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    placeholder='Укажите количество'
                    label='Потенциал D'
                    error={
                      errors.potentialOfVisitsD &&
                      errors.potentialOfVisitsD.message
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name='potentialOfVisitsF'
                rules={fullNameValidation}
                render={({ field }) => (
                  <InputForm
                    type='number'
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    placeholder='Укажите количество'
                    label='Неизвестный потенциал'
                    error={
                      errors.potentialOfVisitsF &&
                      errors.potentialOfVisitsF.message
                    }
                  />
                )}
              />
            </div>
          )}
          <Controller
            control={control}
            name='bricks'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                iconType={'search'}
                inputValue={inputBrick}
                onInputChange={setInputBrick}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={bricksList}
                label='Брики'
                isMulti={true}
                error={errors.bricks && errors.bricks.message}
                isOptionDisabled={!inputBrick.length}
              />
            )}
          />
          <Controller
            control={control}
            name='poll'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
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
          <div className='Buttons'>
            <Button type='submit'>Изменить таргет</Button>
            <Button className='ButtonCancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};
