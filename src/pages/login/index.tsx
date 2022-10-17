import SLoading from '@/components/SLoading';
import React, { useState } from 'react';
import LoginForm from './components/loginForm';
import './index.less';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-info">
          <div className="title">Scott Admin</div>
          <div className="desc">———— 基于React18+antd+vite</div>
        </div>
        <LoginForm />
        {loading && <SLoading />}
      </div>
    </div>
  );
};
export default Login;
