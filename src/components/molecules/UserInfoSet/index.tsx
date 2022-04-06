import React, { useRef } from 'react';
import styled from '@emotion/styled';

import TextInput from '@components/atoms/TextInput';
import NidNumInput from '@components/atoms/NidNumInput';
import useUserInfo from '@hooks/useUserInfo';

const S = {
  InputForm: styled.form`
    margin: 16px 0;
    & > div {
      padding: 16px 0;

      b {
        color: #4394f0;
      }
    }
  `,
};

const UserInfoSet = () => {
  const { userInfoList, setUserInfo } = useUserInfo();
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const nidNumberInputRef = useRef<HTMLInputElement>(null);

  return (
    <S.InputForm>
      <TextInput
        autoFocus
        type={'text'}
        titleLabel={'이름'}
        invalid={userInfoList.name.invalid}
        description={
          <div>
            <b>TIP</b> 닉네임이 아닌 실명인지 확인해주세요.
          </div>
        }
        defaultValue={userInfoList.name.value}
        onChange={(e) => setUserInfo(e.target.value, 'name')}
        onKeyPress={(e) => {
          if (e?.code === 'Enter' && mobileInputRef?.current) {
            mobileInputRef.current.focus();
          }
        }}
      />
      <TextInput
        type={'number'}
        titleLabel={'휴대폰 번호'}
        invalid={userInfoList.phoneNumber.invalid}
        description={''}
        defaultValue={userInfoList.phoneNumber.value}
        onChange={(e) => setUserInfo(e.target.value, 'phoneNumber')}
        onKeyPress={(e) => {
          if (e?.code === 'Enter' && nidNumberInputRef?.current) {
            nidNumberInputRef.current.focus();
          }
        }}
        pattern="\d*"
        ref={mobileInputRef}
      />
      <NidNumInput
        invalid={userInfoList.regNumber.invalid}
        defaultValue={userInfoList.regNumber.value}
        onInputChange={(changedValue) => {
          setUserInfo(changedValue, 'regNumber');
        }}
        ref={nidNumberInputRef}
      />
    </S.InputForm>
  );
};

export default UserInfoSet;
