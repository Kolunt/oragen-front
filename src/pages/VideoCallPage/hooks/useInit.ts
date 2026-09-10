import { useEffect, useState } from 'react';

export const useInit = (server: string, room: number | undefined) => {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (room && server) {
      setInit(true);
    }
  }, [room, server]);

  return { init };
};
