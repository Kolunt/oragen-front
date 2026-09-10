export const getDateString = (jsonDate: any) => {
  let when = new Date();
  if (jsonDate) {
    when = new Date(Date.parse(jsonDate));
  }
  let dateString =
    ('0' + when.getUTCHours()).slice(-2) +
    ':' +
    ('0' + when.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + when.getUTCSeconds()).slice(-2);
  return dateString;
};
