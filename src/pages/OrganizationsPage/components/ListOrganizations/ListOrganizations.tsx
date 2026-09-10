import React, { FC } from 'react';
import { useOrganizationsStore } from 'store/useOrganizationsStore';
import { useModalsStore } from 'store/useModalsStore';
import { OrganizationOrderType } from 'api/organizationApi';
import { getSortDirection } from 'utils/getSortDirection';
import { ListItemOrganization } from 'pages/OrganizationsPage/components/ListOrganizations/ListItemOrganization';
import { ListOrganizationsSorting } from 'pages/OrganizationsPage/components/ListOrganizations/ListOrganizationsSorting';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListOrganizations.scss';

interface IListOrganizations {}

export const ListOrganizations: FC<IListOrganizations> = () => {
  const organizations = useOrganizationsStore((state) => state.organizations);
  const currentPage = useOrganizationsStore((state) => state.currentPage);
  const sorting = useOrganizationsStore((state) => state.sorting);
  const setSorting = useOrganizationsStore((state) => state.setSorting);
  const showModalCardOrganization = useModalsStore(
    (state) => state.handleCardOrganization
  );
  const addNameModalCardOrganization = useModalsStore(
    (state) => state.handleCardOrganizationName
  );
  const setCurrentPage = useOrganizationsStore((state) => state.setCurrentPage);
  const setPageSize = useOrganizationsStore((state) => state.setPageSize);
  const pageSize = useOrganizationsStore((state) => state.pageSize);
  const numberOfOrganizations = useOrganizationsStore(
    (state) => state.numberOfOrganizations
  );

  const handleClickModalOrg = (name: string) => {
    addNameModalCardOrganization(name || '');
    showModalCardOrganization(true);
  };

  const changeOrderSort = (value: OrganizationOrderType) => {
    if (sorting.order === value) {
      setSorting({ order: value, orderBy: getSortDirection(sorting.orderBy) });
    } else {
      setSorting({ order: value, orderBy: sorting.orderBy });
    }
  };

  return (
    <div className='ListOrganizations flex-container relative'>
      <ListOrganizationsSorting
        changeOrderSort={changeOrderSort}
        sortingOrder={sorting.order}
        sortingOrderBy={sorting.orderBy}
      />
      <ScrollBar>
        {organizations.map((organization) => {
          return (
            <ListItemOrganization
              key={organization.id}
              organization={organization}
              handleClickModalOrg={handleClickModalOrg}
            />
          );
        })}
      </ScrollBar>
      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfOrganizations}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
