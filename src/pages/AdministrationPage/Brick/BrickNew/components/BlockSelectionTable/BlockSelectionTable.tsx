import React, { FC, memo, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { IFreeBrick } from 'api/brickApi';
import { TableRowSelection } from 'antd/es/table/interface';
import { Table } from 'antd';
import { getBrickTypeByLevel } from 'utils';

interface DataType {
  key: React.Key;
  name: string;
  type: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    width: '20%',
  },
];

interface ITableProps {
  blocks: IFreeBrick[];
  addBlocks: (value: number[]) => void;
}

export const BlockSelectionTable: FC<ITableProps> = memo((props) => {
  const { blocks, addBlocks } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const dataTable = useMemo(() => {
    const data: DataType[] = [];
    for (let i = 0; i < blocks.length; i++) {
      data.push({
        key: blocks[i].id,
        name: blocks[i].name,
        type: getBrickTypeByLevel(blocks[i].type),
      });
    }
    return data;
  }, [blocks.length]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    addBlocks(newSelectedRowKeys as number[]);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataTable}
      size={'small'}
      bordered
      pagination={false}
      scroll={{ y: '35rem' }}
    />
  );
});
