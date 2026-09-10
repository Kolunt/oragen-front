import React from 'react';
import { Modal, Title } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useVisitsStore } from 'store/useVisitsStore';
import dayjs from 'dayjs';
import { DateFormats } from 'enums';
import './ModalComment.scss';

export const ModalComment = () => {
  const isShowModal = useModalsStore((state) => state.isComment);
  const changeShowModal = useModalsStore((state) => state.handleComment);
  const comments = useVisitsStore((state) => state.comments);

  return (
    <Modal
      visibility={isShowModal}
      changeVisibility={changeShowModal}
      isIcon={true}
    >
      <div className='ModalComment'>
        <Title className='mb-20 text-center'>Комментарии</Title>
        {comments.map((item) => (
          <div key={item.id} className='Comment'>
            <p className='mb-10 flex gap-x-10 items-center'>
              <span className='Comment__Author'>{item.creator.name}</span>
              <span className='Comment__Date'>
                {dayjs(item.updated_at).format(DateFormats.FULL_DATE_FORMAT)}
              </span>
            </p>
            <p className='Comment__Text'>{item.comment}</p>
          </div>
        ))}
        {!comments.length && <Title>Комментариев нет!</Title>}
      </div>
    </Modal>
  );
};
