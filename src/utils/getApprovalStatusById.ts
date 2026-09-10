import { VisitApprovalType } from 'api/visitsApi';

export const getApprovalStatusById = (
  id: string
): VisitApprovalType | undefined => {
  switch (id) {
    case '2':
      return 'accepted';
    case '3':
      return 'declined';
    case '4':
      return 'canceled';
    default:
      return undefined;
  }
};

export const getIdByApprovalStatusType = (
  type: VisitApprovalType | undefined
): string => {
  switch (type) {
    case 'accepted':
      return '2';
    case 'declined':
      return '3';
    case 'canceled':
      return '4';
    default:
      return '1';
  }
};
