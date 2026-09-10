import React from 'react';
import { ColumnHeader } from 'ui-kit';
import './SortingTasks.scss';
import { TasksOrderType } from 'api/tasksApi';
import { getSortDirection } from 'utils';
import { useTasksStore } from 'store/useTasksStore';

export const SortingTasks = () => {
  const sorting = useTasksStore((state) => state.sorting);
  const setSorting = useTasksStore((state) => state.setSorting);

  const changeOrderSort = (value: TasksOrderType) => {
    if (sorting.order === value) {
      setSorting({ order: value, orderBy: getSortDirection(sorting.orderBy) });
    } else {
      setSorting({ order: value, orderBy: sorting.orderBy });
    }
  };

  return (
    <div className='SortingTasks'>
      <div className='SortingTasks__Item'>
        <ColumnHeader
          title='Название / Тип'
          callBack={() => changeOrderSort('name')}
          isShowArrow={sorting.order === 'name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingTasks__Item'>
        <ColumnHeader
          title='Статус'
          // callBack={() => changeOrderSort('status')}
          // isShowArrow={sorting.order === 'status'}
          // directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingTasks__Item'>
        <ColumnHeader
          title='Начать с'
          callBack={() => changeOrderSort('started_at')}
          isShowArrow={sorting.order === 'started_at'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingTasks__Item'>
        <ColumnHeader
          title='Сделать до'
          callBack={() => changeOrderSort('finished_at')}
          isShowArrow={sorting.order === 'finished_at'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingTasks__Item'>
        <ColumnHeader
          title='Автор'
          callBack={() => changeOrderSort('creator')}
          isShowArrow={sorting.order === 'creator'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>

      <div className='SortingTasks__Item'>
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
