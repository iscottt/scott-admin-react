# 从零搭建React18+antd+vite+TS后台管理项目模板

## 基本工作



> 兼容性注意
>
> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

### 初始化项目

---



**使用 NPM:**

```bash
npm create vite@latest
```



**使用 Yarn:**

```bash
yarn create vite
```



**使用 PNPM:**

```bash
pnpm create vite
```



> 按照提示输入项目名称，这里我们创建的是react项目，所以选择react+Typescript



**以Yarn为例：**

![image-20221017182753688](/Users/scott/Library/Application Support/typora-user-images/image-20221017182753688.png)



**至此我们的项目就初始化完成了。**

### 使用less

---



**使用Yarn安装less**

```bash
yarn add less
```



**编辑vite.config.ts**

```typescript
import WindiCSS from 'vite-plugin-windicss';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  ...
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
    }
  ...
});
```



### 使用WindiCss

---



**安装vite-plugin-windicss**

```bash
yarn add vite-plugin-windicss
```



**修改vite.config.ts**

```typescript
import WindiCSS from 'vite-plugin-windicss';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  ...
  plugins: [react(), WindiCSS()],
  ...
});

```



**根目录新增windi.config.ts**

```typescript
// windi.config.ts 
 
import { defineConfig } from 'windicss/helpers'
 
export default defineConfig({
  extract: {
    include: ['**/*.{jsx,js,css,html,tsx,less}'],
    exclude: ['node_modules', '.git', '.next'],
  },
})
```



**编辑main.tsx**

```tsx
...
import 'virtual:windi.css';
...
```



### 添加目录别名

---



**编辑vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  ...
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
  ...
});

```



### 引入ant design



**安装**

```bash
npm install antd
```



**编辑main.tsx**

```tsx
import 'antd/dist/antd.less';
```





## 搭建layouts



### layouts介绍

![image-20221018154003762](/Users/scott/Library/Application Support/typora-user-images/image-20221018154003762.png)

 

### 创建layouts组件



**src/layouts/index.tsx**

```ts
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import SHeader from './components/SHeader';
import SiderBar from './components/SiderBar';
import './layout.less';

const { Content } = Layout;

// 菜单数据
const initialMenus = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
];

const SLayout: React.FC = () => {
  // 控制边栏展开与收缩
  const [collapsed, setCollapsed] = useState(false);
  const [menus] = useState(initialMenus);

  const collapsedChange = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="layout-container">
      <SiderBar collapsed={collapsed} menus={menus} />
      <Layout className="site-layout">
        <SHeader onChange={collapsedChange} />
        <Content className="layout-content">
          {/* 自动加载对应路由的组件 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SLayout;
```

### SHeader组件

```tsx
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import SFullScreen from './SFullScreen';
import SUserInfo from './SUserInfo';
const { Header } = Layout;

export type SHeaderProps = {
  onChange: (value: boolean) => void;
};

const SHeader: React.FC<SHeaderProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  // 触发角点击事件，调用父组件的事件，将状态传递
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    props.onChange(!collapsed);
  };

  return (
    <Header className="layout-header">
      <div className="header-trigger">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => toggleCollapsed(),
        })}
      </div>
      <div className="header-action">
        <SFullScreen />
        <SUserInfo />
      </div>
    </Header>
  );
};

export default SHeader;

```



### 网页全屏组件



**终端执行`yarn add screenfull`安装`screenfull`插件**

```tsx
import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { message } from 'antd';

const SFullScreen: React.FC = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true);
      else setFullScreen(false);
      return () => screenfull.off('change', () => {});
    });
  }, []);

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌');
    screenfull.toggle();
  };
  return (
    <div className="cursor-pointer text-18px mr-4" onClick={handleFullScreen}>
      {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  );
};
export default SFullScreen;

```

### 登录用户信息组件

```tsx
import { DownOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import React from 'react';

const menuClick: MenuProps['onClick'] = ({ key }) => {
  console.log(key);
};

const menu = (
  <Menu
    onClick={menuClick}
    items={[
      {
        key: 'password',
        label: <span className="text-blue">修改密码</span>,
        icon: <EditOutlined />,
      },
      {
        key: 'logout',
        label: <span className="text-blue">退出登录</span>,
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const SUserInfo: React.FC = () => (
  <Dropdown overlay={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        spuer admin
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default SUserInfo;

```



### Sidebar组件

```tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
const { Sider } = Layout;

interface LayoutSiderProps {
  collapsed: boolean;
  menus: ItemType[];
}

const SiderBar: React.FC<LayoutSiderProps> = (props) => {
  const { collapsed, menus } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menus} />
    </Sider>
  );
};
export default SiderBar;

```



### 样式

```less
.layout-container {
  @apply w-full h-full;
}

.layout-content {
  @apply mx-24px my-16px p-24px min-h-280px;
}

.layout-header {
  @apply !bg-white !px-0 flex justify-between items-center;
}

.trigger {
  @apply px-24px text-18px text-white tracking-64px cursor-pointer transition-colors duration-300 hover:text-[#1890ff];
}

.logo {
  @apply h-32px m-16px bg-white/30;
}

.header-trigger {
  @apply w-100px;
}

.header-action {
  @apply flex-1 flex items-center justify-end pr-4;
}

```



## 路由



### 安装`react-router-dom`



```bash
yarn add react-router-dom @types/react-router-dom
```



### 初始化路由



**`src/router/index.tsx`**

```tsx
import React from 'react';
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Login from '@/pages/login/index';
// * 导入所有router
const metaRouters = import.meta.globEager('./modules/*.tsx');
// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item] as object).forEach((key: any) => {
    routerArray.push(...(metaRouters[item] as any)[key]);
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

```



**src/router/constant.tsx**

```tsx
import React from 'react';
import Layout from '../layouts/index';
/**
 * @description: default layout
 */
export const LayoutIndex = () => <Layout />;

```



### 路由懒加载



**`src/router/utils/useLazyLoad.tsx`**

```tsx
import React, { Suspense } from 'react';
import { Spin } from 'antd';

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  );
};

