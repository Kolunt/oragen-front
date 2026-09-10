export const changedFullName = (fullName: string) => {
  const result = fullName
    .split(' ')
    .map((item, index) => (index !== 0 ? `${item.charAt(0)}.` : item))
    .join(' ');

  return result;
};
