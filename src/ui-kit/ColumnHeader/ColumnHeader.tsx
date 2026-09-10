import React, { FC } from 'react';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';
import './ColumnHeader.scss';

interface IColumnHeader {
  className?: string;
  title: string;
  callBack?: () => void;
  isShowArrow?: boolean;
  directionArrow?: boolean;
}

export const ColumnHeader: FC<IColumnHeader> = (props) => {
  const { className, callBack, title, isShowArrow, directionArrow } = props;

  const Arrow = directionArrow ? (
    <Icon type={'ArrowUpTable'} />
  ) : (
    <Icon type={'ArrowDownTable'} />
  );

  const style = isShowArrow
    ? 'ColumnHeader ColumnHeader--Active'
    : 'ColumnHeader';

  return (
    <div className={classNames(className, style)} onClick={callBack}>
      <span>{title}</span>
      {isShowArrow && Arrow}
    </div>
  );
};
