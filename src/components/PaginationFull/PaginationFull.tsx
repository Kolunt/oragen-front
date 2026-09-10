import React, { FC, useMemo } from 'react';
import { Pagination, SelectForm } from 'ui-kit';
import classNames from 'classnames';
import './PaginationFull.scss';

interface IPaginationFull {
  className?: string;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  numberOfElements: number;
  pageSize: number;
  setPageSize: (value: number) => void;
}

const paginationOptions = [
  { value: '5', label: '5 / стр.' },
  { value: '10', label: '10 / стр.' },
  { value: '20', label: '20 / стр.' },
];

export const PaginationFull: FC<IPaginationFull> = (props) => {
  const {
    className,
    currentPage,
    numberOfElements,
    pageSize,
    setCurrentPage,
    setPageSize,
  } = props;

  const pagesCount: number = useMemo(() => {
    const pages = Math.ceil(numberOfElements / pageSize);

    return pages ? pages : currentPage;
  }, [numberOfElements, pageSize]);

  const changeCurrentPage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const changePageSize = (pageSize: any) => {
    setCurrentPage(1);
    setPageSize(+pageSize.value);
  };

  const defaultPageSize = useMemo(() => {
    return paginationOptions.filter(({ value }) => +value === pageSize);
  }, [pageSize]);

  return (
    <div className={classNames('PaginationFull mt-20', className)}>
      <Pagination
        forcePage={currentPage - 1}
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
