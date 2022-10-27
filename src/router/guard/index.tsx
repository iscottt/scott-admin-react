import type { FC } from 'react';
import React from 'react';

import { Navigate, Route, useLocation } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { getToken } from '@/utils';
import { isNull } from '@/service/is';

const whiteList = ['/login'];

const checkWhiteList = (pathName = ''): boolean => {
  return whiteList.some((item) => item === pathName);
};
type extendsProps = {
  title?: string;
  icon?: string;
};

export type RouteNewProps = RouteProps & extendsProps;

function canIPass(){}

const GuardRoute: FC<RouteNewProps> = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const token = getToken();

  if (!isNull(token)) {
    if (pathname === '/login') {
      return <Navigate to="/" />;
    } else {
      return <Route {...props} />;
    }
  } else {
    if (checkWhiteList(pathname)) {
      return <Route {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default GuardRoute;
