import { SideMenuType, SideMenuTypes } from 'enums/SideMenuTypes';
import { RoleType, RoleTypes } from 'enums/RoleTypes';

export const displayCheck = (page: SideMenuType, role: RoleType) => {
  switch (page) {
    case SideMenuTypes.ADMIN:
      return role === RoleTypes.ORG_ADMIN;
    case SideMenuTypes.MAIN:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.TASKS:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.PROJECTS:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.CALENDAR:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.GEOTARGETING:
      return false;
    case SideMenuTypes.VISITS:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.PHARMACY_VISITS:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.APPLICATIONS:
      return [RoleTypes.ANALYST, RoleTypes.MARKETER, RoleTypes.TRAINER].every(
        (item) => item !== role
      );
    case SideMenuTypes.CONTACTS:
      return [
        RoleTypes.ANALYST,
        RoleTypes.MARKETER,
        RoleTypes.TRAINER,
        RoleTypes.CALL_CENTER,
      ].every((item) => item !== role);
    case SideMenuTypes.ORGANIZATIONS:
      return [
        RoleTypes.ANALYST,
        RoleTypes.MARKETER,
        RoleTypes.TRAINER,
        RoleTypes.CALL_CENTER,
      ].every((item) => item !== role);
    case SideMenuTypes.MEDIA:
      return [
        RoleTypes.MED_REP,
        RoleTypes.HEAD_OF_BRICK,
        RoleTypes.TRAINER,
        RoleTypes.CALL_CENTER,
      ].every((item) => item !== role);
    case SideMenuTypes.EVENTS:
      return role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.TARGET_LIST:
      return [
        RoleTypes.MED_REP,
        RoleTypes.TRAINER,
        RoleTypes.CALL_CENTER,
      ].every((item) => item !== role);
    case SideMenuTypes.TARGET_REPORTS:
      return [
        RoleTypes.MED_REP,
        RoleTypes.TRAINER,
        RoleTypes.CALL_CENTER,
      ].every((item) => item !== role);
    case SideMenuTypes.KPI:
      return role !== RoleTypes.TRAINER && role !== RoleTypes.CALL_CENTER;
    case SideMenuTypes.MEDRED:
      return role === RoleTypes.ORG_ADMIN;
    default:
      return false;
  }
};
