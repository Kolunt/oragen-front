import { OrganizationTypes } from 'enums';
import { OrganizationType } from 'TypeInterface';

export const getOrganizationTypeById = (
  id: string | number
): OrganizationTypes | undefined => {
  if (id === '2') {
    return OrganizationTypes.MPI;
  } else if (id === '3') {
    return OrganizationTypes.PHARMACY;
  } else return undefined;
};

export const getIdByOrganizationType = (
  type: OrganizationType | undefined
): string | number => {
  if (type === OrganizationTypes.MPI) {
    return '2';
  } else if (type === OrganizationTypes.PHARMACY) {
    return '3';
  } else return '1';
};
