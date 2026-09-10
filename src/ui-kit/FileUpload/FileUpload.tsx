import React, { MouseEvent, useRef } from 'react';
import useFileUpload from 'react-use-file-upload';
import axios from 'axios';
import { Icon } from '../Icon/Icon';
import { v1 } from 'uuid';
import './FileUpload.scss';

export const FileUpload = () => {
  const {
    fileNames,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = createFormData();

    try {
      axios.post('https://some-api.com', formData, {
        // 'content-type': 'multipart/form-data',
      });
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };

  return (
    <div className='FileUpload'>
      <h4 className='FileUpload__Label'>Файлы</h4>

      <div className='FileUpload__Content'>
        {/* Provide a drop zone and an alternative button inside it to upload files. */}
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
          <p className='Text'>Перетащите файлы или перейдите к</p>
          <button
            className='CustomButton'
            onClick={() => inputRef.current?.click()}
          >
            выбору файла
          </button>

          {/* Hide the crappy looking default HTML input */}
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
        </div>
        {/* Display the files to be uploaded */}
        <ul className='UploadedFiles'>
          {fileNames.map((name) => (
            <li key={v1()} className='UploadedFilesItem'>
              <Icon className='CustomIconCheck' type='MediaCheck' />
              <span>{name}</span>
              <Icon
                className='CustomIconDelete'
                type='DeleteUser'
                onClick={() => removeFile(name)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className='FileUpload__ButtonActions'>
        {fileNames.length ? (
          <button className='ButtonClearAll' onClick={() => clearAllFiles()}>
            Удалить все файлы
          </button>
        ) : (
          ''
        )}
        {/*<div className="submit">*/}
        {/*    <button onClick={handleSubmit}>Submit</button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
