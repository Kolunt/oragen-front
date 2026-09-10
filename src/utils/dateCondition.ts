export const dateCondition = (start: Date, finish: Date) => {
  const timeNow = new Date().getTime();
  const timeStart = start.getTime();
  const timeFinish = finish.getTime();
  return timeStart > timeNow && timeStart < timeFinish;
};
