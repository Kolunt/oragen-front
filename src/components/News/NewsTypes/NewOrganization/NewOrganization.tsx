import React from 'react';

import './NewOrganization.scss';
import { useNavigate } from 'react-router-dom';

import { ModalCardContact } from 'components';
import { OrganizationTypes, ROUTES } from 'enums';
import { useModalsStore } from 'store/useModalsStore';
import { useOrganizationsStore } from 'store/useOrganizationsStore';
import { Icon } from 'ui-kit';
import dayjs from 'dayjs';

interface INewOrganization {
  organizationId: string;
}

export const NewOrganization = ({ organizationId }: INewOrganization) => {
  const navigate = useNavigate();
  const organization = useOrganizationsStore((state) =>
    state.organizations.find(({ id }) => id === organizationId)
  );
  const showModalCard = useModalsStore((state) => state.handleCardOrganization);
  const addNameOrganization = useModalsStore(
    (state) => state.handleCardOrganizationName
  );

  const handleClickModal = () => {
    addNameOrganization(organization?.name || '');
    showModalCard(true);
  };

  let organizationType = '';

  switch (organization?.organization_type) {
    case OrganizationTypes.MPI:
      organizationType = 'ЛПУ';
      break;
    case OrganizationTypes.PHARMACY:
      organizationType = 'Аптека';
      break;
  }
  // todo добавить ModalCardContact

  return (
    <div className='NewOrganization'>
      <div className='NewOrganization__Header'>
        <div className='Info'>
          <h4 className='Info__Name'>
            <div className='pr-5'>{organization?.name}</div>
            <span
              className='fw-400 pl-5'
              onClick={() => navigate(ROUTES.ORGANIZATIONS)}
            >
              Новая&nbsp;организация
            </span>
          </h4>
        </div>
        <div className='TimeWrapper'>
          <p className='Time'>
            {dayjs(organization?.created_at).locale('ru').fromNow()}
          </p>
        </div>
      </div>
      <ul className='InfoList'>
        <li className='InfoList__Item'>{organizationType}</li>
        <li className='InfoList__Item'>{organization?.address}</li>
      </ul>
      {/*<ModalCardContact />*/}
    </div>
  );
};
