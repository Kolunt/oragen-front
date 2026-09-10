import React, { FC, memo } from 'react';
import { IBrick } from 'api/brickApi';
import { useNavigate } from 'react-router-dom';
import { URL_NAME } from 'enums';
import { getBrickTypeByLevel } from 'utils';
import '../BrickList.scss';

interface IListItem {
  brick: IBrick;
}

export const ListItemBricks: FC<IListItem> = memo((props) => {
  const {
    brick: { name, owner, id, type },
  } = props;
  const navigate = useNavigate();

  return (
    <div
      className='list pb-12 pt-12 pr-20 pl-20 bg-white-l1 br-10 mb-5 pointer'
      onClick={() => navigate(`/${URL_NAME.BRICK_INFO}/${id}`)}
    >
      <div className='flex items-center  color-secondary-l2 fw-600 color-black-l2'>
        {name}
      </div>
      <div className='flex items-center justify-center color-secondary-l2'>
        {getBrickTypeByLevel(type)}
      </div>
      <div className='flex items-center justify-center color-secondary-l2'>
        {owner.name}
      </div>
    </div>
  );
});
