import React, { FC, memo } from 'react';
import { ColumnHeader } from 'ui-kit';
import { OrganizationOrderType } from 'api/organizationApi';
import './ListOrganizationsSorting.scss';

interface IListOrganizationsSorting {
  changeOrderSort: (sortingOrder: OrganizationOrderType) => void;
  sortingOrder: string;
  sortingOrderBy: string;
}

export const ListOrganizationsSorting: FC<IListOrganizationsSorting> = memo(
  (props) => {
    const { changeOrderSort, sortingOrder, sortingOrderBy } = props;
    return (
      <ul className='ListOrganizationsSorting'>
        <li className='Item Item--Start'>
          <ColumnHeader
            title='Название компании'
            callBack={() => changeOrderSort('name')}
            isShowArrow={sortingOrder === 'name'}
            directionArrow={sortingOrderBy === 'desc'}
          />
        </li>
        <li className='Item'>
          <ColumnHeader
            title='Кол-во сотр-ов'
            callBack={() => changeOrderSort('number_of_employees')}
            isShowArrow={sortingOrder === 'number_of_employees'}
            directionArrow={sortingOrderBy === 'desc'}
          />
        </li>
        <li className='Item'>
          <ColumnHeader
            title='Тип'
            callBack={() => changeOrderSort('organization_type')}
            isShowArrow={sortingOrder === 'organization_type'}
            directionArrow={sortingOrderBy === 'desc'}
          />
        </li>
        <li className='Item'>
          <ColumnHeader
            title='Адрес'
            callBack={() => changeOrderSort('address')}
            isShowArrow={sortingOrder === 'address'}
            directionArrow={sortingOrderBy === 'desc'}
          />
        </li>
      </ul>
    );
  }
);
