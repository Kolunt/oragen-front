import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Button, Title } from 'ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { useNewTargetReportStore } from 'store/useNewTargetReportStore';
import { NewSectionCustomField } from 'pages';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { NewSelectionCheckBoxOrRadio } from './sections/NewSelectionCheckBoxOrRadio/NewSelectionCheckBoxOrRadio';
import { InputFormWithValidation } from './Components/InputFormWithValidation/InputFormWithValidation';
import { fetchCreatePoll, ICreatePollPayload } from '../../../api/pollsApi';
import './NewTargetReportPage.scss';
import { displayCheck } from 'utils';
import { useUserStore } from 'store/useUserStore';

const isEmptyArray = (arr: Array<string | undefined>) => {
  return arr.every((item) => item === undefined);
};

export const NewTargetReportPage = () => {
  const newTargetReport = useNewTargetReportStore(
    (state) => state.newTargetReport
  );
  const reset = useNewTargetReportStore((state) => state.reset);
  const addSection = useNewTargetReportStore((state) => state.addSection);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  useEffect(() => {
    reset();
  }, []);

  const onReset = () => {
    reset();
    navigate(ROUTES.TARGET_REPORTS);
  };

  const isEmptyQuestions = useMemo(() => {
    const idEmptyQuestions = newTargetReport.map((item) => {
      if (
        item.question.length === 0 ||
        (item.type !== 'field' && item.variants.length === 0) ||
        (item.type !== 'field' && isEmptyArray(item.variants)) ||
        (item.type !== 'field' && !item.variants.every((i) => i.length > 0))
      ) {
        return item.id;
      }
    });
    return isEmptyArray(idEmptyQuestions);
  }, [newTargetReport]);

  const onCreateReport = useCallback(async () => {
    const filteredQuestions = newTargetReport.map((item) => {
      let { id, ...rest } = item;
      return rest;
    });
    const payload: ICreatePollPayload = {
      name: title,
      questions: filteredQuestions,
    };
    if (newTargetReport && newTargetReport.length > 0 && isEmptyQuestions) {
      await fetchCreatePoll(payload);
      navigate(ROUTES.TARGET_REPORTS);
    }
  }, [newTargetReport, title]);

  const disabledBtnCreateReport = useMemo(() => {
    return (
      !title.length ||
      !newTargetReport.length ||
      !isEmptyQuestions ||
      title.trim() == ''
    );
  }, [title, newTargetReport, isEmptyQuestions]);

  if (!displayCheck(SideMenuTypes.TARGET_REPORTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='NewTargetReportPage flex-container'>
      <Layout>
        <div className='mb-20 flex justify-space-between'>
          <Title>Cоздание шаблона отчёта</Title>
        </div>
        <div className='NewTargetReportPage__Report flex justify-space-between h-full hidden'>
          <div className='flex-container w-full pr-20'>
            <ScrollBar>
              <InputFormWithValidation
                className='Title'
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                label='Название отчета'
                placeholder='Введите название'
              />

              {newTargetReport.map((section) => {
                if (section.type === 'field') {
                  return (
                    <NewSectionCustomField key={section.id} data={section} />
                  );
                }
                if (section.type === 'checkbox') {
                  return (
                    <NewSelectionCheckBoxOrRadio
                      key={section.id}
                      data={section}
                    />
                  );
                }
                if (section.type === 'radio') {
                  return (
                    <NewSelectionCheckBoxOrRadio
                      key={section.id}
                      data={section}
                      isRadio={true}
                    />
                  );
                }
              })}
            </ScrollBar>
            <div className='mt-30 flex gap-x-20'>
              <Button
                onClick={onCreateReport}
                disabled={disabledBtnCreateReport}
              >
                Создать отчёт
              </Button>
              <Button className='ButtonCancel' onClick={onReset}>
                Отмена
              </Button>
            </div>
          </div>
          <div className='flex flex-column border-grey-left pl-20'>
            <Button
              className='SmallButton mb-10 pointer'
              onClick={() => addSection('checkbox')}
            >
              CHECKBOX
            </Button>
            <Button
              className='SmallButton mb-10 pointer'
              onClick={() => addSection('radio')}
            >
              RADIO
            </Button>
            <Button
              className='SmallButton mb-10 pointer'
              onClick={() => addSection('field')}
            >
              CUSTOM FIELD
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
};
