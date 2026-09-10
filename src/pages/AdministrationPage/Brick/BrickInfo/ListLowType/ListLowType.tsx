import React, { FC, memo } from 'react';
import { IOrganization } from 'store/useOrganizationsStore';
import { Avatar, Icon, ScrollBar } from 'ui-kit';
import MedicalCross from 'assets/svg/organizationsPage/OrganizationsCase.svg';
import { OrganizationTypes } from 'enums';
import { useBrickStore } from 'store/useBrickStore';
import './ListLowType.scss';

interface IListLowType {
  organizations: IOrganization[];
}

export const ListLowType: FC<IListLowType> = memo((props) => {
  const { organizations } = props;
  const removeBlockSource = useBrickStore((state) => state.removeBlockSource);
  const monitoredBlock = useBrickStore((state) => state.monitoredBlock);

  const onRemoveBlockSource = (id: number) => {
    removeBlockSource(monitoredBlock.id, id);
  };

  return (
    <div className='ListLowType hidden flex-container'>
      <ul className='ListSorting'>
        <li className='text-left'>Название компании</li>
        <li>Кол-во сотр-ов </li>
        <li>Тип</li>
        <li>Адрес</li>
      </ul>
      <div className='relative flex-container hidden'>
        <ScrollBar>
          {organizations.map((organization) => {
            const type =
              organization.organization_type === OrganizationTypes.MPI
                ? 'ЛПУ'
                : 'Аптека';

            return (
              <div className='ListItem' key={organization.id}>
                <div className='Cell Cell--Start'>
                  <Avatar className='Avatar' image={MedicalCross} />
                  <h3>{organization.name}</h3>
                </div>

                <div className='Cell'>{organization.number_of_employees}</div>

                <div className='Cell'>{type}</div>

                <div className='Cell'>{organization.address}</div>

                <div className='Cell'>
                  <Icon
                    className='CustomIcon'
                    type={'VisitsDeleteTableData'}
                    onClick={() => onRemoveBlockSource(+organization.id)}
                  />
                </div>
              </div>
            );
          })}
        </ScrollBar>
      </div>
    </div>
  );
});
