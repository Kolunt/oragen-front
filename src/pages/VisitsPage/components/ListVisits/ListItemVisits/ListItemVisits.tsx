import React, { FC, memo } from 'react';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import { ROUTES } from 'enums';
import { useUserStore } from 'store/useUserStore';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { IVisitGroup } from 'api/visitsGroupApi';
import { useContactsStore } from 'store/useContactsStore';
import './ListItemVisits.scss';
import { useCurrentVisitsStore } from 'pages/ContactsPage/ContactInfoPage/CurrentVisits/useCurrentVisitsStore';
import { ProgressCircle } from 'ui-kit';

interface IListItemVisits {
  visit: IVisitGroup;
}

export const ListItemVisits: FC<IListItemVisits> = memo((props) => {
  const { visit } = props;
  const me = useUserStore((state) => state.me);
  const setMonitoredContactId = useContactsStore(
    (state) => state.setMonitoredContactId
  );
  const setPerformerId = useCurrentVisitsStore((state) => state.setPerformerId);
  const setDrugId = useCurrentVisitsStore((state) => state.setDrugId);
  const navigate = useNavigate();
  const isMedRep = me.roles[0].id === 8;

  const redirectVisitInfo = () => {
    setMonitoredContactId(+visit.contact.id);
    setPerformerId(visit.performer_id);
    setDrugId(visit.drug_id);
    navigate(ROUTES.CONTACTS_INFO);
  };

  return (
    <div
      className={classNames(`ListItemVisits`, {
        ListItemVisits__MedRep: isMedRep,
      })}
      onClick={redirectVisitInfo}
    >
      <UserInfoForList
        user={{
          full_name: visit.contact.full_name,
          phone: visit.contact.phone,
        }}
      />

      {!isMedRep && <div className='Cell'>{visit.performer.name}</div>}

      <div className='Cell'>{visit.contact.position}</div>

      <div className='Cell'>{visit.drug.name}</div>

      <div className='Cell'>{visit.contact.address}</div>

      <div className='Cell Cell--Accent'>
        <ProgressCircle
          value={visit.archived_visits}
          maxValue={visit.planned_visits}
        />
        {/*{`${visit.finished_visits}/${visit.planned_visits}`}*/}
      </div>
    </div>
  );
});
