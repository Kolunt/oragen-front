import React, { FC, useState } from 'react';
import AvatarImg from 'assets/svg/contacts/ContactsPerson.svg';
import { Avatar, Icon, ProgressCircle } from 'ui-kit';
import { changedFullName } from 'utils/changedFullName';
import { ProgressCircleType } from 'ui-kit/ProgressCircle/ProgressCircle';
import { useModalsStore } from 'store/useModalsStore';
import { IFakeTarget } from 'mockData/mockData';
import './KpiList.scss';

interface IKpiListProps {
  title?: string;
  type: ProgressCircleType;
  data: IFakeTarget[];
}

export const KpiList: FC<IKpiListProps> = (props) => {
  const { title, type, data } = props;
  const [isShowAll, setShowAll] = useState(false);
  const showModalCardContact = useModalsStore(
    (state) => state.handleCardContact
  );
  const addNameModalCardContact = useModalsStore(
    (state) => state.handleCardContactName
  );

  const promoData = data.slice(0, 4);
  const ostData = data.slice(4);

  const handleKpi = () => {
    setShowAll((prev) => !prev);
  };

  const handleClickModalContact = (name: string) => {
    addNameModalCardContact(name || '');
    showModalCardContact(true);
  };

  return (
    <div className='KpiList'>
      <div className='KpiList__Title'>{title}</div>
      <div className='KpiCardList'>
        {promoData.map((c) => {
          return (
            <div
              key={c.id}
              className='KpiCardList__Item'
              onClick={() => handleClickModalContact(c.fullName)}
            >
              <Avatar className='AvatarStyle' image={AvatarImg} />
              <span>{changedFullName(c.fullName)}</span>
              <div className='Statistic'>
                <ProgressCircle
                  type={type}
                  value={c.visitsPerformed}
                  maxValue={c.visitsPlanned}
                />
              </div>
            </div>
          );
        })}

        {isShowAll && (
          <>
            {ostData.map((c) => {
              return (
                <div
                  key={c.id}
                  className='KpiCardList__Item'
                  onClick={() => handleClickModalContact(c.fullName)}
                >
                  <Avatar className='AvatarStyle' image={AvatarImg} />
                  <span>{changedFullName(c.fullName)}</span>
                  <div className='Statistic'>
                    <ProgressCircle
                      type={type}
                      value={c.visitsPerformed}
                      maxValue={c.visitsPlanned}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className='KpiCardList__ShowAll' onClick={handleKpi}>
        {isShowAll ? (
          <>
            <span>Свернуть</span>
            <Icon className='ArrowTop' type='ArrowTop' />
          </>
        ) : (
          <>
            <span>Открыть все</span>
            <Icon className='ArrowDown' type='ArrowDown' />
          </>
        )}
      </div>
    </div>
  );
};
