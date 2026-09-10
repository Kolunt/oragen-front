import React from 'react';

import Dropzone from 'react-dropzone';

import './UploaderDropzone.scss';
import { Icon } from '../../Icon/Icon';
import { IUploaderConfig } from '../types';

export interface IUploaderDropzoneProps {
  config: IUploaderConfig;
  onDrop: (acceptedFiles: any) => void;
}

export const UploaderDropzone: React.FC<IUploaderDropzoneProps> = ({
  config,
  onDrop,
}) => {
  return (
    // @ts-ignore
    <Dropzone accept={config.accept.join(', ')} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
        let className = '';

        className = isDragActive ? 'active' : className;
        className = isDragReject ? 'reject' : className;

        return (
          <div className={`UploaderDropzone ${className}`} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='UploaderDropzone-Title'>
              <Icon className='Icon' type='Uploader' />
              <div>
                Перетащите файлы или перейдите к<span> выбору файла</span>
              </div>
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};
