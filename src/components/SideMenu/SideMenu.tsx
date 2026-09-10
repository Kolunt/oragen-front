import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ROUTES, SideMenuTypes } from 'enums';
import { Icon } from 'ui-kit';
import { useSideBarStore } from 'store/useSideBarStore';
import { SideMenuItem } from './SideMenuItem';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import './SideMenu.scss';

interface ISideMenuProps {
  className?: string;
}

export const SideMenu: FC<ISideMenuProps> = (props) => {
  const { className } = props;
  const isShowTitle = useSideBarStore((state) => state.isShow);
  const setShowTitle = useSideBarStore((state) => state.handleShow);
  const myRole = useUserStore((state) => state.me.roles[0].name);

  const handlerShowTitle = () => {
    setShowTitle(!isShowTitle);
  };

  const setActive = ({ isActive }: any) =>
    isActive
      ? `SideMenu__Item ${
          isShowTitle ? '' : 'SideMenu__Item--small'
        } SideMenu__Item--active`
      : `SideMenu__Item ${isShowTitle ? '' : 'SideMenu__Item--small'}`;

  return (
    <aside className={classNames(className)}>
      <div className='SideMenu'>
        {displayCheck(SideMenuTypes.ADMIN, myRole) && (
          <NavLink className={setActive} to={ROUTES.ADMINISTRATION}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.ADMINISTRATION}
              icon={'AdminTools'}
              tooltipTitle={'Администрирование'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.MAIN, myRole) && (
          <NavLink className={setActive} to={ROUTES.HOME}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.HOME}
              icon={'NavChat'}
              tooltipTitle={'Главная'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.TASKS, myRole) && (
          <NavLink className={setActive} to={ROUTES.TASKS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.TASKS}
              icon={'Tasks'}
              tooltipTitle={'Задачи'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.CALENDAR, myRole) && (
          <NavLink className={setActive} to={ROUTES.CALENDAR}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.CALENDAR}
              icon={'NavCalendar'}
              tooltipTitle={'Календарь'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.GEOTARGETING, myRole) && (
          <NavLink className={setActive} to={ROUTES.GEO_TARGETING}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.GEO_TARGETING}
              icon={'Location'}
              tooltipTitle={'Геотаргетинг'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.VISITS, myRole) && (
          <NavLink className={setActive} to={ROUTES.VISITS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.VISITS}
              icon={'NavFileUser'}
              tooltipTitle={'Визиты'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.PHARMACY_VISITS, myRole) && (
          <NavLink className={setActive} to={ROUTES.PHARMACY_VISITS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.PHARMACY_VISITS}
              icon={'Pharmacy'}
              tooltipTitle={'Визиты в аптеку'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.APPLICATIONS, myRole) && (
          <NavLink className={setActive} to={ROUTES.APPLICATIONS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.APPLICATIONS}
              icon={'NavFileDownload'}
              tooltipTitle={'Заявки'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.CONTACTS, myRole) && (
          <NavLink className={setActive} to={ROUTES.CONTACTS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.CONTACTS}
              icon={'NavContacts'}
              tooltipTitle={'Контакты'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.ORGANIZATIONS, myRole) && (
          <NavLink className={setActive} to={ROUTES.ORGANIZATIONS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.ORGANIZATIONS}
              icon={'NavBank'}
              tooltipTitle={'Организации'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.MEDIA, myRole) && (
          <NavLink className={setActive} to={ROUTES.MEDIA}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.MEDIA}
              icon={'NavFolder'}
              tooltipTitle={'Медиа'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.EVENTS, myRole) && (
          <NavLink className={setActive} to={ROUTES.EVENTS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.EVENTS}
              icon={'NavCalendar'}
              tooltipTitle={'Мероприятия'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.TARGET_LIST, myRole) && (
          <NavLink className={setActive} to={ROUTES.TARGETS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.TARGETS}
              icon={'NavCheckedBox'}
              tooltipTitle={'Таргет-лист'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.TARGET_REPORTS, myRole) && (
          <NavLink className={setActive} to={ROUTES.TARGET_REPORTS}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.TARGET_REPORTS}
              icon={'Book'}
              tooltipTitle={'Таргет-отчеты'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.KPI, myRole) && (
          <NavLink className={setActive} to={ROUTES.KPI}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.KPI}
              icon={'NavAsana'}
              tooltipTitle={'KPI'}
            />
          </NavLink>
        )}
        {displayCheck(SideMenuTypes.MEDRED, myRole) && (
          <NavLink className={setActive} to={ROUTES.MEDRED}>
            <SideMenuItem
              isShowTitle={isShowTitle}
              route={ROUTES.MEDRED}
              icon={'NavAsana'}
              tooltipTitle={'Геолокация'}
            />
          </NavLink>
        )}
        <div className='SideMenu__Button' onClick={handlerShowTitle}>
          {isShowTitle ? <Icon type='ArrowLeft' /> : <Icon type='ArrowRight' />}
        </div>
      </div>
    </aside>
  );
};
