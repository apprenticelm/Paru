import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMutation, useQuery } from 'react-query';
import { UpdateProfile, me } from '../../services/auth';
import { Form, Input, Select, Button, Row, Col, message, Spin } from 'antd';

const OPTIONS = ['Radiology', 'Neurology', 'Pathology', 'Others'];

// const DEPARTMENTOPTIONS = [
//   'Radiology',
//   'Surgery',
//   'Emergency Departement',
//   'General Practice',
//   'Neuroradiology',
//   'Urology',
// ];

const Profile = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  // const [departmentSelectedItems, setDepartmentSelectedItems] = useState([]);
  // const departmentsFilteredOptions = DEPARTMENTOPTIONS.filter(
  //   (o) => !departmentSelectedItems.includes(o),
  // );

  const { user } = useAuth();

  const { data: meData, isLoading: meLoading } = useQuery(
    'me',
    () => me(user?.token),
    {
      enabled: !!user?.token,
    },
  );

  const { mutate, isLoading } = useMutation(
    (data) => UpdateProfile({ data, token: user?.token, id: user?.user?.id }),
    {
      onSuccess: () => {
        message.success('Profile updated!');
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  const handleFinish = (val) => {
    console.log(val);
    mutate({ data: val });
  };

  return (
    <Spin spinning={meLoading}>
      <div className="main-container pt-[10px]">
        <div className="container">
          <div className="flex items-center justify-center flex-col py-[50px] px-[20px] ">
            <div>
              <p className="text-[32px] text-center font-[500]">
                Update your account
              </p>
            </div>
            {meData?.data && (
              <Form
                layout="vertical"
                onFinish={handleFinish}
                initialValues={meData?.data}
              >
                {/* <Form.Item name="salutation" label="Salutation">
                  <Input
                    className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                    size="large"
                    placeholder="salutation"
                  />
                </Form.Item> */}

                <Form.Item name="title" label="Title">
                  <Input
                    className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                    size="large"
                    placeholder="title"
                  />
                </Form.Item>

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
                        className="text-[rgb(46,49,62)] input rounded-sm   px-[18px] border-[rgb(131,139,163)]"
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
                        className="input rounded-sm px-[18px] border-[rgb(131,139,163)]"
                        size="large"
                        placeholder="Lastname"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
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
                </Form.Item>
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
                <Form.Item
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
                </Form.Item>
                <Form.Item
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
                  />
                  {/* <Select
                    placeholder="Please select department"
                    value={departmentSelectedItems}
                    onChange={setDepartmentSelectedItems}
                    style={{
                      width: '100%',
                    }}
                    options={departmentsFilteredOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  /> */}
                </Form.Item>
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
                    options={filteredOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item name="interests" label="Interests">
                  <Input
                    className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                    size="large"
                    placeholder="interests"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-color h-[50px] text-[18px] min-w-[50px] px-[30px] font-semibold bg-[#165887]"
                >
                  {isLoading
                    ? 'Updating your account....'
                    : ' Update my account'}
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Profile;
