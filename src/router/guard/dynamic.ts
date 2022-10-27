import { RouteObject } from 'react-router';
/**
 * 获取动态路由菜单
 * @param router 
 */
const createDynamicRouteGuard = (router: RouteObject[]) => {
  const constantRoutes = getConstantRoute();
};

const getConstantRoute = () => {
  // * 导入所有router
  const metaRouters = import.meta.globEager('./modules/*.tsx');
  // * 处理路由
  const routerArray: RouteObject[] = [];
  Object.keys(metaRouters).forEach((item) => {
    Object.keys(metaRouters[item] as object).forEach((key: any) => {
      routerArray.push(...(metaRouters[item] as any)[key]);
    });
  });
  return routerArray;
};

export default createDynamicRouteGuard;
