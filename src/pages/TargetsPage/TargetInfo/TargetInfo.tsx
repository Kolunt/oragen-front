import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Accordion, Button, Title } from 'ui-kit';
import { useTargetsStore } from 'store/useTargetsStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { StepperTargets } from 'components';
import { useTargetsLocalStore } from 'store/useTargetsLocalStore';
import { useUserStore } from 'store/useUserStore';
import { displayCheck, getBrickTypeByLevel } from 'utils';
import './TargetInfo.scss';

export const TargetInfo = () => {
  const monitoredTarget = useTargetsStore((state) => state.monitoredTarget);
  const getMonitoredTarget = useTargetsStore(
    (state) => state.getMonitoredTarget
  );
  const monitoredTargetId = useTargetsStore((state) => state.monitoredTargetId);
  const createLocalLists = useTargetsStore((state) => state.createLocalLists);
  const clearLocalLists = useTargetsStore((state) => state.clearLocalLists);
  const setParentTargetListId = useTargetsLocalStore(
    (state) => state.setParentTargetListId
  );
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  const navigate = useNavigate();

  useEffect(() => {
    if (monitoredTargetId) {
      getMonitoredTarget(monitoredTargetId);
    }
  }, [monitoredTargetId]);

  const onCreateTargetList = async () => {
    if (monitoredTargetId) {
      setParentTargetListId(monitoredTarget.id);
      await createLocalLists(monitoredTargetId, navigate);
    }
  };

  const onChangeTargetList = () => {
    navigate(ROUTES.CHANGE_TARGET);
  };

  const onClearTargetsLocal = async () => {
    if (monitoredTargetId) {
      await clearLocalLists(monitoredTargetId, navigate);
    }
  };

  const onRedirectTargetsLocal = () => {
    setParentTargetListId(monitoredTarget.id);
    navigate(ROUTES.TARGETS_MED_REP);
  };

  if (!displayCheck(SideMenuTypes.TARGET_LIST, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='bg-background-l7'>
      <Layout>
        {'name' in monitoredTarget && (
          <>
            <div className='mb-20 flex gap-x-40'>
              <Title>Название: {monitoredTarget.name}</Title>
              <Title>Цикл: {monitoredTarget.drug.name}</Title>
            </div>
            <StepperTargets className='mb-20' active={2} />
            <div className='TargetInfoList'>
              <div className='AccordionsWrapper'>
                <Accordion title='Ответственный'>
                  <div className='AccordionContent'>
                    <div className='Row'>
                      <span>Логин</span>
                      <span>{monitoredTarget.owner.name}</span>
                    </div>
                    <div className='Row'>
                      <span>ФИО</span>
                      <span>
                        {`${monitoredTarget.owner.last_name} ${
                          monitoredTarget.owner.first_name
                        } ${monitoredTarget.owner.middle_name || ''}`}
                      </span>
                    </div>
                    <div className='Row'>
                      <span>email</span>
                      <span>{monitoredTarget.owner.email}</span>
                    </div>
                    <div className='Row'>
                      <span>Телефон</span>
                      <span>{monitoredTarget.owner.phone || 'нет данных'}</span>
                    </div>
                  </div>
                </Accordion>

                <Accordion title='Блоки'>
                  <div className='AccordionContent'>
                    {monitoredTarget.blocks.map((block, index) => (
                      <div key={block.id} className='Row'>
                        <span>{`${index + 1}. ${block.name}`}</span>
                        <span>{`тип: ${getBrickTypeByLevel(block.type)}`}</span>
                      </div>
                    ))}
                  </div>
                </Accordion>

                <Accordion title='Специальности'>
                  <div className='AccordionContent'>
                    {monitoredTarget.positions.map((position, index) => (
                      <div key={position.id} className='Row'>
                        <span>{`${index + 1}. ${position.name}`}</span>
                      </div>
                    ))}
                  </div>
                </Accordion>
              </div>
              <div className='mt-20 flex justify-space-between'>
                {monitoredTarget.status === 'preparation' ? (
                  <>
                    <div className='flex gap-x-20'>
                      <Button onClick={onCreateTargetList}>
                        Сгенерировать
                      </Button>
                      <Button
                        className='ButtonCancel'
                        onClick={() => navigate(ROUTES.TARGETS)}
                      >
                        Назад
                      </Button>
                    </div>
                    <Button onClick={onChangeTargetList}>Изменить</Button>
                  </>
                ) : (
                  <>
                    <div className='flex gap-x-20'>
                      <Button onClick={onRedirectTargetsLocal}>
                        Перейти к локальным таргетам
                      </Button>
                      <Button
                        className='ButtonCancel'
                        onClick={() => navigate(ROUTES.TARGETS)}
                      >
                        Назад
                      </Button>
                    </div>
                    <Button
                      className='RemoveButton'
                      onClick={onClearTargetsLocal}
                    >
                      Расформировать сгенерированные таргеты
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </Layout>
    </div>
  );
};
