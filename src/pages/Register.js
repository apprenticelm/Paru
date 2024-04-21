import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { authSignup } from '../services/auth';
import { useAuth } from '../hooks/useAuth';

const OPTIONS = ['Radiology', 'Neurology', 'Pathology', 'Others'];

const DEPARTMENTOPTIONS = [
  'Radiology',
  'Surgery',
  'Emergency Departement',
  'General Practice',
  'Neuroradiology',
  'Urology',
];

const Register = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  // const [departmentSelectedItems, setDepartmentSelectedItems] = useState([]);
  // const departmentsFilteredOptions = DEPARTMENTOPTIONS.filter(
  //   (o) => !departmentSelectedItems.includes(o),
  // );

  const { login } = useAuth();

  const { mutate, isLoading } = useMutation((data) => authSignup(data), {
    onSuccess: (val) => {
      login(val?.data);
    },
    onError: (err) => {
      message.error(err?.response?.data?.message);
    },
  });

  const handleFinish = (val) => {
    console.log(val);
    mutate(val);
  };

  return (
    <div className="main-container pt-[100px]">
      <div className="container">
        <div className="flex items-center justify-center flex-col py-[50px] px-[20px] ">
          <div>
            <p className="text-[32px] text-center font-[500]">
              Creation of your account
            </p>
          </div>
          <div>
            <p className="text-center text-[16px] ">
              Already have account?
              <Link to="/login">
                <span className="text-center text-[rgb(28,62,217)] underline ml-2 text-[16px]">
                  Signin
                </span>{' '}
              </Link>
            </p>
          </div>
          <Form layout="vertical" onFinish={handleFinish}>
            {/* <Form.Item name="salutation" label="Salutation">
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="salutation"
              />
            </Form.Item> */}

            {/* <Form.Item name="title" label="Title">
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="title"
              />
            </Form.Item> */}

            <Row gutter={40}>
              <Col span={12}>
                <Form.Item
                  className="text-[rgb(46,49,62)]"
                  name="firstName"
                  label="Firstname"
                  rules={[
                    {
                      required: true,
                      message: 'Field required',
                    },
                  ]}
                >
                  <Input
                    className="text-[rgb(46,49,62)] input rounded-sm px-[18px] border-[rgb(131,139,163)]"
                    size="large"
                    placeholder="Firstname"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Lastname"
                  rules={[
                    {
                      required: true,
                      message: 'Field required',
                    },
                  ]}
                >
                  <Input
                    className="input rounded-sm  px-[18px] border-[rgb(131,139,163)]"
                    size="large"
                    placeholder="Lastname"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Field required',
                },
              ]}
            >
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="username"
              />
            </Form.Item> */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Field required',
                },
              ]}
            >
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="Email"
              />
            </Form.Item>
            {/* <Form.Item
              name="phoneNumber"
              label="Phone No."
              rules={[
                {
                  required: true,
                  message: 'Field required',
                },
              ]}
            >
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="Phone Number"
              />
            </Form.Item> */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Field required',
                },
              ]}
            >
              <Input.Password
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="*********"
              />
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
                        'The new password that you entered do not match!'
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item
              name="department"
              label="Department"
              rules={[
                {
                  required: true,
                  message: 'Field required',
                },
              ]}
            >
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="Department"
              /> */}
              {/* <Select
                placeholder="Please select department"
                value={departmentSelectedItems}
                onChange={setDepartmentSelectedItems}
                style={{
                  width: '100%',
                }}
                options={DEPARTMENTOPTIONS.map((item) => ({
                  value: item,
                  label: item,
                }))}
              /> */}
            {/* </Form.Item>
            <Form.Item
              name="practicingNumber"
              label="Practicing Number"
              rules={[
                {
                  required: true,
                  message: 'Field required',
                },
              ]}
            >
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="Practicing Number"
              />
            </Form.Item>

            <Form.Item name="speciality" label="Speciality ">
              <Select
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                  width: '100%',
                }}
                options={OPTIONS?.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item> */}
            {/* <Form.Item name="interests" label="Interests">
              <Input
                className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                size="large"
                placeholder="interests"
              />
            </Form.Item> */}

            <Button
              type="primary"
              htmlType="submit"
              className="button-color h-[50px] text-[18px] min-w-[50px] px-[30px] font-semibold bg-[#165887]"
              disabled={isLoading}
            >
              {isLoading ? 'Creating your account....' : ' Create my account'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
