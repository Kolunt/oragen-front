import React, { useEffect } from 'react';
import { TargetsMedRepSorting } from './TargetsMedRepSorting';
import { useTargetsLocalStore } from 'store/useTargetsLocalStore';
import { TargetsMedRepListItem } from './TargetsMedRepListItem';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { Button } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { useVisitsStore } from 'store/useVisitsStore';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './TargetsMedRepList.scss';

export const TargetsMedRepList = () => {
  const targets = useTargetsLocalStore((state) => state.targets);
  const parentTargetListId = useTargetsLocalStore(
    (state) => state.parentTargetListId
  );
  const getTargets = useTargetsLocalStore((state) => state.getTargets);
  const currentPage = useTargetsLocalStore((state) => state.currentPage);
  const setCurrentPage = useTargetsLocalStore((state) => state.setCurrentPage);
  const pageSize = useTargetsLocalStore((state) => state.pageSize);
  const setPageSize = useTargetsLocalStore((state) => state.setPageSize);
  const numberOfTargets = useTargetsLocalStore(
    (state) => state.numberOfTargets
  );
  const setPlanedVisits = useTargetsLocalStore(
    (state) => state.setPlanedVisits
  );
  const setPlanedContactVisits = useTargetsLocalStore(
    (state) => state.setPlanedContactsVisits
  );
  const planedVisits = useTargetsLocalStore((state) => state.planedVisits);
  const planedContactsVisits = useTargetsLocalStore(
    (state) => state.planedContactsVisits
  );
  const generateVisits = useVisitsStore((state) => state.generateVisits);
  const navigate = useNavigate();

  useEffect(() => {
    getTargets();
  }, [currentPage, pageSize]);

  useEffect(() => {
    let visit = 0;
    let contactVisits = 0;

    targets.forEach((target) => {
      visit += target.visits_count;
      target.matched_contacts.forEach((item) => {
        contactVisits += item.pivot.planned_visits;
      });
    });
    setPlanedVisits(visit);
    setPlanedContactVisits(contactVisits);
  }, [targets]);

  const onGenerateVisits = () => {
    if (parentTargetListId) {
      generateVisits({ mode: 'global', id: parentTargetListId });
    }
  };
  return (
    <div className='TargetsMedRepList flex-container relative'>
      <TargetsMedRepSorting />
      <ScrollBar>
        {targets.map((target) => {
          return <TargetsMedRepListItem key={target.id} target={target} />;
        })}
      </ScrollBar>
      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfTargets}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />

      <div className='mt-20 flex justify-space-between'>
        <div className='flex gap-x-20'>
          {/*<Button>Добавить таргет</Button>*/}
          <Button
            className='ButtonCancel'
            onClick={() => navigate(ROUTES.TARGET_INFO)}
          >
            Назад
          </Button>
        </div>

        {/* <Button disabled={planedVisits > planedContactsVisits}>
          Отправить в работу
        </Button>*/}
        <Button onClick={onGenerateVisits}>Сгенерировать визиты</Button>
      </div>
    </div>
  );
};
