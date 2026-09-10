import { VisitApprovalType } from 'api/visitsApi';

export const getBorderStyleVisit = (status: VisitApprovalType) => {
  switch (status) {
    case 'accepted':
      return 'border-positive';
    case 'declined':
      return 'border-negative';
    case 'canceled':
      return 'border-blue';
    default:
      return 'border-grey';
  }
};
