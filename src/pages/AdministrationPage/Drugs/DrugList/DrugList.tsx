import React from 'react';
import { useDrugsStore } from 'store/useDrugsStore';
import { DrugListItem, DrugListSorting } from 'pages';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import './DrugList.scss';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';

export const DrugList = () => {
  const drugs = useDrugsStore((state) => state.drugs);
  const currentPage = useDrugsStore((state) => state.currentPage);
  const setCurrentPage = useDrugsStore((state) => state.setCurrentPage);
  const pageSize = useDrugsStore((state) => state.pageSize);
  const setPageSize = useDrugsStore((state) => state.setPageSize);
  const numberOfDrugs = useDrugsStore((state) => state.numberOfDrugs);

  return (
    <div className='DrugList flex-container relative'>
      <DrugListSorting />
      <ScrollBar>
        {drugs.map((drug) => (
          <DrugListItem key={drug.id} drug={drug} />
        ))}
      </ScrollBar>

      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfDrugs}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
