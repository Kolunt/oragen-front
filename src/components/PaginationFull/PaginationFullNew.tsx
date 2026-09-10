import React, { FC, useMemo } from 'react';
import { Pagination, SelectForm } from 'ui-kit';
import classNames from 'classnames';
import './PaginationFull.scss';

interface IPaginationFull {
  className?: string;
  currentPage: number;
  pageSize: number;
  numberOfElements: number;
  changeCurrentPage: ({ selected }: { selected: number }) => void;
  changePageSize: (pageSize: any) => void;
}

const paginationOptions = [
  { value: '5', label: '5 / стр.' },
  { value: '10', label: '10 / стр.' },
  { value: '20', label: '20 / стр.' },
];

// todo компонент пагинации с логикой внутри

export const PaginationFullNew: FC<IPaginationFull> = (props) => {
  const {
    className,
    currentPage,
    changeCurrentPage,
    changePageSize,
    pageSize,
    numberOfElements,
  } = props;

  const pagesCount: number = useMemo(() => {
    const pages = Math.ceil(numberOfElements / pageSize);

    return pages ? pages : currentPage;
  }, [numberOfElements, pageSize]);

  const defaultPageSize = useMemo(() => {
    return paginationOptions.filter(({ value }) => +value === pageSize);
  }, [pageSize]);

  return (
    <div className={classNames('PaginationFull mt-20', className)}>
      <Pagination
        forcePage={currentPage}
        pagesCount={pagesCount}
        onChange={changeCurrentPage}
      />
      <SelectForm
        className='CustomSelect'
        options={paginationOptions}
        menuPlacement={'top'}
        defaultValue={defaultPageSize}
        onChange={changePageSize}
      />
    </div>
  );
};
