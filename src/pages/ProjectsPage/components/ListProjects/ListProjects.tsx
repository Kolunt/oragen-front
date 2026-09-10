import React from 'react';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { useProjectsStore } from 'store/useProjectsStore';
import { SortingProjects } from './SortingProjects';
import { ListItemProject } from './ListItemProject';
import './ListProjects.scss';
import { ScrollBar } from '../../../../ui-kit/ScrollBar/ScrollBar';

export const ListProjects = () => {
  const projects = useProjectsStore((state) => state.projects);
  const setCurrentPage = useProjectsStore((state) => state.setCurrentPage);
  const pageSize = useProjectsStore((state) => state.pageSize);
  const setPageSize = useProjectsStore((state) => state.setPageSize);
  const currentPage = useProjectsStore((state) => state.currentPage);
  const numberOfProjects = useProjectsStore((state) => state.numberOfProjects);

  return (
    <div className='ListProjects flex-container relative hidden'>
      <SortingProjects />
      <ScrollBar>
        <div className='List'>
          {projects.map((project) => (
            <ListItemProject key={project.id} project={project} />
          ))}
        </div>
      </ScrollBar>
      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfProjects}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
