import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Button, Icon, Title } from 'ui-kit';
import { ROUTES } from 'enums';
import { useNavigate, useParams } from 'react-router-dom';
import { useBrickStore } from 'store/useBrickStore';
import { ListLowType } from './ListLowType/ListLowType';
import { ListHighType } from './ListHighType/ListHighType';
import { IGetFreeSourcePayload } from 'api/brickApi';
import { ModalAddBrick } from './Components/ModalAddBrick/ModalAddBrick';
import './BrickInfo.scss';

export const BrickInfo = () => {
  const { id_brick } = useParams();
  const getMonitoredBlock = useBrickStore((state) => state.getMonitoredBlock);
  const monitoredBlock = useBrickStore((state) => state.monitoredBlock);
  const setMonitoredBlockId = useBrickStore(
    (state) => state.setMonitoredBlockId
  );
  const getFreeSource = useBrickStore((state) => state.getFreeSource);
  const removeBlock = useBrickStore((state) => state.removeBlock);
  const addBlockSource = useBrickStore((state) => state.addBlockSource);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    type,
    name,
    sources_high_high_list,
    sources_medium_list,
    sources_low_list,
    sources_high_list,
  } = monitoredBlock;

  useEffect(() => {
    if (id_brick) {
      getMonitoredBlock(id_brick);
      setMonitoredBlockId(+id_brick);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      const payload: IGetFreeSourcePayload = { mode: type };
      getFreeSource(payload);
    }
  }, [showModal]);

  const onRemoveBlock = async () => {
    if (id_brick) {
      removeBlock(id_brick, () => navigate(ROUTES.BRICKS));
    }
  };

  const addBlock = (payload: number | string) => {
    if (id_brick) {
      addBlockSource(id_brick, payload);
    }
  };

  return (
    <div className='BrickInfo flex-container'>
      <Layout>
        <Title className='mb-20'>{name}</Title>

        <div className='ListWrapper flex-container hidden'>
          {type === 'low' && <ListLowType organizations={sources_low_list} />}

          {type === 'medium' && <ListHighType blocks={sources_medium_list} />}

          {type === 'high' && (
            <ListHighType
              blocks={sources_high_list}
              blocksHigh={sources_high_high_list}
            />
          )}

          <div className='mt-20 flex items-center gap-x-10'>
            <h4 className='fz-13 fw-700'>Добавить брик</h4>
            <Icon
              className='pointer'
              type={'TasksAddSquare'}
              onClick={() => setShowModal(true)}
            />
          </div>
          <div className='mt-20 flex justify-space-between'>
            <Button onClick={() => navigate(ROUTES.BRICKS)}>Назад</Button>
            <Button className='RemoveButton' onClick={onRemoveBlock}>
              Удалить блок
            </Button>
          </div>
        </div>
      </Layout>
      <ModalAddBrick
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        getPayload={(payload) => addBlock(payload)}
      />
    </div>
  );
};
