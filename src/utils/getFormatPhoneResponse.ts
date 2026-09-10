export const getFormatPhoneResponse = (phoneNumbers: string) => {
  return +phoneNumbers.replace(/\D/g, '');
};
