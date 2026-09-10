import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { useMediaInfoStore } from 'pages/MediaPage/MediaInfo';
import './UploadFileToS3.scss';

const S3_BUCKET = 'oragen-dev';
// const REGION = 'ru-central1';
const REGION = process.env.REACT_APP_S3_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  endpoint: 'https://storage.yandexcloud.net',
  region: REGION,
});

export const UploadFileToS3 = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File>({} as File);
  const titleKey = useMediaInfoStore((state) => state.titleKey);
  const getFiles = useMediaInfoStore((state) => state.getFiles);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
      setSelectedFile({} as File);
    }
  }, [progress]);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file: any) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${titleKey}${file.name}`,
      ContentType: file.type,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
        else getFiles();
      });
  };
  return (
    <div className='UploadFileToS3'>
      <label className='input-file'>
        <input type='file' name='file' onChange={handleFileInput} />
        <span>{selectedFile?.name ?? 'Выберите файл'}</span>
      </label>
      <button
        className='btn'
        onClick={() => uploadFile(selectedFile)}
        disabled={!selectedFile.name || progress !== 0}
      >
        Загрузить
      </button>
      <span>{progress}%</span>
    </div>
  );
};
