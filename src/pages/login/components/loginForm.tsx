import React, { useRef, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const handleCodeChange = (code: string) => {
    console.log(code);
  };
  // 登录
  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    console.log(loginForm);
    navigate('/dashboard/dataVisualize');
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
          <SImageVerify code={verifyCode} codeChange={handleCodeChange} />
        </div>
      </Form.Item>
      <div className="w-full mb-20px flex items-center justify-evenly">
        <Button size="large" type="primary" htmlType="submit" className="w-full !rounded-md">
          登录
        </Button>
      </div>
      <div className="w-full mt-20px text-#999">
        <div className="mt-3px flex items-center justify-center">
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
