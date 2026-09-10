import React, { FC, memo, useRef, useState } from 'react';
import { Icon, InputForm, TextArea } from 'ui-kit';
import { v1 } from 'uuid';
import useFileUpload from 'react-use-file-upload';
import { CustomField } from 'pages/index';
import {
  INewTargetReportSection,
  useNewTargetReportStore,
} from 'store/useNewTargetReportStore';
import './CustomSection.scss';

interface ICustomSection {
  section: INewTargetReportSection;
}

export const CustomSection: FC<ICustomSection> = memo((props) => {
  const {
    section: { id, type, fields },
  } = props;
  // const addField = useNewTargetReportStore((state) => state.addField);
  // const removeSection = useNewTargetReportStore((state) => state.removeSection);
  // const removeField = useNewTargetReportStore((state) => state.removeField);
  // const setModeAddSection = useNewTargetReportStore(
  //   (state) => state.setModeAddSection
  // );
  const [title, setTitle] = useState<string>('');
  /*  const { fileNames, handleDragDropEvent, setFiles, removeFile } =
    useFileUpload();
  const inputRef = useRef<HTMLInputElement | null>(null);*/

  const onRemoveField = (idField: string) => {
    // removeField(id, idField);
  };

  const onRemoveSection = (id: string) => {
    // removeSection(id);
    // setModeAddSection(true);
  };

  const onAddField = () => {
    const newField = { id: v1(), type, title: '', isSelected: false };
    // addField(id, newField);
  };

  /*  let inputTitle = '';
  if (type === 'checkbox') inputTitle = 'чек-бокс';
  if (type === 'radio') inputTitle = 'радио-баттон';
  if (type === 'field') inputTitle = 'кастомное поле';*/

  /*if (type === 'file') {
    return (
      <div className='CustomSection'>
        <div className='FileUpload'>
          <div className='FileUpload__Label'>
            <p className='Text'>Перетащите файлы или перейдите к</p>
            <button
              className='ResetButtonStyle'
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
            <div className='IconWrapper'>
              <Icon
                type={'VisitsDeleteTableData'}
                onClick={() => removeSection(id)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }*/

  /*  if (type === 'field') {
    return (
      <div className='CustomSection'>
        <div className='Row'>
          <div className='TextAreaWrapper'>
            {/!*<textarea className='InputField' />*!/}
            <TextArea
                className='CustomTextArea'
                label='Вопрос'
            />
          </div>
          <div className='IconWrapper'>
            <Icon
              className='mt-15'
              type={'VisitsDeleteTableData'}
              onClick={() => removeSection(id)}
            />
          </div>
        </div>
      </div>
    );
  }*/

  if (type === 'field') {
    return (
      <div className='CustomSection'>
        <div className='CustomSection__Header'>
          <InputForm
            className='CustomInput'
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            label='Вопрос'
            placeholder='Укажите название вопроса'
          />
          <div className='IconWrapper'>
            <Icon
              className='CustomIcon'
              type={'VisitsDeleteTableData'}
              onClick={() => onRemoveSection(id)}
            />
          </div>
        </div>
        <TextArea className='mb-10' />
      </div>
    );
  }

  return (
    <div className='CustomSection'>
      <div className='CustomSection__Header'>
        <InputForm
          className='CustomInput'
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          label='Вопрос'
          placeholder='Укажите название вопроса и нажмите на иконку добавить'
        />
        <div className='IconWrapper'>
          <Icon
            className='CustomIcon'
            type={'VisitsDeleteTableData'}
            onClick={() => onRemoveSection(id)}
          />
        </div>
      </div>

      {fields.map((field) => (
        <CustomField key={field.id} field={field} removeField={onRemoveField} />
      ))}
      <div className='AddItem'>
        <Icon
          className='CustomIcon'
          type='TasksAddSquare'
          onClick={() => onAddField()}
        />
        <span className='Title'>Добавить вариант ответа</span>
      </div>
    </div>
  );
});
