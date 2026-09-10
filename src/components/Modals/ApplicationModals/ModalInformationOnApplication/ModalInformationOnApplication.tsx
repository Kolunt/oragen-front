import React, { FC, useMemo } from 'react';
import { Button, Modal } from 'ui-kit';
import { IModalInformationOnApplication } from '../interfaces';
import { fieldMapContact, fieldMapOrganization } from '../fieldMap';
import { ItemList } from '../Components/ItemList';
import 'pages/ApplicationsPage/ListApplications/Application/Application.scss';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes } from 'enums';

export const ModalInformationOnApplication: FC<
  IModalInformationOnApplication
> = (props) => {
  const {
    application,
    isShowModal,
    changeShowModal,
    onAcceptProposalClick,
    onDeclineProposalClick,
    label,
  } = props;
  const myRole = useUserStore((state) => state.me.roles[0].name);

  const isContact = 'full_name' in application;
  const getNameOldInformation = isContact
    ? 'contact_source'
    : 'organization_source';

  const displayCheck = useMemo(() => {
    return (
      myRole === RoleTypes.CALL_CENTER && application.approval === 'inprocess'
    );
  }, [myRole]);

  // const searchDifferences = useMemo(() => {
  //     let arrDifferences = []
  //     for (const prop in application) {
  //         if (prop !== 'id') {
  //             //@ts-ignore
  //             if (application[prop] !== application[getNameOldInformation][prop]) {
  //                 arrDifferences.push(prop)
  //             }
  //         }
  //     }
  //     return arrDifferences
  // }, [application])
  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='text-center color-date-picker fw-600 mb-20 fz-20'>
        {label}
      </div>
      <div className='mb-10 pl-20 pr-20'>
        <h3 className='color-date-picker fz-12 mb-5'>
          От: {application.creator.last_name} {application.creator.first_name}
        </h3>
        {/*{isContact && (*/}
        {/*  <div className='color-grey-l3 fz-12'>{application.phone}</div>*/}
        {/*)}*/}
      </div>
      <div className='Application__Inner'>
        {(isContact ? fieldMapContact : fieldMapOrganization).map(
          ({ key, label }) => (
            <ItemList
              label={label}
              key={key}
              oldValue={
                application.approval === 'inprocess'
                  ? //@ts-ignore
                    application[getNameOldInformation]
                    ? //@ts-ignore
                      application[getNameOldInformation][key]
                    : ''
                  : ''
              }
              //@ts-ignore
              value={application[key]}
              id={key}
            />
          )
        )}
        {displayCheck && (
          <div className='flex justify-center mt-30'>
            <Button
              className='btn accept min mr-20'
              onClick={onAcceptProposalClick}
            >
              Принять
            </Button>
            <Button
              className='btn decline min'
              onClick={onDeclineProposalClick}
            >
              Отклонить
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
