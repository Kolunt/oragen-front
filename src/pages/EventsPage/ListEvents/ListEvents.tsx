import React from 'react';
import { useEventsStore } from 'store/useEventsStore';
import { ListItemEvents } from './ListItemEvents';
import { ListEventsSorting } from './ListEventsSorting';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { PaginationFull } from 'components';
import './ListEvents.scss';

export const ListEvents = () => {
  const events = useEventsStore((state) => state.events);
  const setCurrentPage = useEventsStore((state) => state.setCurrentPage);
  const currentPage = useEventsStore((state) => state.currentPage);
  const setPageSize = useEventsStore((state) => state.setPageSize);
  const pageSize = useEventsStore((state) => state.pageSize);
  const numberOfEvents = useEventsStore((state) => state.numberOfEvents);
  return (
    <div className='ListEvents flex-container relative'>
      <ListEventsSorting />
      <ScrollBar>
        {events.map((event) => (
          <ListItemEvents key={event.id} event={event} />
        ))}
      </ScrollBar>
      <PaginationFull
        className='mt-20'
        currentPage={currentPage}
        numberOfElements={numberOfEvents}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
