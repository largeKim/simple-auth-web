import { atom, selector } from 'recoil';

import { fetcher } from '@app';

interface ServerTime {
  serverTime: string;
}
interface SignResponseType {
  startedAt: string;
  expiredAt: string;
}

interface Guide {
  image: string;
  title: string;
  description: string;
}

type SignGuides = {
  sign: {
    guides: Guide[];
  };
};

const timeExpiredState = atom({
  key: 'TimeExpiredState',
  default: false,
});

const serverTimeState = selector({
  key: 'ServerTimeState',
  get: async () => {
    const { data } = await fetcher<never, ServerTime>({ url: 'serverTime' });
    const { serverTime } = data;

    return serverTime;
  },
});

const signRequestState = atom<SignResponseType | undefined>({
  key: 'SignRequestState',
  default: undefined,
});

const signGuidesState = selector<Guide[]>({
  key: 'SignGuidesState',
  get: async () => {
    const { data } = await fetcher<never, SignGuides>({
      url: 'sign/guides',
    });
    const { guides } = data.sign;

    return guides;
  },
});

export type { SignResponseType };
export { timeExpiredState, serverTimeState, signRequestState, signGuidesState };
