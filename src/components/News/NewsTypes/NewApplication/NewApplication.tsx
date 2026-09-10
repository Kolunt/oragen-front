import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DateFormats, OrganizationTypes, ROUTES } from 'enums';
import { Icon } from 'ui-kit';
import './NewApplication.scss';
import '../styles.scss';
import {
  IContactApplication,
  IOrganizationApplication,
} from 'store/useApplicationsStore';
import { ApplicationApproval } from 'enums/ApplicationTypes';
import { v1 } from 'uuid';

interface INewApplication {
  application: IContactApplication | IOrganizationApplication;
}

const fieldMapListContact = [
  { key: 'position' },
  { key: 'company' },
  { key: 'phone' },
  { key: 'address' },
];

const fieldMapListOrganization = [
  { key: 'organization_type' },
  { key: 'address' },
];

export const NewApplication = ({ application }: INewApplication) => {
  const navigate = useNavigate();
  // есть дубли Application
  const isContact = 'full_name' in application;

  let statusApplication, colorStyle;

  switch (application.approval) {
    case ApplicationApproval.ACCEPTED:
      statusApplication = 'Принята';
      colorStyle = 'Circle--completed';
      break;
    case ApplicationApproval.DECLINED:
      statusApplication = 'Отклонена';
      colorStyle = 'Circle--rejected';
      break;
    default:
      statusApplication = 'На рассмотрении';
      colorStyle = '';
  }

  const statusAction = useMemo(() => {
    return isContact
      ? application.contact_source &&
          Object.keys(application.contact_source).length > 0
      : application.organization_source &&
          Object.keys(application.organization_source).length > 0;
  }, [application]);

  const isYongApplication = useMemo(() => {
    return dayjs().diff(dayjs(application?.created_at), 'hour') <= 24;
  }, [application]);
  return (
    <div className='newItem' onClick={() => navigate(ROUTES.APPLICATIONS)}>
      {/*{isYongApplication && (*/}
      {/*    <div className="new">*/}
      {/*      <Image src={BellWhite} />*/}
      {/*      <span className='pl-5'>Новая заявка</span>*/}
      {/*    </div>*/}
      {/*)}*/}
      <div className='mb-5'>
        <div className='flex'>
          <div className='icon'>
            <Icon type='NavFileDownload' />
          </div>
          <div>
            <div className='flex items-center'>
              <h4 className='TypeName'>
                {statusAction ? 'Заявка на изменение' : 'Заявка на добавление'}
              </h4>
              <span className=''>
                от{' '}
                {dayjs(application?.created_at).format(
                  DateFormats.APP_DATE_FORMAT
                )}
              </span>
            </div>
            <div className='color-tertiary-l3'>
              создана {dayjs(application?.created_at).locale('ru').fromNow()}
            </div>
          </div>
        </div>
      </div>
      <div className='separator-bottom'>
        <div className='flex items-center color-tertiary-l3'>
          <div className={`Circle ${colorStyle}`} />
          <span>{statusApplication}</span>
        </div>
      </div>

      <div className='fw-600'>
        {isContact ? application?.full_name : application?.name}
      </div>
      <div className='InfoList'>
        {(isContact ? fieldMapListContact : fieldMapListOrganization).map(
          ({ key }) => (
            <div className='item' key={v1()}>
              {key === 'organization_type'
                ? application[key] === OrganizationTypes.MPI
                  ? 'ЛПУ'
                  : 'Аптека'
                : // @ts-ignore
                  application[key]}
            </div>
          )
        )}
      </div>
    </div>
  );
};
