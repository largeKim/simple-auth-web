import React from 'react';
import styled from '@emotion/styled';

interface ArticleType {
  type?: 'plain' | 'icon' | 'icon-end';
  bgColor?: '#F8F8F8' | '#F0F4FA' | 'unset' | string;
  children?: React.ReactChild;
}

const S = {
  ArticleWrapper: styled.article`
    padding: 16px 14px;
    border-radius: 8px;
    background-color: ${({ bgColor }: ArticleType) => bgColor};
    & > div {
      display: flex;
      justify-content: space-between;
    }
  `,
};
const Article = (props: ArticleType) => {
  const { children } = props;
  return <S.ArticleWrapper {...props}>{children}</S.ArticleWrapper>;
};

export type { ArticleType };
export default Article;
