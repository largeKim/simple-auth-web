import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

interface NidNumInputType {
  titleLabel?: string;
  description?: string | JSX.Element;
  defaultValue?: string;
  onInputChange?: (changedValue: string) => void;
  invalid?: boolean;
}

const S = {
  NidNumInputWrapper: styled.div`
    &[data-invalid='true'] {
      input {
        border-bottom-color: red;
      }
      section {
        color: red;
      }
    }
  `,
  Label: styled.label`
    line-height: 20px;
    font-size: 14px;
  `,
  InputSection: styled.section`
    display: flex;
    align-items: center;
    margin-top: 8px;
  `,
  Input: styled.input`
    width: 100%;
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
    &[data-type='security'] {
      -webkit-text-security: disc;
    }
  `,
  NidDivider: styled.span`
    margin: 0 15px;
    color: #000000;
  `,
  Descriptor: styled.section`
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
  `,
};

const NidNumInput = (
  {
    titleLabel = '주민등록번호',
    defaultValue,
    description,
    onInputChange,
    invalid,
  }: NidNumInputType,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const uniqId = uuid();
  const [birthNum, setBirthNum] = useState(
    defaultValue && defaultValue.substring(0, 6),
  );
  const [identifyNum, setIdentifyNum] = useState('');
  const idNumberInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onInputChange) {
      onInputChange(`${birthNum || ''}${identifyNum || ''}`);
    }
  }, [birthNum, identifyNum, onInputChange]);

  return (
    <S.NidNumInputWrapper data-invalid={invalid}>
      <S.Label htmlFor={uniqId}>{titleLabel}</S.Label>
      <S.InputSection id={uniqId}>
        <S.Input
          ref={ref}
          type={'text'}
          maxLength={6}
          value={birthNum}
          onChange={(e) => {
            setBirthNum(e.target.value);
            if (e.target.value.length === 6 && idNumberInputRef?.current) {
              idNumberInputRef.current.focus();
            }
          }}
          onKeyPress={(e) => {
            if (e?.code === 'Enter' && idNumberInputRef?.current) {
              idNumberInputRef.current.focus();
            }
          }}
          pattern="\d*"
        />
        <S.NidDivider>-</S.NidDivider>
        <S.Input
          ref={idNumberInputRef}
          type={'text'}
          data-type={'security'}
          maxLength={7}
          value={identifyNum}
          onChange={(e) => setIdentifyNum(e.target.value)}
          pattern="\d*"
        />
      </S.InputSection>
      <S.Descriptor>
        {invalid ? `올바른 ${titleLabel}를 입력해 주세요.` : description}
      </S.Descriptor>
    </S.NidNumInputWrapper>
  );
};

export type { NidNumInputType };
export default forwardRef(NidNumInput);
