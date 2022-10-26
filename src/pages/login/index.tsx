import SLoading from '@/components/SLoading';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import userStore from '@/store/modules/user';
import { observer } from 'mobx-react-lite';
import { Login } from '@/service/interface';
import './index.less';

const LoginPage: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (loginForm: Login.ReqLoginForm) => {
    setLoading(true);
    userStore.loginAction(loginForm);
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
});
export default LoginPage;
