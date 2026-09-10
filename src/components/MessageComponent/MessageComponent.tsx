import React, { useEffect } from 'react';
import { message } from 'antd';
import { useMessageStore } from 'components';

export const MessageComponent = () => {
  const isOpen = useMessageStore((state) => state.isOpen);
  const setStatus = useMessageStore((state) => state.setStatus);
  const messageType = useMessageStore((state) => state.type);
  const text = useMessageStore((state) => state.content);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isOpen) {
      showMessage();
    }
  }, [isOpen]);

  const showMessage = () => {
    messageApi.open({
      type: messageType,
      content: text,
      duration: 10,
    });
    setStatus(false);
  };

  return <>{contextHolder}</>;
};
