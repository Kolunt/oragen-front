import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'ui-kit';
import {
  IVisitDescriptionCard,
  visitDescriptionCards,
} from 'mockData/mockData';
import dayjs from 'dayjs';
import './VisitDescriptionCard.scss';

export const VisitDescriptionCard = () => {
  const visits = visitDescriptionCards;
  const [counter, setCounter] = useState<number>(visits.length - 1);
  const [visit, setVisit] = useState<IVisitDescriptionCard>(
    visits[visits.length - 1]
  );

  useEffect(() => {
    setVisit(visits[counter]);
  }, [counter]);

  const nextVisit = () => {
    if (counter < visits.length - 1) {
      setCounter((prev) => prev + 1);
    } else {
      setCounter(0);
    }
  };

  const prevVisit = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    } else {
      setCounter(visits.length - 1);
    }
  };

  return (
    <div className='VisitDescription'>
      <div className='VisitDescription__Nav'>
        <Icon type='ArrowLeft' onClick={prevVisit} />
        <h3 className='Title'>Визит №{visit.number}</h3>
        <Icon type='ArrowRight' onClick={nextVisit} />
      </div>

      <div className='VisitDescription__Docs'>
        <div className='Document'>
          <Icon type='VisitInfoDocument' />
          <span>Прикрепленный документ</span>
        </div>

        <div className='Document'>
          <Icon type='VisitInfoImage' />
          <span>Прикрепленный документ</span>
        </div>
      </div>

      <div className='VisitDescription__Date'>
        <span>Дата:</span> {dayjs(visit.date).format('DD.MM.YYYY')}
      </div>

      <p className='VisitDescription__Comment'>{visit.title}</p>

      <div className='VisitDescription__Button'>
        <Button>Открыть карточку визита</Button>
      </div>
    </div>
  );
};
