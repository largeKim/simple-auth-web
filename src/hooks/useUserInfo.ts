import { useRecoilState } from 'recoil';

import {
  composeValidateName,
  validateFullRegNo,
  validateMobilePhoneNumber,
} from '@utils/validationUtil';
import {
  userInfoListState,
  UserInfoListType,
  UserInfoType,
  // @ts-ignore
} from '@stores/User';

type ValidtaionFuncSetType = {
  [key in UserInfoType]: (value: string) => string | boolean;
};

const validtaionFuncSet: ValidtaionFuncSetType = {
  name: composeValidateName,
  phoneNumber: validateMobilePhoneNumber,
  regNumber: validateFullRegNo,
};

const useUserInfo = (
  defaultUserInfo?: UserInfoListType,
): {
  userInfoList: UserInfoListType;
  setUserInfo: (value: string, key: UserInfoType) => void;
} => {
  const [userInfoList, setUserInfoList] = useRecoilState(userInfoListState);

  const setUserInfo = (value: string, key: UserInfoType) => {
    if (value === (userInfoList as UserInfoListType)[key].value) return;

    setUserInfoList((prev: UserInfoListType) => ({
      ...prev,
      [`${key}`]: { value, invalid: !validtaionFuncSet[key](value) },
    }));
  };

  return { userInfoList, setUserInfo };
};

export default useUserInfo;
