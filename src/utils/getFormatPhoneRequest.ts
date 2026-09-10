export const getFormatPhoneRequest = (phoneNumbers: string) => {
  let pattern =
    /(\+7|8|7)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
  return phoneNumbers.replace(pattern, '+7 ($2) $3-$4-$5');
};
