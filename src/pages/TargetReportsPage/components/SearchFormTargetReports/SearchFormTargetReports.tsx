import React, { FC } from 'react';
import { Button, SearchForm } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import 'pages/TargetReportsPage/components/SearchFormTargetReports/SearchFormTargetReports.scss';

interface ISearchFormTargetReports {}

export const SearchFormTargetReports: FC<ISearchFormTargetReports> = (
  props
) => {
  const {} = props;
  const navigate = useNavigate();
  return (
    <div className='SearchFormTargetReports'>
      <div className='Form'>
        <SearchForm className='SearchStyle' />
        <Button className='ButtonReset'>Сброс параметров</Button>
      </div>
      <div className='ButtonWrapper'>
        <Button
          className='ButtonCreate'
          onClick={() => navigate(ROUTES.NEW_TARGET_REPORT)}
        >
          Создать отчёт
        </Button>
      </div>
    </div>
  );
};