export default lazyLoad;

```



### 示例路由



**`src/router/modules/dashboard.tsx`**



```tsx
import React from "react";
import lazyLoad from "../utils/useLazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "Dashboard"
		},
		children: [
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(() => import("@/pages/dashboard/dataVisualize/index"))),
				meta: {
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
			{
				path: "/dashboard/embedded",
				element: lazyLoad(React.lazy(() => import("@/pages/dashboard/embedded/index"))),
				meta: {
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded"
				}
			}
		]
	}
];

export default dashboardRouter;

```



### 挂载路由



**`App.tsx`**

```tsx
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Router from '@/router/index';

const App = (props: any) => {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;

```



## 登录页面



### 登录页介绍

![image-20221019102419216](/Users/scott/Library/Application Support/typora-user-images/image-20221019102419216.png)



**`登录页面抽离出来了登录表单以及验证码组件`**



**`src/pages/login/index.tsx`**



```tsx
import SLoading from '@/components/SLoading';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import './index.less';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/dataVisualize');
    }, 1500);
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-info">
          <div className="title">Scott Admin</div>
          <div className="desc">———— 基于React18+antd+vite</div>
        </div>
        <LoginForm onSubmit={onSubmit} />
        {loading && <SLoading />}
      </div>
    </div>
  );
};
export default Login;
```



### 自定义hooks————useImageVerify



```tsx
import { useRef, useState } from 'react';
import { useEffect } from 'react';

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 */
export default function useImageVerify(width = 120, height = 40) {
  const domRef = useRef<HTMLCanvasElement>(null);
  const [imgCode, setImageCode] = useState();
  // 获取code
  const getImgCode = () => {
    setImageCode(draw(domRef.current as HTMLCanvasElement, width, height) as any);
  };
  // 监听dom初始化之后调用渲染验证码图形
  useEffect(() => {
    if (domRef?.current) {
      getImgCode();
    }
  }, []);

  return [domRef, imgCode, getImgCode];
}

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
function randomNum(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

/**
 * 获取随机颜色
 * @param min
 * @param max
 * @returns
 */
function randomColor(min: number, max: number) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
}

/**
 * 绘制图形
 * @param dom
 * @param width
 * @param height
 * @returns
 */
function draw(dom: HTMLCanvasElement, width: number, height: number) {
  let imgCode = '';
  const NUMBER_STRING = '0123456789';
  const ctx = dom.getContext('2d');
  if (!ctx) return imgCode;

  ctx.fillStyle = randomColor(180, 230);
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 4; i += 1) {
    const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)];
    imgCode += text;
    const fontSize = randomNum(18, 41);
    const deg = randomNum(-30, 30);
    ctx.font = `${fontSize}px Simhei`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = randomColor(80, 150);
    ctx.save();
    ctx.translate(30 * i + 18, 15);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(text, -15 + 5, -15);
    ctx.restore();
  }
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width), randomNum(0, height));
    ctx.lineTo(randomNum(0, width), randomNum(0, height));
    ctx.strokeStyle = randomColor(180, 230);
    ctx.closePath();
    ctx.stroke();
  }
  for (let i = 0; i < 41; i += 1) {
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = randomColor(150, 200);
    ctx.fill();
  }
  return imgCode;
}

```



### 登录表单组件

```tsx
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import SImageVerify from '@/components/SImageVerify';

