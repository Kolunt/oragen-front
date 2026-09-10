import React, { useEffect, useState } from 'react';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  SelectForm,
  Title,
} from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useTasksStore } from 'store/useTasksStore';
import { useUserStore } from 'store/useUserStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICreateTaskPayload } from 'api/tasksApi';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { useSelectOptions } from 'hooks';
import { disabledDateRangePicker } from 'utils';
import { DatePicker } from 'antd';
import './ModalAddSubTask.scss';

const { RangePicker } = DatePicker;

interface INewSubTaskForm {
  name: string;
  description: string;
  performer: ISelectOption;
  watchers: ISelectOption[];
  date: any;
}

export const ModalAddSubTask = () => {
  const isShowModal = useModalsStore((state) => state.isAddSubTask);
  const changeShowModal = useModalsStore((state) => state.handleAddSubTask);
  const monitoredTaskId = useTasksStore((state) => state.monitoredTaskId);
  const addTask = useTasksStore((state) => state.addTask);
  const getUsers = useUserStore((state) => state.getUsers);
  const users = useUserStore((state) => state.users);
  const [inputPerformer, setInputPerformer] = useState<string>('');
  const [inputWatchers, setInputWatchers] = useState<string>('');

  // const inputRef = useRef<HTMLInputElement | null>(null);

  /*  const {
    fileNames,
    handleDragDropEvent,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();*/
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewSubTaskForm>({
    defaultValues: {
      name: '',
      description: '',
      performer: undefined,
      watchers: [],
    },
  });

  useEffect(() => {
    if (inputPerformer.length) {
      getUsers(inputPerformer);
    }

    if (inputWatchers.length) {
      getUsers(inputWatchers);
    }
  }, [inputPerformer, inputWatchers]);

  const performers = useSelectOptions(users, 'id', 'name');

  /*const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = createFormData();

    /!*   try {
         axios.post('https://some-api.com', formData, {
           // 'content-type': 'multipart/form-data',
         });
       } catch (error) {
         console.error('Failed to submit files.');
       }*!/
  };*/

  const onSubmit: SubmitHandler<INewSubTaskForm> = (data) => {
    const { watchers, performer, name, description, date } = data;
    const payload: ICreateTaskPayload = {
      performer_id: +performer.value,
      parent_task_id: monitoredTaskId,
      name: name,
      description: description,
      started_at: date[0].toISOString(),
      finished_at: date[1].toISOString(),
      watchers_list: watchers ? watchers.map((item) => +item.value) : [],
    };
    addTask(payload, () => changeShowModal(false));
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  return (
    <Modal
      classNameContent='CustomModalAddSubTask'
      visibility={isShowModal}
      changeVisibility={changeShowModal}
    >
      <div className='ModalAddSubTask'>
        <div className='ModalAddSubTask__Header'>
          <Title>Новая подзадача</Title>
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
                placeholder='Укажите тему задачи'
                label='Тема'
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
                className='CustomSelect'
                inputValue={inputPerformer}
                onInputChange={setInputPerformer}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={performers}
                label='Исполнитель'
                isOptionDisabled={!inputPerformer.length}
                error={errors.performer && errors.performer.message}
              />
            )}
          />
          <Controller
            control={control}
            name='watchers'
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                inputValue={inputWatchers}
                onInputChange={setInputWatchers}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={performers}
                label='Участники'
                isOptionDisabled={!inputWatchers.length}
                isMulti={true}
              />
            )}
          />

          <Controller
            control={control}
            name='date'
            rules={dateValidation}
            render={({ field }) => (
              <>
                <div className={'Label'}>Выбор диапазона времени</div>
                <RangePicker
                  onChange={(e) => field.onChange(e)}
                  className={'CustomDatePicker'}
                  format={'DD.MM.YYYY HH:mm'}
                  showTime={{ format: 'HH:mm', minuteStep: 5 }}
                  superNextIcon={false}
                  superPrevIcon={false}
                  disabledDate={disabledDateRangePicker}
                  status={errors.date && 'error'}
                />
              </>
            )}
          />

          <div className='TextAreaWrapper'>
            <label className='Label'>Описание</label>
            <Controller
              control={control}
              name='description'
              rules={fullNameValidation}
              render={({ field }) => (
                <textarea
                  className={
                    errors.description ? 'InputField Error' : 'InputField'
                  }
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Обязательное поле'
                />
              )}
            />
          </div>

          {/*<div className='FileUpload'>
            <div className='FileUpload__Label'>
              <p className='Text'>Перетащите файлы или перейдите к</p>
              <button
                className='CustomButton'
                onClick={() => inputRef.current?.click()}
              >
                выбору файла
              </button>
            </div>

            <div className='FileUpload__Content'>
              <div
                className='Dropzone'
                // @ts-ignore
                onDragEnter={handleDragDropEvent}
                // @ts-ignore
                onDragOver={handleDragDropEvent}
                onDrop={(e) => {
                  // @ts-ignore
                  handleDragDropEvent(e);
                  // @ts-ignore
                  setFiles(e, 'a');
                }}
              >
                <input
                  ref={inputRef}
                  type='file'
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setFiles(e, 'a');
                    // @ts-ignore
                    inputRef.current.value = null;
                  }}
                />
                {fileNames.map((name) => (
                  <div key={v1()} className='UploadedFilesItem'>
                    <Icon type='TasksPaperclip' />
                    <span>{name}</span>
                    <Icon
                      className='CustomIconDelete'
                      type='DeleteUser'
                      onClick={() => removeFile(name)}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>*/}

          <div className='Buttons'>
            <Button type='submit'>Создать задачу</Button>

            <Button className='ButtonCancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
