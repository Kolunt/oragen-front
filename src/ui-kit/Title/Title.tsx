import React, { FC } from 'react';

import classNames from 'classnames';

export type TitleProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Title: FC<TitleProps> = (props) => {
  const { children, className } = props;

  return <h2 className={classNames('Title', className)}>{children}</h2>;
};
