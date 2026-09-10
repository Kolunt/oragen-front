import React from 'react';
import { useTasksStore } from 'store/useTasksStore';
import { ListItemTask } from './ListItemTask';
import { SortingTasks } from './SortingTasks';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import './ListTasks.scss';
import { ScrollBar } from '../../../../ui-kit/ScrollBar/ScrollBar';

export const ListTasks = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const setCurrentPage = useTasksStore((state) => state.setCurrentPage);
  const pageSize = useTasksStore((state) => state.pageSize);
  const setPageSize = useTasksStore((state) => state.setPageSize);
  const currentPage = useTasksStore((state) => state.currentPage);
  const numberOfTasks = useTasksStore((state) => state.numberOfTasks);

  return (
    <div className='ListTasks flex-container relative hidden'>
      <SortingTasks />
      <ScrollBar>
        <div className='List'>
          {tasks.map((task) => (
            <ListItemTask key={task.id} task={task} />
          ))}
        </div>
      </ScrollBar>

      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfTasks}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
