import React, { FC, useState } from 'react';
import { Application } from './Application/Application';
import { v1 } from 'uuid';
import {
  ApplicationType,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { ProposalType } from '../ApplicationsPage';
import { PaginationFull } from 'components/PaginationFull';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListApplications.scss';
import { Button } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { IconButtonAdd } from 'ui-kit/Button/IconButtonAdd/IconButtonAdd';

interface IListApplications {
  applications: ApplicationType[];
}

export const ListApplications: FC<IListApplications> = (props) => {
  const { applications } = props;
  const currentPage = useApplicationsStore((state) => state.currentPage);
  const setCurrentPage = useApplicationsStore((state) => state.setCurrentPage);
  const setPageSize = useApplicationsStore((state) => state.setPageSize);
  const pageSize = useApplicationsStore((state) => state.pageSize);
  const numberOfApplication = useApplicationsStore(
    (state) => state.numberOfApplication
  );
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [proposalType, setProposalType] = useState<ProposalType>('contact');
  const showModal = useModalsStore((state) => state.handleApplication);

  const handleOpenApplication = (type: ProposalType, newId: number | null) => {
    setProposalType(type);
    setApplicationId(applicationId === newId ? null : newId);
  };

  return (
    <div className='flex-container hidden'>
      <div className='ListApplications flex-container relative'>
        <div className='title-for-list color-secondary-l2'>
          <div className='flex justify-center '>Заявка/Статус</div>
          <div className='flex justify-center '>Дата создания</div>
          <div className='flex justify-center '>Автор</div>
          <div className='flex justify-center '>Действие</div>
        </div>
        <ScrollBar>
          <div>
            {applications.map((application) => {
              let type;
              if ('full_name' in application) {
                type = 'contact';
              } else {
                type = 'organization';
              }
              const result =
                proposalType === type && applicationId === +application.id;
              return (
                <Application
                  key={v1()}
                  application={application}
                  isOpenDetails={result}
                  handleOpenApplication={handleOpenApplication}
                />
              );
            })}
          </div>
        </ScrollBar>
        <PaginationFull
          currentPage={currentPage}
          numberOfElements={numberOfApplication}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};
