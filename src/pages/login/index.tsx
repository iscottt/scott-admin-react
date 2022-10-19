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
