import React, { FC, memo, MouseEvent } from 'react';
import { Avatar, Icon } from 'ui-kit';
import MedicalCross from 'assets/svg/organizationsPage/OrganizationsCase.svg';
import {
  IOrganization,
  useOrganizationsStore,
} from 'store/useOrganizationsStore';
import { OrganizationTypes } from 'enums';
import { useModalsStore } from 'store/useModalsStore';
import { useNavigate } from 'react-router-dom';
import './ListItemOrganization.scss';
import { usePharmacyInfoStore } from 'pages/OrganizationsPage/PharmacyInfo/usePharmacyInfoStore';

interface IListItemOrganization {
  organization: IOrganization;
  handleClickModalOrg: (name: string) => void;
}

export const ListItemOrganization: FC<IListItemOrganization> = memo((props) => {
  const {
    organization: { id, name, organization_type, address, number_of_employees },
    handleClickModalOrg,
  } = props;
  const showModal = useModalsStore(
    (state) => state.handleApplicationOrganization
  );
  const setId = useOrganizationsStore(
    (state) => state.setMonitoredOrganizationId
  );
  const type = organization_type === OrganizationTypes.MPI ? 'ЛПУ' : 'Аптека';

  const onShowModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setId(+id);
    showModal(true);
  };

  return (
    <div className='ListItemOrganization'>
      <div
        className='Cell Cell--Start'
        onClick={() => handleClickModalOrg(name)}
      >
        <Avatar className='Avatar' image={MedicalCross} />
        <h3>{name}</h3>
      </div>

      <div className='Cell'>{number_of_employees}</div>

      <div className='Cell'>{type}</div>

      <div className='Cell'>{address}</div>

      <div className='Cell' onClick={onShowModal}>
        <Icon className='CustomIcon' type={'VisitsChangeTableData'} />
      </div>
    </div>
  );
});
