import React, { FC } from 'react';
import { Icon, Tooltip } from '../../../ui-kit';
import { useNavigate } from 'react-router-dom';
import { IconType } from '../../../ui-kit/Icon/IconType';
import './SideMenuItem';

interface ISideMenuItem {
  isShowTitle: boolean;
  route: string;
  icon: IconType;
  tooltipTitle: string;
}

export const SideMenuItem: FC<ISideMenuItem> = (props) => {
  const { isShowTitle, route, icon, tooltipTitle } = props;
  const navigate = useNavigate();

  const renderTooltipContent = (title: string) => {
    return <span>{title}</span>;
  };

  return (
    <>
      {isShowTitle ? (
        <div className='IconWrapper'>
          <Icon type={icon} />
        </div>
      ) : (
        <div onClick={() => navigate(route)}>
          <Tooltip
            content={renderTooltipContent(tooltipTitle)}
            placement='right'
          >
            <div className='IconWrapper'>
              <Icon type={icon} />
            </div>
          </Tooltip>
        </div>
      )}
      {isShowTitle && <span className='Title'>{tooltipTitle}</span>}
    </>
  );
};
