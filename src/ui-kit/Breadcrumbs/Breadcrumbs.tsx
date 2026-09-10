import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { Icon } from 'ui-kit/Icon/Icon';
import './Breadcrumbs.scss';

export interface BreadcrumbsItem {
  title: string;
  callback?: () => void;
}

export interface IBreadcrumbs {
  className?: string;
  links: BreadcrumbsItem[];
}

export const Breadcrumbs: FC<IBreadcrumbs> = memo((props) => {
  const { className, links } = props;

  return (
    <div className={classNames('Breadcrumbs', className)}>
      <Icon className='CustomIcon' type='ArrowLeft' />
      {links.map((link, index) =>
        index === links.length - 1 ? (
          <div key={index}>
            <span className='Text Accent'>{link.title}</span>
          </div>
        ) : (
          <div key={index}>
            <span className='Text' onClick={link.callback}>
              {link.title}
            </span>
            <span>/</span>
          </div>
        )
      )}
    </div>
  );
});
