import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

type TextInputType = {
  type: 'text' | 'number';
  titleLabel?: string;
  description?: string | JSX.Element;
  invalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const S = {
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    &[data-invalid='true'] {
      & > input {
        border-color: red;
      }
      & > section {
        color: red;
      }
    }
  `,
  Label: styled.label`
    line-height: 20px;
    font-size: 14px;
  `,
  Input: styled.input`
    border: none;
    border-bottom: 1px solid #dde1e6;
    padding: 8.5px 16px;
    line-height: 27px;
    font-weight: 700;
    font-size: 18px;
    :focus-visible {
      outline: none;
      border-bottom-color: #000000 !important;
    }
  `,
  Descriptor: styled.section`
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
  `,
};

const TextInput = forwardRef(
  (props: TextInputType, ref: ForwardedRef<HTMLInputElement>) => {
    const uniqId = uuid();

    return (
      <S.InputWrapper data-invalid={props.invalid}>
        <S.Label htmlFor={uniqId}>{props.titleLabel}</S.Label>
        <S.Input
          ref={ref}
          {...props}
          id={uniqId}
          defaultValue={props.defaultValue}
          onKeyPress={props.onKeyPress}
        />
        <S.Descriptor>
          {props.invalid
            ? `올바른 ${props.titleLabel}를 입력하세요.`
            : props.description}
        </S.Descriptor>
      </S.InputWrapper>
    );
  },
);

export type {};
export default TextInput;
