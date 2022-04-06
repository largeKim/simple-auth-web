import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Checkbox from '@components/atoms/Checkbox';
import PrimaryButton from '@components/atoms/PrimaryButton';
import useTerms from '@hooks/useTerms';

interface TermsAgree {
  setVisibleAgree: React.Dispatch<React.SetStateAction<boolean>>;
}

const S = {
  TermsSection: styled.section`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    min-height: 640px;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
  `,
  TermsCheckSection: styled.section`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    padding: 20px 20px 0;
    border-radius: 24px 24px 0px 0px;
    animation: 0.3s ease termsKeyframe;
    & > div {
      padding: 7.5px 7.5px;
    }
    @keyframes termsKeyframe {
      from {
        bottom: -50%;
      }
      to {
        bottom: 0;
      }
    }
  `,
  TermsCheckAllArticle: styled.article`
    margin-bottom: 14px;
    padding: 12px;
    border: 1px solid #dde1e6;
    box-sizing: border-box;
    border-radius: 8px;
  `,
  ButtonSection: styled.section`
    margin: 30px 0 20px;
  `,
};

const TermsAgree = ({ setVisibleAgree }: TermsAgree) => {
  const navigate = useNavigate();
  const { termsAgree, setTermsAgree, checkAll, onCheckAll } = useTerms();
  return (
    <S.TermsSection onClick={(e) => setVisibleAgree(false)}>
      <S.TermsCheckSection onClick={(e) => e.stopPropagation()}>
        <S.TermsCheckAllArticle>
          <Checkbox
            titleLabel={'약관에 모두 동의'}
            checked={checkAll}
            onCheckChange={(e) => onCheckAll(e.target.checked)}
          />
        </S.TermsCheckAllArticle>
        <Checkbox
          type={'transparent'}
          titleLabel={'[필수] 개인정보 이용 동의'}
          checked={termsAgree['private']}
          onCheckChange={(e) =>
            setTermsAgree((prev) => ({ ...prev, private: e.target.checked }))
          }
        />
        <Checkbox
          type={'transparent'}
          titleLabel={'[필수] 서비스 이용 약관 동의'}
          checked={termsAgree['service']}
          onCheckChange={(e) =>
            setTermsAgree((prev) => ({ ...prev, service: e.target.checked }))
          }
        />
        <Checkbox
          type={'transparent'}
          titleLabel={'[필수] 고유식별정보 처리 동의'}
          checked={termsAgree['identify']}
          onCheckChange={(e) =>
            setTermsAgree((prev) => ({ ...prev, identify: e.target.checked }))
          }
        />
        <Checkbox
          type={'transparent'}
          titleLabel={'[필수] 제3자 정보제공 동의'}
          checked={termsAgree['provision_of_third']}
          onCheckChange={(e) =>
            setTermsAgree((prev) => ({
              ...prev,
              provision_of_third: e.target.checked,
            }))
          }
        />
        <S.ButtonSection>
          <PrimaryButton
            onClick={() => {
              setVisibleAgree(false);
              navigate('/auth');
            }}
            disabled={!checkAll}
          >
            동의하고 간편인증 하기
          </PrimaryButton>
        </S.ButtonSection>
      </S.TermsCheckSection>
    </S.TermsSection>
  );
};

export default TermsAgree;
