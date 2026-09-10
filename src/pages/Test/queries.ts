import { useQuery } from '@tanstack/react-query';
import { fetchOrganizations } from 'api';
import {
  IGetOrganizations,
  IOrganizationsPagination,
} from 'api/organizationApi';

export const useOrganizationsQuery = () => {
  const where = JSON.stringify({
    // organization_type: get().filtration.where.organization_type,
    organization_type: undefined,
  });

  const like = JSON.stringify({
    // name: get().searchName,
    name: '',
    // address: get().searchAddress,
    address: '',
  });

  const params: IGetOrganizations = {
    // order: get().sorting.order,
    order: 'name',
    // orderBy: get().sorting.orderBy,
    orderBy: 'asc',
    where,
    like,
  };

  const payload = {
    paginationMethod: 'full',
    // page: get().currentPage,
    page: 1,
    // pageSize: get().pageSize,
    pageSize: 10,
  };

  return useQuery({
    queryFn: () => fetchOrganizations(payload, params),
    queryKey: ['organizations', { payload, params }],
    staleTime: 1000 * 5,
  });
};
