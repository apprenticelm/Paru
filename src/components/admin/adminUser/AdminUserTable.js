import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useAuth } from '../../../hooks/useAuth';
import { Popconfirm, Space, Table, message } from 'antd';
import { deleteUser, getAdminUsers } from '../../../services/admin';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

function AdminUserTable() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { data: adminUsers, refetch: refetchAdminUsers } = useQuery(
    ['getAllAdminUsers'],
    () => getAdminUsers({ token: user.token }),
    {
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
      enabled: !!user?.token,
    },
  );

  const { mutate: mutateDeleteUser } = useMutation(
    (values) => deleteUser({ token: user?.token, id: values.id }),
    {
      onSuccess: (success) => {
        refetchAdminUsers();
        message.success(success?.message);
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    },
  );

  const columns = [
    {
      title: 'Title',
      label: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'First Name',
      label: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'LastName',
      label: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      label: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'Phone',
      label: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
    },
    {
      title: 'Department',
      label: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Practicing Number',
      label: 'Practicing Number',
      dataIndex: 'practicingNumber',
      key: 'practicingNumber',
    },
    // {
    //   title: 'Salutation',
    //   dataIndex: 'salutation',
    //   key: 'salutation',
    // },
    {
      title: 'Speciality',
      label: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Deleting user"
            description="Are you sure to delete this user?"
            onConfirm={() => mutateDeleteUser({ id: record?.id })}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-[20px] text-[red]" />
          </Popconfirm>
          <EditOutlined
            onClick={() => {
              navigate(`/edit-user-by-admin/${record?.id}`);
            }}
            className="text-[20px] cursor-pointer text-[gray]"
          />
        </Space>
      ),
    },
  ];

  const data = adminUsers?.map((user) => {
    return {
      id: user?.id,
      key: user?.id + '',
      title: user?.title || '-',
      firstName: user?.firstName || '-',
      lastName: user?.lastName || '-',
      email: user?.email || '-',
      phoneNumber: user?.phoneNumber || '-',
      department: user?.department || '-',
      practicingNumber: user?.practicingNumber || '-',
      salutation: user?.salutation || '-',
      speciality: user?.speciality || '-',
    };
  });

  return (
    <>
      <div className="w-full flex justify-end">
        {data && (
          <CSVLink data={data} headers={columns}>
            <button className="mb-4 border-none text-[black] bg-[#76ebc4] flex items-center gap-2 h-[40px] px-[14px] py-[8px] rounded-lg cursor-pointer hover:bg-[#76ebc4] duration-300">
              Export to .CSV{' '}
              <span>
                <DownloadOutlined className="text-[22px]" />
              </span>
            </button>
          </CSVLink>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1300,
          // y: 800,
        }}
      />
    </>
  );
}

export default AdminUserTable;
