import React, { useMemo, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Avatar, Pagination, Title } from 'ui-kit';
import AvatarImg from 'assets/svg/contacts/ContactsPerson.svg';
import { contactsPageDate, IFakeContact } from 'mockData/mockData';
import { useNavigate } from 'react-router-dom';
import { useGeoTargetingStore } from 'store/useGeoTargetingStore';
import { ROUTES } from 'enums';
import './GeoTargetingPage.scss';
import { ScrollBar } from '../../ui-kit/ScrollBar/ScrollBar';

const PER_PAGE = 10;

export const GeoTargetingPage = () => {
  const contacts = contactsPageDate;
  const [currentPage, setCurrentPage] = useState(0);
  const setMonitoredGeoTarget = useGeoTargetingStore(
    (state) => state.setMonitoredGeoTarget
  );
  const navigate = useNavigate();

  const pagesCount: number = useMemo(() => {
    const pages = Math.ceil(contacts.length / PER_PAGE);

    return pages >= 0 ? pages : 0;
  }, [contacts.length]);

  // @ts-ignore
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const queriedContacts = useMemo(() => {
    return contacts.slice((currentPage - 1) * PER_PAGE, PER_PAGE * currentPage);
  }, [currentPage, pagesCount]);

  const goToGeoTargetingInfo = (contact: IFakeContact) => {
    setMonitoredGeoTarget(contact);
    navigate(ROUTES.GEO_TARGETING_INFO);
  };

  return (
    <div className='GeoTargetingPage h-full'>
      <Layout>
        <div className='GeoTargetingPage__Header'>
          <Title>Геотаргетинг</Title>
        </div>
        <div className='GeoTargetingList flex-container relative hidden'>
          <ul className='ListHeader'>
            <li className='ListHeader__Item'>Медицинский представитель</li>
            <li className='ListHeader__Item'>Специалист</li>
            <li className='ListHeader__Item'>Тип</li>
            <li className='ListHeader__Item'>Место работы / Адрес</li>
          </ul>
          <ScrollBar>
            {queriedContacts.map((contact) => {
              const type = contact.type === 'mpi' ? 'ЛПУ' : 'Аптека';
              return (
                <div
                  key={contact.id}
                  className='ListItem'
                  onClick={() => goToGeoTargetingInfo(contact)}
                >
                  <div className='Block'>
                    <Avatar className='Avatar' image={AvatarImg} />
                    <div className='BlockInfo'>
                      <h3>{contact.fullName}</h3>
                      <span>{contact.phone}</span>
                    </div>
                  </div>

                  <div className='Block'>
                    <Avatar className='Avatar' image={AvatarImg} />
                    <div className='BlockInfo'>
                      <h3>{contact.fullName}</h3>
                      <span>{contact.phone}</span>
                    </div>
                  </div>

                  <div className='Cell'>{type}</div>

                  <div className='Cell'>
                    {contact.company} / {contact.address}
                  </div>
                </div>
              );
            })}
          </ScrollBar>
          <div className='GeoTargetingPaginate'>
            <Pagination
              initialPage={currentPage}
              pagesCount={pagesCount}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};
