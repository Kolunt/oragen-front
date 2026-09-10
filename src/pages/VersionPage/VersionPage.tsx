import React, { useEffect, useState } from 'react';
import { authServiceClient } from '../../config/authServiceClient';
import { AxiosResponse } from 'axios';

interface IVersionResponse {
  version: string;
}

export const VersionPage = () => {
  const [versionDev, setVersionDev] = useState<string>('');
  const fetchAuth = async () => {
    //@ts-ignore
    const { data } = await authServiceClient.post<
      AxiosResponse<IVersionResponse>,
      IVersionResponse
    >('', { type: 'version' });
    setVersionDev(data.version);
  };

  useEffect(() => {
    fetchAuth();
  }, []);
  return (
    <div className='p-20'>
      <div>version:</div>
      <div>api: {versionDev}</div>
      {/*<div>app: v0.2.1-prod</div>*/}
    </div>
  );
};
