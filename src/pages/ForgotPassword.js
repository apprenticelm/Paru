import { Form, Input, message } from 'antd';
import React from 'react';
import { forgotPassword } from '../services/auth';
import { useMutation } from 'react-query';

function ForgotPassword() {
  const { mutate, isLoading } = useMutation((data) => forgotPassword(data), {
    onSuccess: () => {
      message.success('Email has been sent successfully!');
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
          <p className="text-[32px] text-center font-[500]">Forgot Password</p>
        </div>
        <div className="flex items-center justify-center  ">
          <Form
            className="text-[rgb(46,49,62)] max-w-[500px] p-[18px] pt-0"
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
                placeholder="Please enter your email!"
              />
            </Form.Item>

            <button
              htmlType="submit"
              className="button-color search-login-button border-none mt-10 text-white h-[35px] bg-[#165887] flex items-center gap-2  px-9 py-[25px] rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
            >
              <span className="text-[18px]">
                {isLoading ? 'Sending...' : 'Send Email'}
              </span>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
