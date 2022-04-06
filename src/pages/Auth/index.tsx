import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

// @ts-ignore
import {
  signGuidesState,
  signRequestState,
  SignResponseType,
  serverTimeState,
  timeExpiredState,
} from '@stores/Auth';
import Article from '@components/atoms/Article';
import PrimaryButton from '@components/atoms/PrimaryButton';
import Timer from '@components/atoms/Timer';
import { fetcher } from '@app';
import { userInfoListState } from '@stores/User';

const S = {
  AuthWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  `,
  AuthTopSection: styled.section``,
  AuthHeaderArticle: styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
    padding: 0 24px;
    word-break: keep-all;
    @media (max-height: 640px) {
      margin-top: 0;
    }
  `,
  Title: styled.h1`
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    width: 260px;
    margin: 0 0 20px;
  `,
  Divider: styled.div`
    background-color: #f2f4f8;
    height: 12px;
    width: 100%;
    margin: 32px 0 36px;
  `,
  UsageInfoDescSection: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > article {
      width: 295px;
      padding-left: 0 !important;
    }
  `,
  KakaoUsageDescWrapper: styled.div`
    width: 100%;
    align-items: center;
  `,
  KakaoUsageDesc: styled.div`
    width: 171px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      color: #343a3f;
      margin: 0 0 8px;
      text-align: center;
    }
    p {
      font-size: 14px;
      line-height: 19.6px;
      color: #878d96;
      word-break: keep-all;
      margin: 0;
    }
  `,
  KakaoUsageDescIcon: styled.img`
    width: 88px;
    height: 88px;
  `,
  ButtonSection: styled.section`
    margin: 30px 24px 20px;
  `,
};

const AuthPage = () => {
  const navigate = useNavigate();
  const userInfoList = useRecoilValue(userInfoListState);
  const setSignRequest = useSetRecoilState(signRequestState);

  const signGuides = useRecoilValue(signGuidesState);

  const [isTimeExpired, setIsTimeExpire] = useRecoilState(timeExpiredState);

  const retrySignRequest = useCallback(async () => {
    const { data, error } = await fetcher<unknown, SignResponseType>({
      method: 'POST',
      url: 'easysign/request',
    });
    if (data) {
      setSignRequest(data);
    }
    if (error) {
      alert(`${error.message}`);
    }
  }, [setSignRequest]);

  useEffect(() => {
    retrySignRequest();
  }, [retrySignRequest]);

  const signComplete = async () => {
    const { name, phoneNumber, regNumber } = userInfoList;
    const { ok, error } = await fetcher({
      method: 'POST',
      url: 'sign/complete',
      body: {
        name: name.value,
        phoneNumber: phoneNumber.value,
        regNumber: regNumber.value,
      },
    });
    if (ok) {
      navigate('/result', { replace: true });
    }
    if (error) {
      alert(`${error.message}`);
      navigate('/', { replace: true });
    }
  };

  return (
    <S.AuthWrapper>
      <S.AuthTopSection>
        <S.AuthHeaderArticle>
          <S.Title>간편인증 요청을 보냈습니다</S.Title>
          <Timer />
        </S.AuthHeaderArticle>
        <S.Divider />
        <S.UsageInfoDescSection>
          {signGuides &&
            signGuides.map((article: any) => (
              <Article bgColor={'unset'} key={uuid()}>
                <S.KakaoUsageDescWrapper>
                  <S.KakaoUsageDescIcon src={article.image} />
                  <S.KakaoUsageDesc>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                  </S.KakaoUsageDesc>
                </S.KakaoUsageDescWrapper>
              </Article>
            ))}
        </S.UsageInfoDescSection>
      </S.AuthTopSection>

      <S.ButtonSection>
        <PrimaryButton
          onClick={() => {
            if (isTimeExpired) {
              alert('인증시간이 지났습니다.\n인증을 다시 시도해주세요.');
              retrySignRequest();
              setIsTimeExpire(false);
            } else {
              signComplete();
            }
          }}
        >
          다음
        </PrimaryButton>
      </S.ButtonSection>
    </S.AuthWrapper>
  );
};

export default AuthPage;
