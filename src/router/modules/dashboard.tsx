import React from 'react';
import lazyLoad from '../utils/useLazyLoad';
import { LayoutIndex } from '../constant';
import { RouteObject } from '../types';
import GuardRoute from '../guard';

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    element: <GuardRoute element={<LayoutIndex />} />,
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: '/dashboard/dataVisualize',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard/dataVisualize/index'))),
        meta: {
          requiresAuth: true,
          title: '数据可视化',
          key: 'dataVisualize',
        },
      },
      {
        path: '/dashboard/embedded',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard/embedded/index'))),
        meta: {
          requiresAuth: true,
          title: '内嵌页面',
          key: 'embedded',
        },
      },
    ],
  },
];

export default dashboardRouter;
