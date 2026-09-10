import { VisitApprovalType } from 'api/visitsApi';

export const getVisitApprovalStatus = (status: VisitApprovalType) => {
  switch (status) {
    case 'accepted':
      return 'Принят';
    case 'declined':
      return 'Отклонен';
    case 'canceled':
      return 'Отменен';
    default:
      return 'Не назначен';
  }
};
