import dayjs, { OpUnitType, QUnitType } from 'dayjs';

export const SECONDS_OF_ONE_MINUTES = 60;

export const getCurrentTime = () => {
  return Date.parse(new Date().toISOString());
};

export const getMilliSecAfter = (fromMilliSec: number, minutes: number) =>
  Date.parse(dayjs(fromMilliSec).add(minutes, 'minute').toISOString());

export const getMilliSecAfterNow = (minutes = 0) =>
  getMilliSecAfter(getCurrentTime(), minutes);

export const getDiffSecs = (
  startMs: number,
  endMs: number,
  unit: QUnitType | OpUnitType = 'second',
) => {
  return dayjs(startMs).diff(endMs, unit);
};

export const getLeftPadTime = (ms = 0) => {
  return `0${Math.floor(ms)}`.slice(-2);
};
