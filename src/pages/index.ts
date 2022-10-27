type ViewComponent = Record<string, () => Promise<any>>;

const importViews = import.meta.glob('./**/index.tsx');

const COMPONENTS_KEY = 'components';
const PREFIX = './';
const SUFFIX = '/index.tsx';
const PATH_SPLIT_MARK = '/';
const ROUTE_KEY_SPLIT_MARK = '_';
/** 系统的内置路由，该文件夹名称不作为RouteKey */
const SYSTEM_VIEW = 'system-view_';

/** 过滤掉组件文件 */
const viewKeys = Object.keys(importViews).filter((key) => !key.includes(COMPONENTS_KEY));

function getViewComponent() {
  const components: ViewComponent = {};
  viewKeys.forEach((key) => {
    const routeKey = key
      .replace(PREFIX, '')
      .replace(SUFFIX, '')
      .replace(new RegExp(PATH_SPLIT_MARK, 'g'), ROUTE_KEY_SPLIT_MARK)
      .replace(SYSTEM_VIEW, '');
    components[routeKey] = importViews[key];
  });
  return components;
}

export const views = getViewComponent();
