import React, { useEffect } from 'react';
import { ListTargetsSorting } from './ListTargetsSorting';
import { useTargetsStore } from 'store/useTargetsStore';
import { ListItemTargets } from './ListItemTargets';
import { Button } from 'ui-kit';
import { ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListTargets.scss';

export const ListTargets = () => {
  const targets = useTargetsStore((state) => state.targets);
  const getTargets = useTargetsStore((state) => state.getTargets);
  const sorting = useTargetsStore((state) => state.sorting);
  const currentPage = useTargetsStore((state) => state.currentPage);
  const setCurrentPage = useTargetsStore((state) => state.setCurrentPage);
  const pageSize = useTargetsStore((state) => state.pageSize);
  const setPageSize = useTargetsStore((state) => state.setPageSize);
  const numberOfTargets = useTargetsStore((state) => state.numberOfTargets);
  const navigate = useNavigate();

  useEffect(() => {
    getTargets();
  }, [sorting.order, sorting.orderBy, currentPage, pageSize]);

  return (
    <div className='ListTargets flex-container'>
      <ListTargetsSorting />
      <ScrollBar>
        {targets.map((target) => (
          <ListItemTargets key={target.id} target={target} />
        ))}
      </ScrollBar>
      <Button onClick={() => navigate(ROUTES.NEW_TARGET)}>
        Добавить таргет
      </Button>
      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfTargets}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
