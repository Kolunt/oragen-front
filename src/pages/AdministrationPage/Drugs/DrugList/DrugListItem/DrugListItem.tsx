import React, { FC, memo } from 'react';
import { Switch } from 'ui-kit';
import { NumberStatusType, IDrug } from 'api/drugsApi';
import { useDrugsStore } from 'store/useDrugsStore';
import './DrugListItem.scss';

interface IDrugListItem {
  drug: IDrug;
}

export const DrugListItem: FC<IDrugListItem> = memo((props) => {
  const {
    drug: { id, name, status },
  } = props;
  const changeDrugStatus = useDrugsStore((state) => state.changeDrugStatus);

  const onChangeDrugStatus = (id: number, status: boolean) => {
    const payload = {
      id,
      status: status ? 0 : (1 as NumberStatusType),
    };
    changeDrugStatus(payload);
  };

  return (
    <div className='DrugListItem'>
      <div className='Cell'>{name}</div>
      <div className='SwitchWrapper'>
        <Switch
          checked={status}
          onChange={() => onChangeDrugStatus(id, status)}
          width={48}
          height={24}
          borderRadius={12}
          handleDiameter={20}
        />
      </div>
    </div>
  );
});
