import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { DateFormats, ROUTES } from 'enums';
import { Button, Checkbox, Icon, ITab, Tabs, Title } from 'ui-kit';
import { useVisitsStore } from 'store/useVisitsStore';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { ModalChangeVisitMR } from 'components/Modals/ModalChangeVisitMR/ModalChangeVisitMR';
import { ModalComment } from 'components/Modals/ModalComment/ModalComment';
import dayjs from 'dayjs';
import { useReportStore } from 'components/Report';
import './VisitInfoPage.scss';

const tabs: ITab[] = [
  { id: '1', label: 'Препараты' },
  { id: '2', label: 'Патологии' },
  { id: '3', label: 'Конкуренты' },
  { id: '4', label: 'Критерии выбора' },
];

export const VisitInfoPage = () => {
  const visit = useVisitsStore((state) => state.monitoredVisit);
  const getMonitoredVisit = useVisitsStore((state) => state.getMonitoredVisit);
  const monitoredVisitId = useVisitsStore((state) => state.monitoredVisitId);
  const setMonitoredReport = useReportStore(
    (state) => state.setMonitoredReport
  );
  const [startVisit, setStartVisit] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedTabVisit, setSelectedTabVisit] = useState(tabs[0].id);

  const onCloseVisit = () => {
    // setStartVisit(false);
    navigate(ROUTES.VISITS);
  };

  useEffect(() => {
    if (monitoredVisitId) {
      getMonitoredVisit(monitoredVisitId);
    }
  }, [monitoredVisitId]);

  const onRedirect = () => {
    // navigate(isPharmacyMode ? ROUTES.VISIT_REPORT : ROUTES.PRESENTATION);
    setMonitoredReport(visit.report);
    navigate(ROUTES.VISIT_REPORT);
  };

  /*const visitType =
    visit?.videocall === null ? 'Визит к врачу' : 'Дистанционный визит';*/

  return (
    <div className='VisitInfoPage'>
      <Layout>
        <div className='flex gap-x-40'>
          <div className='VisitInfoBlock'>
            <Breadcrumbs
              links={[
                {
                  title: 'Визиты',
                  callback: () => navigate(ROUTES.VISITS),
                },
                { title: `${visit?.contact?.full_name}` },
              ]}
            />
            <div className='mb-20 flex justify-space-between'>
              <Title>{`Визиты: ${visit?.contact?.full_name}`}</Title>
              <Title>{`Цикл: ${visit?.drug?.name}`}</Title>
            </div>

            <div className='Table'>
              <Tabs
                className='mb-10'
                selectedId={selectedTabVisit}
                tabs={tabs}
                onClick={setSelectedTabVisit}
              />
              <div className='TableRow TableRow__Main'>
                <div className='flex justify-center'>Препарат</div>
                <div className='flex justify-center'>Потенциал</div>
                <div className='flex justify-center'>Лояльность</div>
                <div className='flex justify-center'>Возражения</div>
                <div className='flex justify-center'>Детализация</div>
                <div className='flex justify-center'>П-к</div>
              </div>
              <div className='TableRow'>
                <div className='Cell'>Элизария®</div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'>
                  <Checkbox isChecked={true} onChange={() => {}} />
                </div>
                <div className='Cell'>1</div>
              </div>
              <div className='TableRow'>
                <div className='Cell'>Ревелиза®</div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'>
                  <Checkbox isChecked={true} onChange={() => {}} />
                </div>
                <div className='Cell'>1</div>
              </div>
              <div className='TableRow'>
                <div className='Cell'>Тигераза®</div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'>
                  <Checkbox isChecked={true} onChange={() => {}} />
                </div>
                <div className='Cell'>1</div>
              </div>
              <div className='TableRow'>
                <div className='Cell'>Глуразим®</div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'></div>
                <div className='Cell'>
                  <Checkbox isChecked={true} onChange={() => {}} />
                </div>
                <div className='Cell'>1</div>
              </div>
            </div>
            <Button className='mt-20' onClick={onRedirect}>
              Открыть карточку визита
            </Button>
          </div>
          <div className='VisitCard'>
            <div className='VisitCard__Header'>
              <span>{startVisit ? 'В процессе' : 'Запланирован'}</span>
            </div>

            <div className='VisitCard__Main'>
              <ul className='List'>
                <li className='List__Item'>
                  <span>Дата и время:</span>
                  {dayjs(visit.planned_at).format(DateFormats.FULL_DATE_FORMAT)}
                  {/*{isPharmacyMode ? (
                    <span>
                      {dayjs(visitPharmacy.planned_at).format(
                        DateFormats.FULL_DATE_FORMAT
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(visit.planned_at).format(
                        DateFormats.FULL_DATE_FORMAT
                      )}
                    </span>
                  )}*/}
                </li>
                <li className='List__Item'>
                  <span>Организация:</span>
                  <span>{visit.contact?.company}</span>
                  {/*  {isPharmacyMode ? (
                    <span>{visitPharmacy.organization?.name}</span>
                  ) : (
                    <span>{visit.contact?.company}</span>
                  )}*/}
                </li>
                <li className='List__Item'>
                  <span>Адрес:</span>
                  <span>{visit.contact?.address}</span>
                  {/* {isPharmacyMode ? (
                    <span>{visitPharmacy.organization?.address}</span>
                  ) : (
                    <span>{visit.contact?.address}</span>
                  )}*/}
                </li>
                <li className='List__Item'>
                  <span>Специальность:</span>
                  <span>{visit.contact?.position}</span>
                  {/* {isPharmacyMode ? (
                    <span>провизор</span>
                  ) : (
                    <span>{visit.contact?.position}</span>
                  )}*/}
                </li>
                <li className='List__Item'>
                  <span>Фокус визита:</span>
                  <span>{visit.drug?.name}</span>
                  {/*{isPharmacyMode ? (
                    <span>{visitPharmacy.drug?.name}</span>
                  ) : (
                    <span>{visit.drug?.name}</span>
                  )}*/}
                </li>
                <li className='List__Item'>
                  <span>Телефон:</span>
                  <span>{visit.contact?.phone}</span>
                  {/* {isPharmacyMode ? (
                    <span>+79991493174</span>
                  ) : (
                    <span>{visit.contact?.phone}</span>
                  )}*/}
                </li>
              </ul>

              <Button className='ButtonVisit'>
                Визит без вхождения в историю
              </Button>
            </div>

            <div className='VisitCard__Footer'>
              <div className='VisitDetails'>
                <Icon type='ThreePoints' />
              </div>
              <Button
                className='ButtonStart'
                typeIconEnd='VisitInfoArrowRight'
                onClick={onRedirect}
              >
                Старт
              </Button>

              {/*        {startVisit ? (
                <Button
                  className='ButtonStart'
                  typeIconEnd='VisitInfoArrowRight'
                  onClick={onCloseVisit}
                >
                  Финиш
                </Button>
              ) : (
                <Button
                  className='ButtonStart'
                  typeIconEnd='VisitInfoArrowRight'
                  onClick={() => setStartVisit(true)}
                >
                  Старт
                </Button>
              )}*/}
            </div>
          </div>
        </div>
      </Layout>
      <ModalChangeVisitMR />
      <ModalComment />
    </div>
  );
};
