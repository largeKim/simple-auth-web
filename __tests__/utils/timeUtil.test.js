import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

import {
  getCurrentTime,
  getDiffSecs,
  getLeftPadTime,
  getMilliSecAfter,
  SECONDS_OF_ONE_MINUTES,
} from '../../src/utils/timeUtils';

describe('getCurrentTime()', () => {
  it('현재 시간을 정상적으로 가져온다', () => {
    const result = getCurrentTime();
    expect(result).toBeTruthy();
    expect(typeof result).toBe('number');
  });
});

describe('getDiffSecs()', () => {
  let addedMinute = 10;
  const currentTime = getCurrentTime();

  it(`현재시간에서 ${addedMinute}분 추가후 mm:ss 형태로 표시할 수 있다.`, () => {
    const addedMilliSec = getMilliSecAfter(currentTime, addedMinute);

    const diffSecs = getDiffSecs(addedMilliSec, currentTime);
    expect(
      `${getLeftPadTime(diffSecs / SECONDS_OF_ONE_MINUTES)}:${getLeftPadTime(
        diffSecs % SECONDS_OF_ONE_MINUTES,
      )}`,
    ).toBe(`${addedMinute}:00`);
  });
});

describe('isManipulateTime()', () => {
  describe('이용자의 타임존이 서버와 다를경우', () => {
    // @TODO 테스트 추가필요
    it('', () => {
      const serverTime = dayjs().tz('Asia/Seoul').format();
      const clientTime = dayjs().tz('America/New_York').format();
    });
  });
});
