import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Icon, Title } from 'ui-kit';
import { v1 } from 'uuid';
import { ModalAddFolder } from 'components/Modals/ModalAddFolder/ModalAddFolder';
import { useModalsStore } from 'store/useModalsStore';
import { useMediaStore } from 'pages/MediaPage/useMediaStore';
import { Folder } from 'pages/MediaPage/components';
import { ModalRemoveFolder } from 'components/Modals/ModalRemoveFolder/ModalRemoveFolder';
import { useUserStore } from 'store/useUserStore';
import { Navigate } from 'react-router-dom';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import './MediaPage.scss';

export const MediaPage = () => {
  const folders = useMediaStore((state) => state.folders);
  const getFolders = useMediaStore((state) => state.getFolders);
  const showModalAdd = useModalsStore((state) => state.handleAddFolder);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  useEffect(() => {
    getFolders();
  }, [folders.length]);

  if (!displayCheck(SideMenuTypes.MEDIA, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='MediaPage'>
      <Layout>
        <div className='MediaPage__Content'>
          <div className='Media'>
            {/*        <div className='Media__SearchPanel'>
              <div className='SearchPanel'>
                <SearchForm className='SearchStyle' />
              </div>
            </div>*/}

            <div className='MediaBlock'>
              <div className='FilterPanel'>
                <Title>Медиа</Title>
                <div className='Filters'>
                  <div
                    className='Filters__Item'
                    onClick={() => showModalAdd(true)}
                  >
                    <Icon type='MediaPlus' />
                    <span>Создать папку</span>
                  </div>

                  {/*<div className='Filters__Item'>
                    <Icon type='MediaCheck' />
                    <span>Выделить все</span>
                  </div>*/}

                  {/*<div className='Filters__Item Download'>
                    <Icon type='MediaDownload' />
                    <span>Скачать</span>
                  </div>*/}

                  {/*<div className='Filters__Item Select'>
                    <Icon type='MediaTile' />
                    <span>По дате</span>
                    <Icon type='MediaArrowDown' />
                  </div>*/}

                  {/*<div className='Filters__Item Select'>
                    <Icon type='MediaApps' />
                    <Icon type='MediaArrowDown' />
                  </div>*/}
                </div>
              </div>

              <div className='Folders'>
                {folders?.map((item) => (
                  <Folder key={v1()} name={item} />
                ))}
                {/*<Folder/>*/}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <ModalAddFolder />
      <ModalRemoveFolder />
    </div>
  );
};
