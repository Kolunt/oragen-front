import React, { FC, memo, MouseEvent } from 'react';
import { useBrickStore } from 'store/useBrickStore';
import { Avatar, Icon, ScrollBar } from 'ui-kit';
import MedicalCross from 'assets/svg/organizationsPage/OrganizationsCase.svg';
import { IBrickSourcesHighList, IBrickSourcesMediumList } from 'api/brickApi';
import './ListHighType.scss';

interface IListHighType {
  blocks: IBrickSourcesMediumList[] | IBrickSourcesHighList[];
  blocksHigh?: IBrickSourcesMediumList[] | IBrickSourcesHighList[];
}

export const ListHighType: FC<IListHighType> = memo((props) => {
  const { blocks, blocksHigh } = props;
  const removeBlockSource = useBrickStore((state) => state.removeBlockSource);
  const monitoredBlock = useBrickStore((state) => state.monitoredBlock);

  const data = blocksHigh ? [...blocks, ...blocksHigh] : blocks;

  const onRemoveBlockSource = (e: MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    removeBlockSource(monitoredBlock.id, id);
  };

  return (
    <div className='ListHighType hidden flex-container'>
      <ul className='ListSorting'>
        <li className='text-left'>Название</li>
        <li>Тип</li>
      </ul>
      <div className='relative flex-container hidden'>
        <ScrollBar>
          {data.map((block) => {
            return (
              <div className='ListItem' key={block.id}>
                <div className='Cell Cell--Start'>
                  <Avatar className='Avatar' image={MedicalCross} />
                  <h3>{block.name}</h3>
                </div>

                <div className='Cell'>{block.type}</div>

                <div className='Cell'>
                  <div onClick={(e) => onRemoveBlockSource(e, +block.id)}>
                    <Icon
                      className='CustomIcon'
                      type={'VisitsDeleteTableData'}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollBar>
      </div>
    </div>
  );
});
