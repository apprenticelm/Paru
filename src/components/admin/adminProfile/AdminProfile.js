import { Form, Input, Spin, message } from 'antd';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useAuth } from '../../../hooks/useAuth';
import { me } from '../../../services/auth';
import { useForm } from 'antd/es/form/Form';
import { updateAdmincredentials } from '../../../services/admin';
import { queryClient } from '../../../App';

function AdminProfile() {
  const { user } = useAuth();

  const { data: meData, isLoading: meLoading } = useQuery(
    'me',
    () => me(user?.token),
    {
      enabled: !!user?.token,
    },
  );

  const [form] = useForm();

  const { mutate, isLoading } = useMutation(
    (data) => updateAdmincredentials({ token: user?.token, data }),
    {
      onSuccess: (val) => {
        message.success('Data updated successfully!');
        queryClient.refetchQueries('me');
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  useEffect(() => {
    if (meData) {
      form.setFieldsValue({
        email: meData?.data?.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData]);

  const handleFinish = (val) => {
    mutate(val);
  };

  return (
    <Spin spinning={meLoading}>
      <div className="main-container  ">
        <div className="container">
          <div className="flex justify-center flex-col ">
            <h1 className="p-[18px]">My Profile</h1>
            <Form
              className="text-[rgb(46,49,62)] p-[18px] max-w-[500px]"
              layout="vertical"
              onFinish={handleFinish}
              form={form}
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

              <button
                htmlType="submit"
                className=" search-login-button border-none  text-white h-[35px] bg-[#801527] flex items-center gap-2  px-9 py-[25px] rounded cursor-pointer hover:bg-[#801527] duration-300"
              >
                <span className="text-[18px]">
                  {isLoading ? 'Loginn...' : 'Log in'}
                </span>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default AdminProfile;
