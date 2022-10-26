import SLoading from '@/components/SLoading';
import { Login } from '@/service/interface';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import { useStore } from '@/store';
import './index.less';

const LoginPage: React.FC = () => {
  const store = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (loginForm: Login.ReqLoginForm) => {
    setLoading(true);
    try {
      await store.UserMobx.loginAction(loginForm);
      navigate('/dashboard/dataVisualize');
    } finally {
      setLoading(false);
    }
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
export default LoginPage;
