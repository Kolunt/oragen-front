import React from 'react';
import { ColumnHeader } from 'ui-kit';
import { TasksOrderType } from 'api/tasksApi';
import { getSortDirection } from 'utils';
import { useProjectsStore } from 'store/useProjectsStore';
import './SortingProjects.scss';

export const SortingProjects = () => {
  const sorting = useProjectsStore((state) => state.sorting);
  const setSorting = useProjectsStore((state) => state.setSorting);

  const changeOrderSort = (value: TasksOrderType) => {
    if (sorting.order === value) {
      setSorting({ order: value, orderBy: getSortDirection(sorting.orderBy) });
    } else {
      setSorting({ order: value, orderBy: sorting.orderBy });
    }
  };

  return (
    <div className='SortingProjects'>
      <div className='SortingProjects__Item'>
        <ColumnHeader
          title='Название / Тип'
          callBack={() => changeOrderSort('name')}
          isShowArrow={sorting.order === 'name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingProjects__Item'>
        <ColumnHeader
          title='Автор'
          callBack={() => changeOrderSort('creator')}
          isShowArrow={sorting.order === 'creator'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingProjects__Item'>
        <ColumnHeader
          title='Дата создания'
          callBack={() => changeOrderSort('created_at')}
          isShowArrow={sorting.order === 'created_at'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
    </div>
  );
};
