import React, { FC, ReactNode } from 'react';
import { Heading, SideMenu } from 'components';
import './Layout.scss';

interface ILayoutProps {
  children?: ReactNode;
  showSideMenu?: boolean;
}

export const Layout: FC<ILayoutProps> = (props) => {
  const { children, showSideMenu = true } = props;

  return (
    <div className='Layout'>
      <Heading />
      <div className='Layout-Main hidden'>
        {showSideMenu && <SideMenu />}
        <div className='Layout-Container flex-container'>{children}</div>
      </div>
    </div>
  );
};
