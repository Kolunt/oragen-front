import { VisitType } from 'store/useVisitsStore';
import { AdminActivityType } from 'pages/CalendarPage/useCalendarStore';
import { EventTypes } from 'enums';

export const getEventFromType = (
  type: VisitType | EventTypes | AdminActivityType
) => {
  let title = '';
  let color = '#000';

  switch (type) {
    case 'remoteVisit':
      title = 'Дистанционный визит';
      color = '#ed6747';
      break;
    case 'doctorVisit':
      title = 'Встреча с врачом';
      color = '#4bb44b';
      break;
    case 'pharmacyVisit':
      title = 'Визит в аптеку';
      color = '#684D08';
      break;
    case 'videoConferencing':
      title = 'Видеоконференция';
      color = '#6438E0';
      break;
    case 'roundTables':
      title = 'Круглый стол';
      color = '#54a3f2';
      break;
    case 'onlineResidents':
      title = 'Онлайн-ординаторская';
      color = '#49c706';
      break;
    case 'holiday':
      title = 'Отпуск';
      color = '#99E000';
      break;
    case 'hospital':
      title = 'Больничный';
      color = '#F54A00';
      break;
    case 'training':
      title = 'Тренинг';
      color = '#2d81e0';
      break;
    case 'call':
      title = 'Видеоконференция';
      color = '#225ac8';
      break;
    default:
      break;
  }
  return { title, color };
};
