import React, { useState, useEffect, FC } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { IUploaderConfig } from './types';

import { UploaderDropzone } from 'ui-kit';

interface IUploaderProps {
  config?: IUploaderConfig;
  onFilesUploadedAll?: (handleFilesAllAdd: File[]) => void;
  className?: string;
}

export const Uploader: FC<IUploaderProps> = (props) => {
  const { config, onFilesUploadedAll, className } = props;

  const UPLOADER_CONFIG_DEFAULT: IUploaderConfig = {
    accept: [],
  };
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    if (!isEmpty(files)) {
      const newFiles = [...files, ...acceptedFiles];

      setFiles(newFiles);
    } else {
      const newFiles = [...acceptedFiles];

      setFiles(newFiles);
    }
  };

  const handleFilesAllAdd = (files: File[]) => {
    return files;
  };

  useEffect(() => {
    if (onFilesUploadedAll) onFilesUploadedAll(handleFilesAllAdd(files));
  }, [files]);

  return (
    <div className={classNames('Uploader', className)}>
      {!isNil(config) ? (
        <UploaderDropzone config={config} onDrop={handleDrop} />
      ) : (
        <UploaderDropzone
          config={UPLOADER_CONFIG_DEFAULT}
          onDrop={handleDrop}
        />
      )}
    </div>
  );
};
