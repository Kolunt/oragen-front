import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { useModalsStore } from 'store/useModalsStore';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate, useNavigate } from 'react-router-dom';
import { MediaFile, UploadFileToS3, useMediaInfoStore } from 'pages';
import { hideLastCharacter } from 'utils/hideLastCharacter';
import { v1 } from 'uuid';
import { ModalDocViewer } from 'components/Modals/ModalDocViewer/ModalDocViewer';
import './MediaInfo.scss';
import { displayCheck } from 'utils';
import { useUserStore } from 'store/useUserStore';

export const MediaInfo = () => {
  const files = useMediaInfoStore((state) => state.files);
  const getFiles = useMediaInfoStore((state) => state.getFiles);
  const titleKey = useMediaInfoStore((state) => state.titleKey);
  const showDocViewer = useModalsStore((state) => state.handleDocViewer);
  const getFileUrl = useMediaInfoStore((state) => state.getFileUrl);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  useEffect(() => {
    getFiles();
  }, [files.length]);

  const onShowDocViewer = (key: string) => {
    getFileUrl(key);
    showDocViewer(true);
  };

  if (!displayCheck(SideMenuTypes.MEDIA, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='MediaPage'>
      <Layout>
        <div className='MediaPage__Content'>
          <div className='Media'>
            {/*     <div className='Media__SearchPanel'>
              <div className='SearchPanel'>
                <SearchForm className='SearchStyle' />
              </div>
            </div>*/}

            <div className='MediaBlock'>
              <div className='FilterPanel'>
                <Breadcrumbs
                  className='m-0'
                  links={[
                    { title: 'Медиа', callback: () => navigate(ROUTES.MEDIA) },
                    { title: hideLastCharacter(titleKey) },
                  ]}
                />
                <div className='Filters'>
                  <UploadFileToS3 />
                </div>
              </div>

              <div className='Folders'>
                {files
                  ?.filter((item) => item !== titleKey)
                  .map((item) => (
                    <MediaFile
                      key={v1()}
                      name={item}
                      showDocViewer={() => onShowDocViewer(item)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <ModalDocViewer />
    </div>
  );
};
