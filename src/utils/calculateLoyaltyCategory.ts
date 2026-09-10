import { ILoyaltyRange } from 'api/targetListApi';

export const calculateLoyaltyCategory = (
  loyaltyRange?: ILoyaltyRange[],
  loyalty?: number
) => {
  if (!loyaltyRange || !loyalty) return '-';
  const range = loyaltyRange.filter((item) => item.to >= 0 && item.from >= 0);

  for (let i = 0; i < range.length; i++) {
    if (loyalty >= range[i].from && loyalty <= range[i].to) {
      return range[i].name;
    }
  }
  return '-';
};
