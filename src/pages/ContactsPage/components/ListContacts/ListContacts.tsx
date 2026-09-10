import React, { FC } from 'react';
import { useContactsStore } from 'store/useContactsStore';
import { useModalsStore } from 'store/useModalsStore';
import { ContactOrderType } from 'api/contactApi';
import { getSortDirection } from 'utils/getSortDirection';
import { ListContactsSorting } from 'pages/ContactsPage/components/ListContacts/ListContactsSorting';
import { ListItemContacts } from 'pages/ContactsPage/components/ListContacts/ListItemContacts';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListContacts.scss';

interface IListContacts {}

export const ListContacts: FC<IListContacts> = () => {
  const contacts = useContactsStore((state) => state.contacts);
  const currentPage = useContactsStore((state) => state.currentPage);
  const showModalCardContact = useModalsStore(
    (state) => state.handleCardContact
  );
  const addNameModalCardContact = useModalsStore(
    (state) => state.handleCardContactName
  );
  const sorting = useContactsStore((state) => state.sorting);
  const setSorting = useContactsStore((state) => state.setSorting);
  const setCurrentPage = useContactsStore((state) => state.setCurrentPage);
  const setPageSize = useContactsStore((state) => state.setPageSize);
  const pageSize = useContactsStore((state) => state.pageSize);
  const numberOfContacts = useContactsStore((state) => state.numberOfContacts);

  const handleClickModalContact = (name: string) => {
    addNameModalCardContact(name || '');
    showModalCardContact(true);
  };

  const changeOrderSort = (value: ContactOrderType) => {
    if (sorting.order === value) {
      setSorting({ order: value, orderBy: getSortDirection(sorting.orderBy) });
    } else {
      setSorting({ order: value, orderBy: sorting.orderBy });
    }
  };

  return (
    <div className='ListContacts flex-container relative'>
      <ListContactsSorting
        changeOrderSort={changeOrderSort}
        sortingOrder={sorting.order}
        sortingOrderBy={sorting.orderBy}
      />
      <ScrollBar>
        {contacts.map((contact) => {
          return (
            <ListItemContacts
              key={contact.id}
              contact={contact}
              handleClickModalContact={handleClickModalContact}
            />
          );
        })}
      </ScrollBar>
      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfContacts}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
