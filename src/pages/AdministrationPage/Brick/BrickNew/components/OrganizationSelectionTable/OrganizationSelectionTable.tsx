import React, { FC, memo, useMemo, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { IOrganization } from 'store/useOrganizationsStore';

interface DataType {
  key: React.Key;
  name: string;
  employees: number;
  type: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Организация',
    dataIndex: 'name',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    width: '45%',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    filters: [
      { text: 'ЛПУ', value: 'ЛПУ' },
      { text: 'Аптека', value: 'Аптека' },
    ],
    onFilter: (value: any, record) => record.type.includes(value),
    width: '10%',
  },
  {
    title: 'Сотрудники',
    dataIndex: 'employees',
    width: '10%',
    sorter: (a, b) => a.employees - b.employees,
  },
];

interface ITableProps {
  organizations: IOrganization[];
  addOrganizations: (value: number[]) => void;
}

export const OrganizationSelectionTable: FC<ITableProps> = memo((props) => {
  const { organizations, addOrganizations } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const dataTable = useMemo(() => {
    const data: DataType[] = [];
    for (let i = 0; i < organizations.length; i++) {
      data.push({
        key: organizations[i].id,
        name: organizations[i].name,
        address: organizations[i].address,
        type: organizations[i].organization_type === 'mpi' ? 'ЛПУ' : 'Аптека',
        employees: +organizations[i].number_of_employees,
      });
    }
    return data;
  }, [organizations.length]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    addOrganizations(newSelectedRowKeys as number[]);
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
