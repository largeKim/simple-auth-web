import React, { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

interface CheckboxType {
  type?: 'normal' | 'transparent';
  titleLabel?: string;
  checked?: boolean;
  onCheckChange?: ChangeEventHandler<HTMLInputElement>;
}
const S = {
  CheckboxWrapper: styled.div`
    display: flex;
    position: relative;
  `,
  Checkbox: styled.input`
    display: none;
    &:checked ~ label {
      & > span {
        &[data-bg-type='normal'] {
          background-color: #4394f0;
          :before,
          :after {
            border: solid #ffffff 0.7px;
            background-color: #ffffff;
          }
        }

        &[data-bg-type='transparent'] {
          background-color: #ffffff;
          :before,
          :after {
            border: solid #4394f0 0.7px;
            background-color: #4394f0;
          }
        }
      }
    }
  `,
  Label: styled.label`
    display: flex;
    align-items: center;
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
  `,
  CustomCheckbox: styled.span`
    margin: 0 12px 0 0;
    width: 24px;
    height: 24px;
    position: relative;
    border-radius: 2px;
    background-color: #c1c7cd;
    &:before {
      content: '';
      position: absolute;
      left: 4px;
      top: 12px;
      width: 5.6px;
      height: 1.4px;
      border: solid #c1c7cd 0.7px;
      background-color: #c1c7cd;
      border-radius: 2.4px;
      transform: rotate(45deg);
    }
    &:after {
      content: '';
      position: absolute;
      right: 8.5px;
      top: 3px;
      width: 1.4px;
      height: 14.1px;
      border: solid #c1c7cd 0.7px;
      background-color: #c1c7cd;
      border-radius: 2.4px;
      transform: rotate(45deg);
    }
    &[data-bg-type='transparent'] {
      background-color: unset !important;
      &:before,
      &:after {
        border-color: #c1c7cd;
        background-color: #c1c7cd;
      }
    }
  `,
};

const Checkbox = (props: CheckboxType) => {
  const uniqId = uuid();
  const { type = 'normal', titleLabel, checked = false, onCheckChange } = props;
  return (
    <S.CheckboxWrapper>
      <S.Checkbox
        id={uniqId}
        type={'checkbox'}
        checked={checked}
        onChange={onCheckChange}
      />
      <S.Label htmlFor={uniqId}>
        <S.CustomCheckbox data-bg-type={type} />
        {titleLabel}
      </S.Label>
    </S.CheckboxWrapper>
  );
};

export type { CheckboxType };
export default Checkbox;
