import React from 'react';
import { createBrowserRouter, Link, Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Login from '@/pages/login/index';
// * 导入所有router
// @ts-ignore
const metaRouters = import.meta.globEager('./modules/*.tsx');
// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});
export const rootRouter: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  ...routerArray,
  {
    path: '/',
    element: <Navigate to="/login" />,
    children: [
      {
        path: 'dashboard',
        element: (
          <div>
            <h1>Hello dashboard</h1>
            <Link to="/about">About Us</Link>
          </div>
        ),
      },
      {
        path: 'about',
        element: (
          <div>
            <h1>Hello about</h1>
            <Link to="/dashboard">About Us</Link>
          </div>
        ),
      },
    ],
  },
];
const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
