import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { validationPassState } from '@stores/User';

const PrivateOutlet = () => {
  const userInfoValidationPass = useRecoilValue(validationPassState);

  if (!userInfoValidationPass) {
    alert('만료된 페이지 입니다.');
    return <Navigate to={'/'} replace={true} />;
  }

  return <Outlet />;
};

export default PrivateOutlet;