import chrome from '@/assets/images/login/chrome.png';
import firefox from '@/assets/images/login/firefox.png';
import safari from '@/assets/images/login/safari.png';
import png360 from '@/assets/images/login/360.png';
import sougou from '@/assets/images/login/sougou.png';
import qq from '@/assets/images/login/qq.png';
import fast from '@/assets/images/login/fast.png';
import { Login } from '@/api/interface';

const LoginForm = (props: any) => {
  const [form] = Form.useForm();
  const [verifyCode, setVerifyCode] = useState('');
  const handleCodeChange = (code: string) => {
    setVerifyCode(code);
  };
  // 登录
  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    console.log(loginForm, verifyCode);
    props.onSubmit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form form={form} name="basic" labelCol={{ span: 5 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large" autoComplete="off">
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input className="!rounded-md" placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password className="!rounded-md" autoComplete="new-password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
        <div className="w-full flex items-center justify-between">
          <Input className="!rounded-md !flex-1 !mr-2" placeholder="验证码" />
          <SImageVerify codeChange={handleCodeChange} />
        </div>
      </Form.Item>
      <div className="w-full mb-20px flex items-center justify-evenly">
        <Button size="large" type="primary" htmlType="submit" className="w-full !rounded-md">
          登录
        </Button>
      </div>
      <div className="w-full mt-20px text-#999">
        <div className="mt-3px flex-center">
          <span className="align-middle ml-3px mr-3px">建议使用</span>
          <img src={chrome} alt="" className="inline-block w-15px" />
          <span className="align-middle ml-3px mr-3px">Chrome、</span>
          <img src={firefox} alt="" className="inline-block w-15px" />
          <span className="align-middle ml-3px mr-3px">火狐、</span>
          <img src={safari} alt="" className="inline-block w-15px" />
          <span className="align-middle ml-3px mr-3px">Safari浏览器</span>
        </div>
        <div className="mt-3px flex items-center justify-center">
          <span className="align-middle ml-3px mr-3px">或</span>
          <img src={png360} alt="" className="inline-block w-15px" />
          <span className="align-middle ml-3px mr-3px">360、</span>
          <img src={sougou} alt="" className="inline-block w-15px" />
          <span className="align-middle ml-3px mr-3px">搜狗、</span>
          <img src={qq} alt="" className="inline-block w-15px" />
          <span className="align-middle ml-3px mr-3px">QQ等浏览器</span>
          <img src={fast} alt="" className="inline-block w-15px" />
          <span className="align-middle">极速模式</span>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;

```



### hooks讲解



> **useRef**



useRef 返回一个可变 ref 对象，其 .current 属性初始化为传递的参数 (initialValue)。返回的对象将在组件的整个生命周期内持续存在。

本质上，useRef 就像一个“盒子”，可以在其 .current 属性中保存一个可变值。你可能熟悉 refs 主要是作为访问 DOM 的一种方式。如果您使用 <div ref={myRef} /> 将 ref 对象传递给 React，那么只要该节点发生更改，React 就会将其 .current 属性设置为相应的 DOM 节点。

但是，useRef() 不仅仅对 ref 属性有用。它可以方便地保留任何可变值，类似于您在类中使用实例字段的方式。这是因为 useRef() 创建了一个普通的 JavaScript 对象。 useRef() 和自己创建 {current: ...} 对象之间的唯一区别是 useRef 将在每次渲染时为您提供相同的 ref 对象。

请记住，当其内容发生变化时，useRef 不会通知您。改变 .current 属性不会导致重新渲染。如果你想在 React 将 ref 附加或分离到 DOM 节点时运行一些代码，你可能需要使用 callback ref 来代替。

**简单来说，useRef的作用就是用来帮助我们获取DOM节点，useRef返回的是一个对象，对象中的current属性则是我们需要获取的ODM节点。**



> useEffect(副作用)



useEffect接受包含命令式的、可能有效的代码的函数。

```javascript
useEffect(() => {
	// doSomething...
}, []);
```

函数组件的主体（称为 React 的渲染阶段）中不允许突变、订阅、计时器、日志记录和其他副作用。这样做会导致 UI 中出现令人困惑的错误和不一致。

相反，使用 useEffect。传递给 useEffect 的函数将在渲染提交到屏幕后运行。将效果视为从 React 的纯函数式世界到命令式世界的逃生口。默认情况下，效果会在每次完成渲染后运行，但您可以选择仅在某些值发生更改时触发它们。

**useEffect可以实现类似于vue中的watch功能，第二个参数为数组，用于监听state，同时如果不传递参数，useEffect又可以实现类似生命周期的功能，在视图渲染完之后再执行**



- 清除effect

通常，效果会创建在组件离开屏幕之前需要清理的资源，例如订阅或计时器 ID。为此，传递给 useEffect 的函数可能会返回一个清理函数。例如，要创建订阅：

```tsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

清理功能在从 UI 中删除组件之前运行，以防止内存泄漏。此外，如果一个组件多次渲染（通常是这样），则在执行下一个效果之前会清理上一个效果



## Mobx



### 简单示例



**`安装`**

```bash
yarn add mobx mobx-react mobx-react-lite
```

其中`mobx-react-lite`是用于react-hooks中，`mobx-react`是用于class组件中



**`创建一个简单的实例`**

```typescript
//store.js
import { observable, autorun, flow, computed, when, reaction, action } from 'mobx';
import * as api from './api';
import { createContext } from 'react' //react-hooks中使用

class UserStore {
    @observable
    basicInfo = {};
    
    // constructor函数里面可以放一些初始化的action
    constructor() {
        // when如果没有第二个参数，则返回一个promise，配合await或yield使用
        when(   
            // 一旦...
            () => false,
            // ... 然后
            () => this.dispose()
        )
    }
    
    // 在observable对象发生变化时，会调用，第二个参数表示配置，有delay和onError
    auto = autorun(
        e => {
            // console.log(e);
        },
        { delay: 3000 }
    );
    
    // autorun的变种，可以更精确的配置对象的属性
    myReaction = reaction(() => this.isLogined, isLogined => console.log('myReaction'));
    
    // 类似vue中computed的用法
    @computed
    get total() {
        console.log(this.currentStaffInfo);
        return this.currentStaffInfo;
    }

    getBasicInfo = flow(function*() {
        try {
            // 这里也可以调用其他action
            this.basicInfo = (yield api.queryInfo()).payload;
        } catch (error) {
            this.basicInfo = {};
        }
    });
    
    @action
    setBasicInfo = value => {
        this.basicInfo = value;
    };
}

export default new UserStore();//react-class中使用
export default createContext(new UserStore()); //react-hooks中使用
```

```tsx
//React.Component
import React, { Component } from 'react';
import { observer, Provider, inject } from 'mobx-react';
import UserStore from './store';

@inject('UserStore')
@observer
class User extends Component {
    componentDidMount() {
        this.props.UserStore.getBasicInfo()
    }
    render() {
        return (
            <div>
                {this.props.UserStore.basicInfo.name}
            </div>
        );
    }
}

export default (
    <Provider UserStore={UserStore}>
        <User />
    </Provider>
);
```

```tsx
//react-hooks
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import UserStore from './store'
export default observer(() => {
    const store = useContext(UserStore)
    return (
         <div onClick={e => store.basicInfo.name = "老王"}>
            {store.basicInfo.name}
        </div>
    )
})

```



### Mobx结合enquire.js



**`安装enquire.js`**

```bash
yarn add enquire.js @types/enquire.js
```



**`自定义hooks（sex/hooks/useEnquire.ts）`**

```ts
import React, { useContext } from 'react';
import { EnumDeviceType } from '@/enum';
import enquireJs from 'enquire.js';
import appStore from '@/store';

export const useDeviceEnquire = () => {
  const store = useContext(appStore);
  deviceEnquire((deviceType: EnumDeviceType) => {
    switch (deviceType) {
      case EnumDeviceType.desktop:
        store.setDeviceType(EnumDeviceType.desktop);
        break;
      case EnumDeviceType.tablet:
        store.setDeviceType(EnumDeviceType.tablet);
        break;
      case EnumDeviceType.mobile:
        store.setDeviceType(EnumDeviceType.mobile);
        break;
      default:
        store.setDeviceType(EnumDeviceType.desktop);
        break;
    }
  });
};

/**
 * 响应式检测
 * @param {*} callback
 */
export const deviceEnquire = function (callback: { (deviceType: EnumDeviceType): void; (arg0: EnumDeviceType): any }) {
  const matchDesktop = {
    match: () => {
      callback && callback(EnumDeviceType.desktop);
    },
  };

  const matchLablet = {
    match: () => {
      callback && callback(EnumDeviceType.tablet);
    },
  };

  const matchMobile = {
    match: () => {
      callback && callback(EnumDeviceType.mobile);
    },
  };

  enquireJs
    .register('screen and (max-width: 576px)', matchMobile)
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    .register('screen and (min-width: 1200px)', matchDesktop);
};
```



**`全局注册enquire（App.tsx）`**

```
...
const App = (props: any) => {
  useDeviceEnquire();
  ...
};

export default App;

```



**`Mobx（src/store/index.ts）`**

```ts
import { DeviceType } from '@/types';
import { observable, action, makeObservable } from 'mobx';
import { createContext } from 'react';

class AppMobx {
  constructor() {
    // mobx6.0后的版本都需要手动调用makeObservable(this)，不然会发现数据变了视图不更新
    makeObservable(this);
  }
  @observable device = 'desktop';

  @action
  setDeviceType(device: DeviceType) {
    this.device = device;
  }
}
const appStore = new AppMobx();
export default createContext(appStore); //react-hooks中使用

```

