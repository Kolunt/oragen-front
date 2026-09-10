import React, { FC, memo } from 'react';
import { IVisitGroupPharmacy } from 'api/visitsPharmacyGroupApi';
import classNames from 'classnames';
import { UserInfoForList } from 'ui-kit/ListTable/Components/UserInfoForList';
import { useUserStore } from 'store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import {
  useCurrentVisitsPharmacyStore,
  usePharmacyInfoStore,
} from 'pages/OrganizationsPage';
import { ProgressCircle } from 'ui-kit';
import './ListItemPharmacyVisit.scss';

interface IListItemPharmacyVisit {
  visit: IVisitGroupPharmacy;
}

export const ListItemPharmacyVisit: FC<IListItemPharmacyVisit> = memo(
  (props) => {
    const { visit } = props;
    const me = useUserStore((state) => state.me);
    const setMonitoredId = usePharmacyInfoStore(
      (state) => state.setMonitoredId
    );
    const setPerformerId = useCurrentVisitsPharmacyStore(
      (state) => state.setPerformerId
    );
    const setDrugId = useCurrentVisitsPharmacyStore((state) => state.setDrugId);
    const navigate = useNavigate();
    const isMedRep = me.roles[0].id === 8;

    const redirectVisitInfo = () => {
      setMonitoredId(visit.organization_id);
      setPerformerId(visit.performer_id);
      setDrugId(visit.drug_id);
      navigate(ROUTES.ORGANIZATIONS_INFO);
    };

    return (
      <div
        className={classNames(`ListItemPharmacyVisit`, {
          ListItemPharmacyVisit__MedRep: isMedRep,
        })}
        onClick={redirectVisitInfo}
      >
        <UserInfoForList
          user={{
            full_name: visit.organization.name,
            phone: '',
          }}
        />

        {!isMedRep && <div className='Cell'>{visit.performer.name}</div>}

        <div className='Cell'>{visit.drug.name}</div>

        <div className='Cell'>{visit.organization.address}</div>

        <div className='Cell Cell--Accent'>
          <ProgressCircle
            value={visit.archived_visits}
            maxValue={visit.planned_visits}
          />
          {/*{`${visit.finished_visits}/${visit.planned_visits}`}*/}
        </div>
      </div>
    );
  }
);
