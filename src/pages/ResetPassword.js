import { Form, Input, message } from 'antd';
import React from 'react';
import { resetPassword } from '../services/auth';
import { useMutation } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('q');
  const navigate = useNavigate();

  console.log(token, params?.email);
  const { mutate, isLoading } = useMutation((data) => resetPassword(data), {
    onSuccess: () => {
      navigate('/login');
    },
    onError: (err) => {
      message.error(err?.response?.data?.message);
    },
  });

  const handleFinish = (val) => {
    mutate({ ...val, token, email: params?.email });
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
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <button
              htmlType="submit"
              className="button-color search-login-button border-none mt-10 text-white h-[35px] bg-[#165887] flex items-center gap-2  px-9 py-[25px] rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
            >
              <span className="text-[18px]">
                {isLoading ? 'Submiting...' : 'Submit'}
              </span>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
