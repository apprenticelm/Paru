import { Form, Input, Space, Spin, Table, message } from 'antd';
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useMutation, useQuery } from 'react-query';
import {
  addCoupons,
  deleteCoupon,
  getAllCoupons,
} from '../../../services/coupons';
import { queryClient } from '../../../App';

function AdminVouchers() {
  const { user } = useAuth();
  const [form] = Form.useForm();

  // mutation for save coupon
  const { mutate, isLoading } = useMutation(
    (data) => addCoupons({ token: user?.token, data }),
    {
      onSuccess: (val) => {
        message.success('Data updated successfully!');
        queryClient.refetchQueries('get-all-coupons');
        // reset form
        form.resetFields();
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  return (
    <Spin spinning={false}>
      <div className="main-container  ">
        <div className="container">
          <div className="flex justify-center flex-col ">
            <h1 className="p-[18px]">Coupons</h1>
            <Form
              form={form}
              className="text-[rgb(46,49,62)] p-[18px] max-w-[500px]"
              layout="vertical"
              onFinish={(val) => {
                mutate(val);
              }}
            >
              <Form.Item
                name="code"
                label="Code"
                rules={[
                  {
                    required: true,
                    message: 'Code is required',
                  },
                ]}
              >
                <Input
                  className="rounded-sm px-[18px] border-[rgb(131,139,163)]"
                  size="large"
                  placeholder="Enter Code"
                />
              </Form.Item>
              <Form.Item
                name="discount"
                label="Discount"
                rules={[
                  {
                    required: true,
                    message: 'Discount required',
                  },
                ]}
              >
                <Input
                  type="number"
                  className=" rounded-sm   px-[18px] border-[rgb(131,139,163)]"
                  size="large"
                  placeholder="Enter price in RM"
                />
              </Form.Item>

              <button
                htmlType="submit"
                className=" search-login-button border-none  text-white h-[35px] bg-[#801527] flex items-center gap-2  px-9 py-[25px] rounded cursor-pointer hover:bg-[#801527] duration-300"
              >
                <span className="text-[18px]">
                  {isLoading ? 'Saving' : 'Save'}
                </span>
              </button>
            </Form>
          </div>
          <div>
            <h1 className="p-[18px]">Coupons List</h1>
            <AdminCouponsTable />
          </div>
        </div>
      </div>
    </Spin>
  );
}

// add coupons table by using react query and antd
const AdminCouponsTable = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery('get-all-coupons', () =>
    getAllCoupons({ token: user?.token }),
  );

  console.log('data===>>>', data?.data?.coupons);

  // delete coupon mutation
  const { mutate, isLoading: deleteLoading } = useMutation(
    (id) => deleteCoupon({ token: user?.token, id }),
    {
      onSuccess: (val) => {
        message.success('Data updated successfully!');
        queryClient.refetchQueries('get-all-coupons');
        // reset form
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space
          size="middle"
          className="text-[blue] cursor-pointer"
          onClick={() => {
            mutate(record?.id);
          }}
        >
          Delete
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading || deleteLoading}>
      <Table columns={columns} dataSource={data?.data?.coupons} />
    </Spin>
  );
};

export default AdminVouchers;
