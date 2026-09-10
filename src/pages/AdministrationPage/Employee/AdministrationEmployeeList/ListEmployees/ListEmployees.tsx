import React from 'react';
import { ListItemEmployees } from '../ListItemEmployees/ListItemEmployees';
import { useModalsStore } from 'store/useModalsStore';
import ListEmployeesSorting from '../ListEmployeesSorting/ListEmployeesSorting';
import { useUserStore } from 'store/useUserStore';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import './ListEmployees.scss';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';

export const ListEmployees = () => {
  const showModalCardContact = useModalsStore(
    (state) => state.handleCardContact
  );
  const addNameModalCardContact = useModalsStore(
    (state) => state.handleCardContactName
  );
  const users = useUserStore((state) => state.users);
  const currentPage = useUserStore((state) => state.currentPage);
  const setCurrentPage = useUserStore((state) => state.setCurrentPage);
  const pageSize = useUserStore((state) => state.pageSize);
  const setPageSize = useUserStore((state) => state.setPageSize);
  const numberOfUsers = useUserStore((state) => state.numberOfUsers);

  const handleClickModalContact = (name: string) => {
    addNameModalCardContact(name || '');
    showModalCardContact(true);
  };

  return (
    <div className='ListEmployees pt-22 pb-22 pl-36 pr-36 bg-background-l8 br-10 flex-container relative'>
      <ListEmployeesSorting />
      <ScrollBar>
        {users.map((employee) => (
          <ListItemEmployees
            key={employee.id}
            employee={employee}
            handleClickModalContact={handleClickModalContact}
          />
        ))}
      </ScrollBar>
      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfUsers}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
