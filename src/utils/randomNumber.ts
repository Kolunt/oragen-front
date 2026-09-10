export const randomNumber = (len: number) => {
  let charSet = '123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.charAt(randomPoz);
  }
  return +randomString;
};
