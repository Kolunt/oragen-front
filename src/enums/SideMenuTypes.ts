export enum SideMenuTypes {
  ADMIN = 'admin',
  MAIN = 'main',
  TASKS = 'tasks',
  PROJECTS = 'projects',
  CALENDAR = 'calendar',
  GEOTARGETING = 'geotargeting',
  VISITS = 'visits',
  PHARMACY_VISITS = 'pharmacyVisits',
  APPLICATIONS = 'applications',
  CONTACTS = 'contacts',
  ORGANIZATIONS = 'organizations',
  MEDIA = 'media',
  EVENTS = 'events',
  TARGET_LIST = 'targetList',
  TARGET_REPORTS = 'targetReports',
  KPI = 'kpi',
  MEDRED = 'medred',
}

export type SideMenuType =
  | SideMenuTypes.ADMIN
  | SideMenuTypes.MAIN
  | SideMenuTypes.TASKS
  | SideMenuTypes.PROJECTS
  | SideMenuTypes.CALENDAR
  | SideMenuTypes.GEOTARGETING
  | SideMenuTypes.VISITS
  | SideMenuTypes.PHARMACY_VISITS
  | SideMenuTypes.APPLICATIONS
  | SideMenuTypes.CONTACTS
  | SideMenuTypes.ORGANIZATIONS
  | SideMenuTypes.MEDIA
  | SideMenuTypes.EVENTS
  | SideMenuTypes.TARGET_LIST
  | SideMenuTypes.TARGET_REPORTS
  | SideMenuTypes.KPI
  | SideMenuTypes.MEDRED;
