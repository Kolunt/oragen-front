import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Icon } from 'ui-kit';
import './ResponsiveMenu.scss';
import { useOutsideClick } from 'hooks';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';

interface IResponsiveMenuProps {
  visibility: boolean;
  changeVisibility: (value: boolean) => void;
}

export const ResponsiveMenu: FC<IResponsiveMenuProps> = (props) => {
  const { visibility, changeVisibility } = props;
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  const ref = useOutsideClick(() => {
    changeVisibility(false);
  });

  if (!visibility) {
    return null;
  }

  const setActive = ({ isActive }: any) =>
    isActive
      ? 'SidePanelNav__Item SidePanelNav__Item--active'
      : 'SidePanelNav__Item';

  return (
    <aside className='ResponsiveMenu'>
      <div ref={ref}>
        <div className='SidePanel slideInLeft'>
          <div className='SidePanelNav'>
            {displayCheck(SideMenuTypes.ADMIN, myRole) && (
              <NavLink className={setActive} to={ROUTES.ADMINISTRATION}>
                <div className='IconWrapper'>
                  <Icon type='AdminTools' />
                </div>
                <span className='Title'>Администрирование</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.MAIN, myRole) && (
              <NavLink className={setActive} to={ROUTES.HOME}>
                <div className='IconWrapper'>
                  <Icon type='NavChat' />
                </div>
                <span className='Title'>Главная</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.TASKS, myRole) && (
              <NavLink className={setActive} to={ROUTES.TASKS}>
                <div className='IconWrapper'>
                  <Icon type='Tasks' />
                </div>
                <span className='Title'>Задачи</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.CALENDAR, myRole) && (
              <NavLink className={setActive} to={ROUTES.CALENDAR}>
                <div className='IconWrapper'>
                  <Icon type='NavCalendar' />
                </div>
                <span className='Title'>Календарь</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.GEOTARGETING, myRole) && (
              <NavLink className={setActive} to={ROUTES.GEO_TARGETING}>
                <div className='IconWrapper'>
                  <Icon type='Location' />
                </div>
                <span className='Title'>Геотаргетинг</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.VISITS, myRole) && (
              <NavLink className={setActive} to={ROUTES.VISITS}>
                <div className='IconWrapper'>
                  <Icon type='NavFileUser' />
                </div>
                <span className='Title'>Визиты</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.PHARMACY_VISITS, myRole) && (
              <NavLink className={setActive} to={ROUTES.PHARMACY_VISITS}>
                <div className='IconWrapper'>
                  <Icon type='Pharmacy' />
                </div>
                <span className='Title'>Визиты в аптеку</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.APPLICATIONS, myRole) && (
              <NavLink className={setActive} to={ROUTES.APPLICATIONS}>
                <div className='IconWrapper'>
                  <Icon type='NavFileDownload' />
                </div>
                <span className='Title'>Заявки</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.CONTACTS, myRole) && (
              <NavLink className={setActive} to={ROUTES.CONTACTS}>
                <div className='IconWrapper'>
                  <Icon type='NavContacts' />
                </div>
                <span className='Title'>Контакты</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.ORGANIZATIONS, myRole) && (
              <NavLink className={setActive} to={ROUTES.ORGANIZATIONS}>
                <div className='IconWrapper'>
                  <Icon type='NavBank' />
                </div>
                <span className='Title'>Организации</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.MEDIA, myRole) && (
              <NavLink className={setActive} to={ROUTES.MEDIA}>
                <div className='IconWrapper'>
                  <Icon type='NavFolder' />
                </div>
                <span className='Title'>Медиа</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.EVENTS, myRole) && (
              <NavLink className={setActive} to={ROUTES.EVENTS}>
                <div className='IconWrapper'>
                  <Icon type='NavCalendar' />
                </div>
                <span className='Title'>Мероприятия</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.TARGET_LIST, myRole) && (
              <NavLink className={setActive} to={ROUTES.TARGETS}>
                <div className='IconWrapper'>
                  <Icon type='NavCheckedBox' />
                </div>
                <span className='Title'>Таргет-лист</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.TARGET_REPORTS, myRole) && (
              <NavLink className={setActive} to={ROUTES.TARGET_REPORTS}>
                <div className='IconWrapper'>
                  <Icon type='Book' />
                </div>
                <span className='Title'>Таргет-отчеты</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.KPI, myRole) && (
              <NavLink className={setActive} to={ROUTES.KPI}>
                <div className='IconWrapper'>
                  <Icon type='NavAsana' />
                </div>
                <span className='Title'>KPI</span>
              </NavLink>
            )}
            {displayCheck(SideMenuTypes.MEDRED, myRole) && (
              <NavLink className={setActive} to={ROUTES.MEDRED}>
                <div className='IconWrapper'>
                  <Icon type='NavAsana' />
                </div>
                <span className='Title'>Геолокация</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
