import React, { memo, useEffect, useMemo, useState } from 'react';
import { NewApplication, NewTarget, NewTask, NewVisit } from 'components';
import dayjs from 'dayjs';
import { useUserStore } from 'store/useUserStore';
import { v1 } from 'uuid';
import { useNewsStore } from 'pages/HomePage/useNewsStore';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { NewsItem } from './NewsTypes/News/NewsItem';
import { ModalAddNews } from './Components/ModalAddNews/ModalAddNews';
import { Title } from 'ui-kit';
import { createNews, ICreateNews } from 'api/newsApi';
import './News.scss';

export const News = () => {
  const allApplication = useNewsStore((state) => state.allApplication);
  const getAllApplication = useNewsStore((state) => state.getAllApplication);
  const newTasks = useNewsStore((state) => state.newTasks);
  const getNewTasks = useNewsStore((state) => state.getNewTasks);
  const getNewVisits = useNewsStore((state) => state.getNewVisits);
  const targetsLocal = useNewsStore((state) => state.targetsLocal);
  const getTargetListLocalById = useNewsStore(
    (state) => state.getTargetListLocalById
  );
  const news = useNewsStore((state) => state.news);
  const getNews = useNewsStore((state) => state.getNews);
  const newVisits = useNewsStore((state) => state.newVisits);
  const getListNews = useNewsStore((state) => state.getListNews);
  const me = useUserStore((state) => state.me);

  const isMedRep = me.roles[0].id === 8;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllApplication();
    getNewTasks();
    getNews();
    // getListNews()
  }, []);

  useEffect(() => {
    if (isMedRep) {
      getNewVisits(me.id);
    } else {
      // @ts-ignore
      getNewVisits();
    }
  }, [me]);

  const idTargetVisits = useMemo(() => {
    const id: number[] = [];
    newVisits.map((item) => {
      if (item.target_list_id) {
        id.push(item.target_list_id);
      }
    });
    // @ts-ignore
    return id.filter((element, index) => id.indexOf(element) === index);
  }, [newVisits]);

  useEffect(() => {
    getTargetListLocalById(idTargetVisits);
  }, [idTargetVisits]);

  const allNews = useMemo(() => {
    return allApplication
      .map((item) => {
        return { type: 'application', ...item };
      })
      .concat(
        // @ts-ignore
        newTasks?.map((item) => {
          return { type: 'tasks', ...item };
        })
      )
      .concat(
        // @ts-ignore
        newVisits.map((item) => {
          return {
            type: 'visit',
            ...item,
          };
        })
      )
      .concat(
        // @ts-ignore
        targetsLocal.map((item) => {
          return {
            // @ts-ignore
            type: 'targetsLocal',
            ...item,
          };
        })
      )
      .concat(
        // @ts-ignore
        news.map((item) => {
          return {
            // @ts-ignore
            type: 'news',
            ...item,
          };
        })
      )
      .sort((a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix());
  }, [newTasks, allApplication, newVisits, targetsLocal, news]);

  const addNew = async (payload: ICreateNews) => {
    const { title, text } = payload;
    try {
      await createNews({
        title: title,
        text: text,
      });
      getNews();
    } catch (e) {
      console.error(e);
    }
  };

  const RenderNews = memo(() => {
    return (
      <>
        {allNews.map((item) => {
          if (item?.type === 'application') {
            return <NewApplication key={v1()} application={item} />;
          } else if (item?.type === 'tasks') {
            // @ts-ignore
            return <NewTask key={v1()} task={item} />;
          } else if (item?.type === 'visit') {
            // @ts-ignore
            if (item.target_list_id === null) {
              // @ts-ignore
              return <NewVisit key={v1()} visit={item} />;
            }
          } else if (item?.type === 'targetsLocal') {
            // @ts-ignore
            return <NewTarget key={v1()} target={item} />;
          } else if (item?.type === 'news') {
            // @ts-ignore
            return <NewsItem key={v1()} news={item} />;
          }
        })}
      </>
    );
  });

  return (
    <>
      <div className='flex items-center justify-space-between mb-15'>
        <Title>Новости: </Title>
        <div className='btn min transparent' onClick={() => setShowModal(true)}>
          Добавить новость
        </div>
      </div>
      <div className='News relative'>
        <ScrollBar>
          <RenderNews />
        </ScrollBar>
        <ModalAddNews
          onCloseModal={() => setShowModal(false)}
          showModal={showModal}
          getPayload={(payload) => addNew(payload)}
        />
      </div>
    </>
  );
};
