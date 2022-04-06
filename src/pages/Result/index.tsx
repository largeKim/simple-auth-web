import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { v4 as uuid } from 'uuid';

import { userInfoListState } from '@stores/User';
import Article from '@components/atoms/Article';
import { IncomeListKr, taxIncomeState, taxOfficeState } from '@stores/Result';

const S = {
  ResultWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 24px 16px;
    position: relative;
  `,
  ResultTopSection: styled.section`
    margin: 64px 0 16px;
  `,
  CompleteIcon: styled.div`
    width: 43px;
    height: 43px;
    background-color: #90d105;
    border-radius: 21.5px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 16px;
      top: 11px;
      width: 8px;
      height: 13px;
      border-width: 0 3px 3px 0;
      border-style: solid;
      border-color: #ffffff;
      transform: rotate(45deg);
    }
  `,
  Title: styled.h1`
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    margin: 16px 0;
  `,
  SubDesc: styled.h2`
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #697077;
    margin: 0;
  `,
  UserInfoWrapper: styled.article`
    margin: 16px 0;
  `,
  IncomeWrapper: styled.article`
    margin: 16px 0;
  `,
  TaxOfficeWrapper: styled.article`
    margin: 16px 0;
  `,
  InnerSection: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Label: styled.label`
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 16px;
  `,
  ValueSection: styled.section`
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
  `,
  ValueLabel: styled.label`
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  `,
  Value: styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  `,
};
const ResultPage = () => {
  const userInfoList = useRecoilValue(userInfoListState);
  const taxIncome = useRecoilValue(taxIncomeState);
  const taxOffice = useRecoilValue(taxOfficeState);
  return (
    <S.ResultWrapper>
      <S.ResultTopSection>
        <S.CompleteIcon />
        <S.Title>인증 완료</S.Title>
        <S.SubDesc>본인인증이 완료되었습니다.</S.SubDesc>
      </S.ResultTopSection>
      <S.UserInfoWrapper>
        <Article bgColor={'#F0F4FA'}>
          <S.InnerSection>
            <S.Label>기본정보</S.Label>
            <S.ValueSection>
              <S.ValueLabel>이름</S.ValueLabel>
              <S.Value>{userInfoList['name'].value}</S.Value>
            </S.ValueSection>
            <S.ValueSection>
              <S.ValueLabel>휴대폰 번호</S.ValueLabel>
              <S.Value>{userInfoList['phoneNumber'].value}</S.Value>
            </S.ValueSection>
            <S.ValueSection>
              <S.ValueLabel>주민등록 번호</S.ValueLabel>
              <S.Value>
                {userInfoList['regNumber'].value.substring(0, 6)}&nbsp;-&nbsp;
                {userInfoList['regNumber'].value.substring(6, 7)}******
              </S.Value>
            </S.ValueSection>
          </S.InnerSection>
        </Article>
      </S.UserInfoWrapper>
      <S.IncomeWrapper>
        <Article bgColor={'#F8F8F8'}>
          <S.InnerSection>
            <S.Label>detail</S.Label>
            {taxIncome.map((value) => (
              <S.ValueSection key={uuid()}>
                <S.ValueLabel>{IncomeListKr[value.type]}</S.ValueLabel>
                <S.Value>{value.amount.toLocaleString()}원</S.Value>
              </S.ValueSection>
            ))}
          </S.InnerSection>
        </Article>
      </S.IncomeWrapper>
      <S.TaxOfficeWrapper>
        <Article bgColor={'#F0F4FA'}>
          <S.InnerSection>
            <S.Label>안내</S.Label>
            <S.ValueSection>
              <S.ValueLabel>tax office</S.ValueLabel>
              <S.Value>{taxOffice.name}</S.Value>
            </S.ValueSection>
            <S.ValueSection>
              <S.ValueLabel>contact</S.ValueLabel>
              <S.Value>{taxOffice.phone}</S.Value>
            </S.ValueSection>
          </S.InnerSection>
        </Article>
      </S.TaxOfficeWrapper>
    </S.ResultWrapper>
  );
};

export default ResultPage;
