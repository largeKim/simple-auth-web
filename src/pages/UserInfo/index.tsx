import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import Article from '@components/atoms/Article';
import PrimaryButton from '@components/atoms/PrimaryButton';
import TermsAgree from '@components/molecules/TermsAgree';
import UserInfoSet from '@components/molecules/UserInfoSet';
// @ts-ignore
import { validationPassState } from '@stores/User';

const S = {
  UserInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 24px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  `,
  UserInfoSection: styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 64px;
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
  SafeDescWrapper: styled.div`
    width: 100%;
  `,
  SafeDesc: styled.div`
    width: 204px;
    font-size: 14px;
    line-height: 20px;
  `,
  SafeDescIcon: styled.img``,

  ButtonSection: styled.section`
    margin: 30px 0 20px;
  `,
};

const UserInfoPage = () => {
  const [visibleAgree, setVisibleAgree] = useState(false);
  const validationPass = useRecoilValue(validationPassState);
  return (
    <S.UserInfoWrapper>
      <S.UserInfoSection>
        <S.Title>아래 정보가 필요해요</S.Title>
        <Article bgColor={'#F8F8F8'}>
          <S.SafeDescWrapper>
            <S.SafeDesc>
              고객님의 정보는 <b>안전하게 보호</b>되니 안심하고 입력하세요!
            </S.SafeDesc>
          </S.SafeDescWrapper>
        </Article>
        <UserInfoSet />
      </S.UserInfoSection>
      <S.ButtonSection>
        <PrimaryButton
          onClick={() => {
            setVisibleAgree(true);
          }}
          disabled={!validationPass}
        >
          다음
        </PrimaryButton>
      </S.ButtonSection>
      {visibleAgree && <TermsAgree setVisibleAgree={setVisibleAgree} />}
    </S.UserInfoWrapper>
  );
};

export default UserInfoPage;
