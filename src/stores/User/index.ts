import { atom, selector } from 'recoil';

interface InfoType {
  value: string;
  invalid?: boolean;
  focus?: boolean;
}
type UserInfoType = 'name' | 'phoneNumber' | 'regNumber';

type UserInfoListType = {
  [key in UserInfoType]: InfoType;
};

const userInfoListState = atom<UserInfoListType>({
  key: 'UserInfoListState',
  default: {
    name: { value: '' },
    phoneNumber: { value: '' },
    regNumber: { value: '' },
  },
});

const validationPassState = selector({
  key: 'ValidationPassState',
  get: ({ get }) => {
    const userInfoList = get(userInfoListState);
    const isPass = Object.keys(userInfoList).every(
      (key) => userInfoList[key as UserInfoType].invalid === false,
    );
    return isPass;
  },
});

export type { UserInfoType, UserInfoListType };
export { userInfoListState, validationPassState };
