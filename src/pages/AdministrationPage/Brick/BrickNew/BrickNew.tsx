import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import {
  Button,
  InputForm,
  ISelectOption,
  ITab,
  SelectForm,
  Tabs,
  Title,
} from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { ICreateBrickPayload, LevelBrickType } from 'api/brickApi';
import { BrickLevelTypes, RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelectOptions } from 'hooks';
import {
  BlockSelectionTable,
  OrganizationSelectionTable,
  useNewBrickStore,
} from 'pages';
import { useMessageStore } from 'components';
import { useDebounceSelect } from 'hooks/useDebounceSelect';
import './BrickNew.scss';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';

interface INewBrickForm {
  name: string;
  performer: ISelectOption;
  bricks: number[];
}

const tabs: ITab[] = [
  { id: 'low', label: BrickLevelTypes.LOW },
  { id: 'medium', label: BrickLevelTypes.MEDIUM },
  { id: 'high', label: BrickLevelTypes.HIGH },
];

const lowTabs: ITab[] = [
  { id: 'name', label: 'По имени' },
  { id: 'address', label: 'По адресу' },
];

export const BrickNew = () => {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const performers = useNewBrickStore((state) => state.performers);
  const getPerformers = useNewBrickStore((state) => state.getPerformers);
  const [inputPerformer, setInputPerformer] = useState<string>('');
  const [selectedLowTabId, setSelectedLowTabId] = useState(lowTabs[0].id);
  const [search, setSearch] = useState<string>('');
  const organizations = useNewBrickStore((state) => state.organizations);
  const blocks = useNewBrickStore((state) => state.blocks);
  const highBlocks = useNewBrickStore((state) => state.highBlocks);
  const setBlocks = useNewBrickStore((state) => state.setBlocks);
  const setOrganizations = useNewBrickStore((state) => state.setOrganizations);
  const setHighBlocks = useNewBrickStore((state) => state.setHighBlocks);
  const getFreeSource = useNewBrickStore((state) => state.getFreeSource);
  const [selectedOrganizations, setSelectedOrganizations] = useState<number[]>(
    []
  );
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const [selectedHighBlocks, setSelectedHighBlocks] = useState<number[]>([]);
  const addBlock = useNewBrickStore((state) => state.addBlock);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewBrickForm>({
    defaultValues: {
      name: '',
      performer: undefined,
      bricks: [],
    },
  });

  const onSubmit: SubmitHandler<INewBrickForm> = async (data) => {
    let sourcesList: number[] = [];
    if (selectedTabId === 'low') sourcesList = selectedOrganizations;
    if (selectedTabId === 'medium') sourcesList = selectedBlocks;
    if (selectedTabId === 'high') sourcesList = selectedHighBlocks;

    if (sourcesList.length) {
      const payload: ICreateBrickPayload = {
        name: data.name,
        type: selectedTabId as LevelBrickType,
        owner_id: +data.performer.value,
        sources_list: sourcesList,
      };
      await addBlock(payload, () => navigate(ROUTES.BRICKS));
      onCancel();
    } else {
      useMessageStore.getState().showMessage('error', 'Нужно выбрать брики!');
    }
  };

  const onCancel = useCallback(() => {
    reset();
    setOrganizations([]);
    setHighBlocks([]);
    setBlocks([]);
    navigate(ROUTES.BRICKS);
  }, []);

  useEffect(() => {
    setSearch('');
    if (selectedTabId === 'low') setSelectedOrganizations([]);
    if (selectedTabId === 'medium') setSelectedBlocks([]);
    if (selectedTabId === 'high') setSelectedHighBlocks([]);
  }, [selectedTabId]);

  const onGetDataTable = () => {
    if (selectedTabId === 'low') {
      if (selectedLowTabId === 'name') {
        getFreeSource('low', search);
      }
      if (selectedLowTabId === 'address') {
        getFreeSource('low', '', search);
      }
    } else {
      getFreeSource(selectedTabId as LevelBrickType, search);
    }
  };

  useDebounceSelect(inputPerformer, getPerformers);

  const owners = useSelectOptions(performers, 'id', 'name');

  if (!displayCheck(SideMenuTypes.ADMIN, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='BrickNew'>
      <Layout>
        <div className='mb-20'>
          <Title>Администрирование: добавление брика</Title>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white-l1 p-20 br-10 ContactsPageForm'
        >
          <div className={'flex gap-x-20'}>
            <Controller
              control={control}
              name='name'
              rules={fullNameValidation}
              render={({ field }) => (
                <InputForm
                  className='mb-10 fz-13 w-full'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Название брика'
                  label='Название брика'
                  error={errors.name && errors.name.message}
                />
              )}
            />
            <Controller
              control={control}
              name='performer'
              rules={fullNameValidation}
              render={({ field }) => (
                <SelectForm
                  iconType={'search'}
                  className='CustomSelect w-full'
                  inputValue={inputPerformer}
                  onInputChange={setInputPerformer}
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  options={owners}
                  label='Ответственный'
                  isOptionDisabled={!inputPerformer.length}
                  error={errors.performer && errors.performer.message}
                  сlearable={true}
                />
              )}
            />
          </div>
          <Tabs
            className='mb-10 fz-13 fw-600 w-fit-content'
            selectedId={selectedTabId}
            tabs={tabs}
            onClick={setSelectedTabId}
          />
          <div className='flex gap-x-20 mb-20'>
            {selectedTabId === 'low' && (
              <Tabs
                className='fz-13 shrink-0'
                selectedId={selectedLowTabId}
                tabs={lowTabs}
                onClick={setSelectedLowTabId}
              />
            )}
            <InputForm
              className='fz-13 w-600'
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder='Поиск'
            />
            <Button onClick={onGetDataTable}>Найти</Button>
          </div>
          {selectedTabId === 'low' && (
            <OrganizationSelectionTable
              organizations={organizations}
              addOrganizations={setSelectedOrganizations}
            />
          )}
          {selectedTabId === 'medium' && (
            <BlockSelectionTable
              blocks={blocks}
              addBlocks={setSelectedBlocks}
            />
          )}
          {selectedTabId === 'high' && (
            <BlockSelectionTable
              blocks={highBlocks}
              addBlocks={setSelectedHighBlocks}
            />
          )}
          <div className='mt-20 flex gap-x-20'>
            <Button type='submit'>Добавить брик</Button>
            <Button className='btn cancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};
