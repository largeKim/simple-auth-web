import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import fetch from 'unfetch';

import UserInfoPage from '@pages/UserInfo';
import AuthPage from '@pages/Auth';
import PrivateOutlet from '@components/atoms/PrivateOutlet';
import ResultPage from '@pages/Result';

const BASE_URL = process.env.REACT_APP_DOMAIN || 'http://localhost:3001/api/v1';
interface FetcherArgs<T = any> {
  method?: 'GET' | 'POST';
  url: string;
  body?: T;
}
interface ErrorType {
  code: number;
  message: string;
}
interface FetcherResponse<T> {
  ok: string;
  data: T;
  error?: ErrorType;
}
export const fetcher = <T, R>({
  method = 'GET',
  url,
  body,
}: FetcherArgs<T>): Promise<FetcherResponse<R>> =>
  fetch(`${BASE_URL}/${url}`, {
    method,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body || {}),
  })
    .then((r: any) => {
      return r.json();
    })
    .catch((e) => {
      return e;
    });

const S = {
  GlobalCss: css`
    body {
      margin: 0;
    }
  `,
  AppWrapper: styled.div`
    min-width: 375px;
    max-width: 640px;
    min-height: 640px;
    width: 100%;
    height: 100vh;
    display: flex;
    margin: auto;
  `,
};

function App() {
  return (
    <S.AppWrapper className="App">
      <Global styles={S.GlobalCss} />
      <Routes>
        <Route path="" element={<UserInfoPage />} />

        <Route path="" element={<PrivateOutlet />}>
          <Route
            path="auth"
            element={
              <React.Suspense fallback={<div>loading...</div>}>
                <AuthPage />
              </React.Suspense>
            }
          />
          <Route
            path="result"
            element={
              <React.Suspense fallback={<div>loading...</div>}>
                <ResultPage />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </S.AppWrapper>
  );
}

export default App;
