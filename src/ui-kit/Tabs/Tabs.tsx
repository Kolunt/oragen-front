import React, { memo } from 'react';

import classNames from 'classnames';
import './Tabs.scss';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconType';

export interface ITab {
  id: string | number;
  label?: string | number;
  icon?: string;
}

export interface ITabsProps {
  className?: string;
  selectedId: string | number;
  tabs: ITab[];
  onClick: (id: string | number) => void;
}

export const Tabs: React.FC<ITabsProps> = memo((props) => {
  const { className, selectedId, tabs, onClick } = props;
  return (
    <div className={classNames('Tabs', className)}>
      {tabs &&
        tabs.map((tab) => (
          <div
            className={classNames('Tab', {
              Tab__selected: tab.id === selectedId,
            })}
            key={tab.id}
            onClick={() => onClick(tab.id)}
          >
            <div
              className={classNames('TabLabel', {
                TabLabel__selected: tab.id === selectedId,
              })}
            >
              {tab.icon && (
                <Icon className='CustomIcon' type={tab.icon as IconType} />
              )}
              {tab.label}
            </div>
          </div>
        ))}
    </div>
  );
});
