import React, { useEffect, useState } from 'react';
import { Button, InputForm, ISelectOption, SelectForm, Title } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { Layout } from 'components/Layout/Layout';
import { Navigate, useNavigate } from 'react-router-dom';
import { OrganizationTypes, RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { useCommonStore } from 'store/useCommonStore';
import { useSelectOptions } from 'hooks';
import { OrganizationType } from 'TypeInterface';
import { ICreateTargetPayload, useNewTargetStore } from 'pages';
import { useChooseFileStore } from 'components/Modals/ModalChooseFile/useChooseFileStore';
import { ChooseFiles } from 'components/ChooseFiles';
import { disabledDateRangePicker, displayCheck } from 'utils';
import { DatePicker } from 'antd';
import { useUserStore } from 'store/useUserStore';
import { useDebounceSelect } from 'hooks/useDebounceSelect';
import './NewTargetPage.scss';

const { RangePicker } = DatePicker;

interface INewTargetForm {
  name: string;
  drug: ISelectOption;
  // owner: ISelectOption;
  date: [Date, Date];
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

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

export const NewTargetPage = () => {
  /*  const performers = useNewTargetStore((state) => state.performers);
  const getPerformers = useNewTargetStore((state) => state.getPerformers);
  const [inputPerformer, setInputPerformer] = useState<string>('');*/
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const drugs = useNewTargetStore((state) => state.drugs);
  const getDrugs = useNewTargetStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const specialties = useCommonStore((state) => state.specialties);
  const getSpecialties = useCommonStore((state) => state.getSpecialties);
  const [inputSpecialties, setInputSpecialties] = useState<string>('');
  const bricks = useNewTargetStore((state) => state.bricks);
  const getBricks = useNewTargetStore((state) => state.getBricks);
  const [inputBrick, setInputBrick] = useState<string>('');
  const createTarget = useNewTargetStore((state) => state.createTarget);
  const freePolls = useNewTargetStore((state) => state.polls);
  const getPolls = useNewTargetStore((state) => state.getPolls);
  const [inputPolls, setInputPolls] = useState<string>('');
  const selectedFiles = useChooseFileStore((state) => state.selectedFiles);
  const clearStore = useChooseFileStore((state) => state.clearStore);
  const [typeOrganization, setTypeOrganization] = useState<ISelectOption>(
    options[0]
  );
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewTargetForm>({
    defaultValues: {
      name: '',
      drug: undefined,
      // owner: undefined,
      numberOfVisits: '',
      numberOfVisitsA: '',
      numberOfVisitsB: '',
      numberOfVisitsC: '',
      numberOfVisitsD: '',
      numberOfVisitsF: '',
      bricks: [],
      specialties: [],
      poll: undefined,
      potentialOfVisitsA: '',
      potentialOfVisitsB: '',
      potentialOfVisitsC: '',
      potentialOfVisitsD: '',
      potentialOfVisitsF: '',
    },
  });

  useEffect(() => {
    clearStore();
  }, []);

  useDebounceSelect(inputSpecialties, getSpecialties);
  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputBrick, getBricks);
  useDebounceSelect(inputPolls, getPolls);

  const onSubmit: SubmitHandler<INewTargetForm> = async (data) => {
    const payload: ICreateTargetPayload = {
      name: data.name,
      drug_id: +data.drug.value,
      // owner_id: +data.owner.value,
      owner_id: me.id,
      started_at: data.date[0].toISOString(),
      finished_at: data.date[1].toISOString(),
      visits: data.numberOfVisits ? +data.numberOfVisits : 0,
      visitsA:
        typeOrganization.value === 'mpi' ? +data.numberOfVisitsA : undefined,
      visitsB:
        typeOrganization.value === 'mpi' ? +data.numberOfVisitsB : undefined,
      visitsC:
        typeOrganization.value === 'mpi' ? +data.numberOfVisitsC : undefined,
      visitsD:
        typeOrganization.value === 'mpi' ? +data.numberOfVisitsD : undefined,
      visitsF:
        typeOrganization.value === 'mpi' ? +data.numberOfVisitsF : undefined,
      potentialA:
        typeOrganization.value === 'mpi' ? +data.potentialOfVisitsA : undefined,
      potentialB:
        typeOrganization.value === 'mpi' ? +data.potentialOfVisitsB : undefined,
      potentialC:
        typeOrganization.value === 'mpi' ? +data.potentialOfVisitsC : undefined,
      potentialD:
        typeOrganization.value === 'mpi' ? +data.potentialOfVisitsD : undefined,
      potentialF:
        typeOrganization.value === 'mpi' ? +data.potentialOfVisitsF : undefined,
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
    };
    createTarget(payload, () => navigate(ROUTES.TARGETS));
    reset();
    clearStore();
  };

  const onCancel = () => {
    reset();
    clearStore();
    navigate(ROUTES.TARGETS);
  };

  // const performersList = useSelectOptions(performers, 'id', 'name');
  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const specialtiesList = useSelectOptions(specialties, 'id', 'name');
  const bricksList = useSelectOptions(bricks, 'id', 'name');
  const pollList = useSelectOptions(freePolls, 'id', 'name');

  if (!displayCheck(SideMenuTypes.TARGET_LIST, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='NewTargetPage h-full'>
      <Layout>
        <div className='NewTargetPage__Header'>
          <Title>Таргет-лист: создание</Title>
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
                iconType={'search'}
                inputValue={inputPerformer}
                onInputChange={setInputPerformer}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={performersList}
                label='Ответственный'
                error={errors.owner && errors.owner.message}
                isOptionDisabled={!inputPerformer.length}
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
          <div className='mt-20 flex gap-x-20'>
            <Button type='submit'>Создать таргет</Button>

            <Button className='btn cancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};
