import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../../hooks/useAuth';
import { Table, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { getAllAdminEventsRegistered } from '../../../services/events';
import { CSVLink } from 'react-csv';

function AdminPaymentTable() {
  const { user } = useAuth();

  const { data: adminEventsRegistered } = useQuery(
    ['getAllEventRegistered'],
    () => getAllAdminEventsRegistered({ token: user.token }),
    {
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
      enabled: !!user?.token,
    },
  );

  //   const { mutate: mutateDeleteUser } = useMutation(
  //     (values) => deleteUser({ token: user?.token, id: values.id }),
  //     {
  //       onSuccess: (success) => {
  //         refetchAdminEventsRegistered();
  //         message.success(success?.message);
  //       },
  //       onError: (error) => {
  //         message.error(error?.response?.data?.message);
  //       },
  //     },
  //   );

  const columns = [
    {
      title: 'Event Registered',
      label: 'Event Registered',
      dataIndex: 'eventName',
      key: 'eventName',
      width: '10%',
    },
    {
      title: 'Date and Time',
      label: 'Date and Time',
      dataIndex: 'date',
      key: 'date',
      width: '10%',
    },
    {
      title: 'Place',
      label: 'Place',
      dataIndex: 'place',
      key: 'place',
      width: '20%',
    },
    {
      title: 'Price',
      label: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
    },
    {
      title: 'Full Name',
      label: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      label: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      label: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Department',
      label: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Insituition/organization',
      label: 'Insituition/organization',
      dataIndex: 'insituition',
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
  ];

  const data = adminEventsRegistered?.data?.RegistrationEvent?.map((event) => {
    return {
      id: event?.id,
      key: event?.id + '',
      eventName: event?.EventPayment?.event?.title || '-',
      date: `${new Date(event?.createdAt).toDateString()}`,
      place: event?.EventPayment?.event?.location,
      price: event?.EventPayment?.event?.price + '',
      fullName: event?.fullName || '-',
      email: event?.email || '-',
      phoneNumber: event?.telephone || '-',
      department: event?.department || '-',
      practicingNumber: event?.practicingNumber || '-',
      insituition: event?.insituition,
      // salutation: event?.salutation || '-',
      // speciality: event?.EventPayment?.user?.speciality || '-',
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
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          // y: '90vh',
        }}
      />
    </>
  );
}

export default AdminPaymentTable;
