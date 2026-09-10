import React, { FC } from 'react';
import dayjs from 'dayjs';
import { DateFormats } from 'enums';
import { INew } from 'api/newsApi';

interface INewsItem {
  news: INew;
}

export const NewsItem: FC<INewsItem> = ({ news }) => {
  return (
    <div className='newItem'>
      <div className='flex items-center separator-bottom'>
        <div className='icon'>{/*<Icon type='Tasks' />*/}</div>
        <div>
          <div className='flex items-center'>
            <div className='TypeName'>Новость</div>
            <span className=''>
              от {dayjs(news?.created_at).format(DateFormats.APP_DATE_FORMAT)}
            </span>
          </div>
          <div className='color-tertiary-l3'>
            создана {dayjs(news?.created_at).locale('ru').fromNow()}
          </div>
        </div>
      </div>
      <div>
        <span className='color-tertiary-l3'>создал</span>
        <span className='pl-5'>{news.creator.last_name}</span>
        <span className='pl-5'>{news.creator.name}</span>
        <span className='pl-5'>{news.creator.middle_name}</span>
      </div>
      <div className='fw-600'>{news?.title}</div>
      <div className=''>{news?.text}</div>
    </div>
  );
};
