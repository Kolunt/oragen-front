import { VisitStatusType } from 'api/visitsApi';

export const getVisitState = (status: VisitStatusType) => {
  switch (status) {
    case 'upcoming':
      return 'Предстоящий';
    case 'live':
      return 'Сейчас идёт';
    default:
      return 'Завершен';
  }
};
