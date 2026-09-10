import React from 'react';
import { ListItemBricks } from '../ListItemBricks/ListItemBricks';
import { ListBricksSorting } from '../ListBricksSorting/ListBricksSorting';
import { useBrickStore } from 'store/useBrickStore';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './List.scss';

export const List = () => {
  const blocks = useBrickStore((state) => state.blocks);
  const currentPage = useBrickStore((state) => state.currentPage);
  const setCurrentPage = useBrickStore((state) => state.setCurrentPage);
  const pageSize = useBrickStore((state) => state.pageSize);
  const setPageSize = useBrickStore((state) => state.setPageSize);
  const numberOfBlocks = useBrickStore((state) => state.numberOfBlocks);

  return (
    <div className='bg-background-l8 br-10 w-full fz-12 pt-22 pb-22 pl-36 pr-36 flex-container relative'>
      <ListBricksSorting />
      <ScrollBar>
        {blocks.map((brick) => (
          <ListItemBricks key={brick.id} brick={brick} />
        ))}
      </ScrollBar>

      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfBlocks}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
