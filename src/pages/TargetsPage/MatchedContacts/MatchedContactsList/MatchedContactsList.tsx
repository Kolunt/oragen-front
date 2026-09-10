import React, { useEffect, useState } from 'react';
import { useTargetsLocalStore } from 'store/useTargetsLocalStore';
import { MatchedContactsListItem } from './MatchedContactsListItem';
import { Button, Title } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { MatchedContactsSorting } from './MatchedContactsSorting';
import { useVisitsStore } from 'store/useVisitsStore';
import './MatchedContactsList.scss';

export const MatchedContactsList = () => {
  const monitoredTarget = useTargetsLocalStore(
    (state) => state.monitoredTarget
  );
  const monitoredTargetId = useTargetsLocalStore(
    (state) => state.monitoredTargetId
  );
  const getMonitoredTarget = useTargetsLocalStore(
    (state) => state.getMonitoredTarget
  );
  const setPlanedContactsVisits = useTargetsLocalStore(
    (state) => state.setPlanedContactsVisits
  );
  const generateVisits = useVisitsStore((state) => state.generateVisits);
  const [remainingVisits, setRemainingVisits] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (monitoredTargetId) {
      getMonitoredTarget(monitoredTargetId);
    }
  }, []);
  useEffect(() => {
    let count = 0;
    if ('matched_contacts' in monitoredTarget) {
      monitoredTarget.matched_contacts.forEach((item) => {
        count += item.pivot.planned_visits;
      });
    }
    if ('matched_organizations' in monitoredTarget) {
      monitoredTarget.matched_organizations.forEach((item) => {
        count += item.pivot.planned_visits;
      });
    }
    setRemainingVisits(monitoredTarget.visits_count - count);
  }, [monitoredTarget.matched_contacts, monitoredTarget.matched_organizations]);

  const onGenerateVisits = () => {
    if (monitoredTargetId) {
      generateVisits({ mode: 'local', id: monitoredTargetId });
    }
  };
  return (
    <div className='MatchedContactsList'>
      <MatchedContactsSorting />

      <div className='List'>
        {'matched_contacts' in monitoredTarget &&
          monitoredTarget.matched_contacts.map((contact) => {
            return (
              <MatchedContactsListItem
                key={contact.id}
                target={contact}
                targetListId={monitoredTarget.id}
                remainingVisits={remainingVisits}
                drug={monitoredTarget.drug.name}
                loyaltyRange={
                  monitoredTarget.parent_target_list_full_info.loyality_range
                }
                loyalty={contact.loyality}
                potential={contact.potential}
                potentialRange={
                  monitoredTarget.parent_target_list_full_info.potential_range
                }
              />
            );
          })}
        {'matched_organizations' in monitoredTarget &&
          monitoredTarget.matched_organizations.map((contact) => {
            return (
              <MatchedContactsListItem
                key={contact.id}
                target={contact}
                targetListId={monitoredTarget.id}
                remainingVisits={remainingVisits}
                drug={monitoredTarget.drug.name}
              />
            );
          })}
      </div>

      <div className='mt-20 flex justify-space-between items-center'>
        <div className='flex gap-x-20'>
          {/*          <Button disabled={!monitoredTarget.status} onClick={onGenerateVisits}>
            Сгенерировать визиты
          </Button>*/}
          <Button
            className='ButtonCancel'
            onClick={() => navigate(ROUTES.TARGETS_MED_REP)}
          >
            Назад
          </Button>
        </div>
        {/*<Title>{`Осталось визитов: ${remainingVisits}`}</Title>*/}
      </div>
    </div>
  );
};
