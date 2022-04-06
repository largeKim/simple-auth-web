import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useTimer } from '@hooks/useTimer';
import {
  SECONDS_OF_ONE_MINUTES,
  getMilliSecAfterNow,
  getLeftPadTime,
  getDiffSecs,
} from '@utils/timeUtils';
import { signRequestState, timeExpiredState } from '@stores/Auth';

const S = {
  TimerWrapper: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 82px;
    height: 24px;
    background-color: #f2f4f8;
    border-radius: 4px;
    padding: 0 5px;
    color: #878d96;
    &[data-warning='true'] {
      background-color: #fff2f2;
      color: #e85440;
      & > span {
        background-color: #e85440;
      }
    }
  `,
  TimerIcon: styled.span`
    position: relative;
    width: 13.33px;
    height: 13.33px;
    background-color: #a2a9b0;
    border-radius: 13px;
    margin: 0 5.33px;
    :before {
      content: '';
      position: absolute;
      left: 2.83px;
      top: 6.165px;
      width: 3.33px;
      height: 0px;
      border: 0.5px solid #ffffff;
      border-radius: 1px;
      background-color: #ffffff;
    }
    :after {
      content: '';
      position: absolute;
      left: 6.165px;
      top: 2px;
      width: 0px;
      height: 4px;
      border: 0.5px solid #ffffff;
      border-radius: 1px;
      background-color: #ffffff;
    }
  `,
  TimeSection: styled.section`
    font-weight: 700;
    font-size: 16px;
    color: inherit;
    text-align: center;
    letter-spacing: 0.01em;
  `,
};
const Timer = () => {
  const signRequest = useRecoilValue(signRequestState);
  const setTimeExpired = useSetRecoilState(timeExpiredState);
  const resetTimeExpired = useResetRecoilState(timeExpiredState);

  const { timeRemain, animate } = useTimer(600);

  useEffect(() => {
    if (signRequest) {
      animate(
        getMilliSecAfterNow(
          getDiffSecs(
            Date.parse(signRequest.expiredAt),
            Date.parse(signRequest.startedAt),
            'minutes',
          ),
        ),
      );
    }
  }, [signRequest]);

  useEffect(() => {
    if (signRequest && timeRemain === 0) {
      setTimeExpired(timeRemain === 0);
    }
    return () => {
      resetTimeExpired();
    };
  }, [timeRemain]);

  return (
    <S.TimerWrapper data-warning={timeRemain <= 10}>
      <S.TimerIcon />
      <S.TimeSection>
        {getLeftPadTime(timeRemain / SECONDS_OF_ONE_MINUTES)}:
        {getLeftPadTime(timeRemain % SECONDS_OF_ONE_MINUTES)}
      </S.TimeSection>
    </S.TimerWrapper>
  );
};

export default Timer;
