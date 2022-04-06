import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type PrimaryButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

const S = {
  Button: styled.button`
    width: 100%;
    min-height: 54px;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    background-color: #4394f0;
    cursor: pointer;
    font-size: 17px;
    font-weight: 700;
    :disabled {
      background-color: #dde1e6;
      cursor: not-allowed;
    }
  `,
};

const PrimaryButton = (props: PrimaryButtonType) => {
  return <S.Button {...props} />;
};

export default PrimaryButton;
