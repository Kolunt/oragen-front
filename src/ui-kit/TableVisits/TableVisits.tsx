import React, { FC } from 'react';

import { v4 } from 'uuid';

import AvatarImg from '../../assets/img/news/avatar.jpg';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import './TableVisits.scss';

export interface IColumns {
  id: string;
  label: string;
}

export interface IPerson {
  fullName: string;
  phone: string;
  avatar: string;
  specialty: string;
  lastVisit: string;
  job: string;
}

export interface ITableProps {
  columns: IColumns[];
  data: IPerson[];
}

export const TableVisits: FC<ITableProps> = (props) => {
  const { data, columns } = props;

  return (
    <table className='TableVisits'>
      <thead>
        <tr>
          {columns !== undefined &&
            columns.length > 0 &&
            columns.map((column) => <th key={v4()}>{column.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr key={v4()}>
            <td className='CellFullName'>
              <div className='CellFullName__Block'>
                <Avatar className='CellFullName__Avatar' image={AvatarImg} />
                <div className='CellFullName__Info'>
                  <h3>{person.fullName}</h3>
                  <span>{person.phone}</span>
                </div>
              </div>
            </td>
            <td>{person.specialty}</td>
            <td>{person.lastVisit}</td>
            <td>{person.job}</td>
            <td className='CellSettings'>
              <Icon type='VisitsChangeTableData' />
              <Icon type='VisitsDeleteTableData' />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
