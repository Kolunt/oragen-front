import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { ROUTES } from 'enums';
import { Button, CheckboxCustom, Icon } from 'ui-kit';
import { useEventsStore, VideoCallStatusType } from 'store/useEventsStore';
import { ModalAddEventTime } from '../../components/Modals/ModalAddEventTime/ModalAddEventTime';
import { useModalsStore } from '../../store/useModalsStore';
import { useVideoCallStore } from '../../store/useVideoCallStore';
import './EventInfoPage.scss';

export const EventInfoPage = () => {
  const currentEvent = useEventsStore((state) => state.monitoredEvent);
  const [status, setStatus] = useState<VideoCallStatusType>(
    currentEvent.status
  );
  const forceStart = useEventsStore((state) => state.forceStart);
  const forceFinish = useEventsStore((state) => state.forceFinish);
  const showModal = useModalsStore((state) => state.handleAddEventTime);
  const getListParticipants = useVideoCallStore(
    (state) => state.getListParticipants
  );
  const participants = useVideoCallStore((state) => state.participants);
  const setTypeVideoCall = useVideoCallStore((state) => state.setTypeVideoCall);
  const navigate = useNavigate();

  useEffect(() => {
    // getListParticipants();
  }, []);

  const handleForceStart = () => {
    forceStart(currentEvent.id);
    setStatus('live');
  };

  const handleForceFinish = async () => {
    await forceFinish(currentEvent.id);
    setStatus('archived');
    navigate(ROUTES.EVENTS);
  };

  const handleGoToVideoCall = () => {
    setTypeVideoCall('event');
    navigate(`${ROUTES.VIDEO_CALL}/${currentEvent.id}`);
  };

  let eventStatus = '';
  let eventCardStyle = '';

  switch (status) {
    case 'live':
      eventStatus = 'Стрим идет';
      eventCardStyle = 'EventCard__Header EventCard__Header--active';
      break;
    case 'archived':
      eventStatus = 'Стрим завершен';
      eventCardStyle = 'EventCard__Header EventCard__Header--arhive';
      break;
    default:
      eventStatus = 'Запланирован';
      eventCardStyle = 'EventCard__Header';
  }

  return (
    <div className='EventInfoPage'>
      <Layout>
        <div className='EventInfoPage__Content'>
          <div className='EventInfoBlock'>
            <div className='Breadcrumbs'>
              <Icon type='ArrowLeft' />
              <Link to={ROUTES.EVENTS}>
                <span>Мероприятия</span>
              </Link>
              <span>/</span>
              <span>Видеоконференция</span>
            </div>

            <div className='EventInfoBlock__Header'>
              <h3>Видеоконференция</h3>
            </div>

            <div className='Uploader'>
              <div className='Uploader__Button'>
                <Icon type='Paperclip' />
                <span>Прикрепить</span>
              </div>

              <div className='Details'>
                <Icon type='ThreePoints' />
              </div>
            </div>

            <div className='MemberList'>
              <div className='MemberList__Header'>
                <div className='Title'>Участники встречи</div>

                {/*<div className='Details' onClick={() => handleModal(id || '')}>*/}
                {/*  <Icon type='ThreePoints' />*/}
                {/*</div>*/}
              </div>

              <div className='List'>
                {/*// {list.map((contact) => {*/}
                {/*//   return (*/}
                {/*//     <div key={contact.id} className='List__Item'>*/}
                {/*//       <div className='Cell Cell--start'>*/}
                {/*//         <div className='Avatar'>*/}
                {/*/!*          <Icon type='ContactsPerson' />*!/*/}
                {/*/!*        </div>*!/*/}
                {/*/!*        <span>{contact.fullName}</span>*!/*/}
                {/*/!*      </div>*!/*/}

                {/*/!*      <div className='Cell'>*!/*/}
                {/*/!*        <span>{contact.position}</span>*!/*/}
                {/*/!*      </div>*!/*/}

                {/*/!*      <div className='Cell'>*!/*/}
                {/*/!*        <span>{contact.company}</span>*!/*/}
                {/*/!*      </div>*!/*/}

                {/*/!*      <div className='List__Cell Settings'>*!/*/}
                {/*//         <Icon*/}
                {/*//           type='VisitsDeleteTableData'*/}
                {/*//           onClick={() => handleRemove(contact.id)}*/}
                {/*//         />*/}
                {/*//       </div>*/}
                {/*//     </div>*/}
                {/*//   );*/}
                {/*// })}*/}
              </div>
            </div>
          </div>

          <div className='EventCard'>
            <div className={eventCardStyle}>
              <span>{eventStatus}</span>
            </div>

            <div className='EventCard__Main'>
              <ul className='List'>
                <li className='List__Item'>
                  <span>Подтип мероприятия:</span>
                  {currentEvent.type}
                </li>
                <li className='List__Item'>
                  <span>Дата начала:</span>
                  {currentEvent.started_at}
                </li>
                <li className='List__Item'>
                  <span>Продолжительность:</span>
                  {currentEvent.duration} мин.
                </li>
                <li className='List__Item'>
                  <span>Адрес:</span>г. Москва, Писцовая, д. 10
                </li>
                <li className='List__Item'>
                  <span>Фокус визита:</span>Элизария®
                </li>
                <li className='List__Item ItemCheckBox'>
                  <span>Статус конфликта визита:</span>
                  <CheckboxCustom />
                </li>
                <li className='List__Item'>
                  <span>Категория:</span>Высокая
                </li>
              </ul>
            </div>

            {status !== 'archived' && (
              <div className='EventCard__Footer'>
                {/*<div className='VisitDetails'>*/}
                {/*  <Icon type='ThreePoints' />*/}
                {/*</div>*/}

                {/*<Button*/}
                {/*  className='ButtonStart'*/}
                {/*  typeIconEnd='VisitInfoArrowRight'*/}
                {/*  onClick={handleChangingPage}*/}
                {/*>*/}
                {/*  Старт*/}
                {/*</Button>*/}

                {status === 'live' ? (
                  <>
                    {currentEvent.participants > participants.length ? (
                      <>
                        <div className='EventCard__Footer-Row'>
                          <Button
                            className='ButtonStart--active'
                            onClick={() => showModal(true)}
                          >
                            Продлить
                          </Button>

                          <Button
                            className='ButtonStart--closed'
                            onClick={handleForceFinish}
                          >
                            Завершить
                          </Button>
                        </div>
                        <div className='EventCard__Footer-Row'>
                          <Button
                            className='ButtonOnCall'
                            onClick={handleGoToVideoCall}
                          >
                            На звонок
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div>Мест нет!!!</div>
                    )}
                  </>
                ) : (
                  <div className='EventCard__Footer-Row'>
                    <Button
                      className='ButtonStart'
                      onClick={() => showModal(true)}
                    >
                      Продлить
                    </Button>

                    <Button className='ButtonStart' onClick={handleForceStart}>
                      Стартовать сейчас
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
      <ModalAddEventTime />
    </div>
  );
};
