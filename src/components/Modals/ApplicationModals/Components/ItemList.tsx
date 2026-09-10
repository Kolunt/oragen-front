import React, { FC } from 'react';
import { Icon } from 'ui-kit';
import 'pages/ApplicationsPage/ListApplications/Application/Application.scss';
import { OrganizationTypes } from 'enums';

interface IItemLIst {
  label: string;
  value: string | number;
  oldValue?: string | number;
  id: string;
}

export const ItemList: FC<IItemLIst> = (props) => {
  const { label, value, oldValue, id } = props;
  return (
    <div className='Row'>
      <div className='Row__Title'>{label}</div>
      <div className='Row__Inner'>
        {oldValue && (
          <>
            <span className='Row__Span'>
              {id === 'organization_type'
                ? oldValue === OrganizationTypes.MPI
                  ? 'ЛПУ'
                  : 'Аптека'
                : oldValue}
            </span>
            <div className='Arrow'>
              <Icon type='ArrowRight' />
            </div>
          </>
        )}
        <span className='Row__Span'>
          {id === 'organization_type'
            ? value === OrganizationTypes.MPI
              ? 'ЛПУ'
              : 'Аптека'
            : value}
        </span>
      </div>
    </div>
  );
};
