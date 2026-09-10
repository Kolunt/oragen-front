import {
  IContactApplication,
  IOrganizationApplication,
} from 'store/useApplicationsStore';

interface IFieldMap {
  label: string;
  key: keyof IContactApplication | keyof IOrganizationApplication;
  // key: keyof ApplicationType
}

export const fieldMapContact: IFieldMap[] = [
  {
    label: 'ФИО',
    key: 'full_name',
  },
  {
    label: 'Место работы',
    key: 'company',
  },
  {
    label: 'Тип',
    key: 'organization_type',
  },
  {
    label: 'Специальность',
    key: 'position',
  },
  {
    label: 'Номер телефона',
    key: 'phone',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Адрес',
    key: 'address',
  },
];

export const fieldMapOrganization: IFieldMap[] = [
  {
    label: 'Название',
    key: 'name',
  },
  {
    label: 'Тип',
    key: 'organization_type',
  },
  {
    label: 'Количество сотрудников',
    key: 'number_of_employees',
  },
  {
    label: 'Адрес',
    key: 'address',
  },
  {
    label: 'Номер телефона',
    key: 'phone',
  },
];
