import { Form, Input, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authLogin } from '../services/auth';
import { useMutation } from 'react-query';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation((data) => authLogin(data), {
    onSuccess: (val) => {
      login(val?.data);
    },
    onError: (err) => {
      message.error(err?.response?.data?.message);
    },
  });

  const handleFinish = (val) => {
    mutate(val);
  };

  return (
    <div className="main-container pt-[100px] pb-[40px] ">
      <div className="container">
        <div className="flex items-center justify-center flex-col">
          <p className="text-[32px] text-center font-[500]">Log-in</p>
          <p className="text-[16px] text-center ">
            Do not have an account yet ?
            <Link to="/signup">
              <span className="text-center text-[#165887] underline ml-2 text-[16px]">
                Create your account
              </span>{' '}
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center  ">
          <Form
            className="text-[rgb(46,49,62)] max-w-[500px] p-[18px]"
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address.',
                },
              ]}
            >
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'password required',
                },
              ]}
            >
              <Input.Password
                className=" rounded-sm   px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="********"
              />
            </Form.Item>
            <p
              className="text-[rgb(46,49,62)] underline flex  justify-end cursor-pointer"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Forgot your password?
            </p>
            <button
              htmlType="submit"
              className="button-color search-login-button border-none  text-white h-[35px] bg-[#165887] flex items-center gap-2  px-9 py-[25px] rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
            >
              <span className="text-[18px]">
                {isLoading ? 'Loginn...' : 'Log in'}
              </span>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
