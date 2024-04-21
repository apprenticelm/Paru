import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import AdminEvents from '../../../components/admin/adminEvents/AdminEvents';
import AdminUserTable from '../../../components/admin/adminUser/AdminUserTable';
import AdminPaymentTable from '../../../components/admin/adminPayment/AdminPaymentTable';
import AdminProfile from '../../../components/admin/adminProfile/AdminProfile';
import AdminHomepage from '../../../components/admin/adminHomepage/adminHomepage';
import AdminVouchers from '../../../components/admin/adminVouchers/AdminVouchers';

const items = [
  {
    key: '1',
    label: `My Profile`,
    children: (
      <div className=" min-h-[100vh]">
        <AdminProfile />
      </div>
    ),
  },
  {
    key: '2',
    label: `Users`,
    children: (
      <div className="min-h-[100vh] ">
        <AdminUserTable />
      </div>
    ),
  },
  {
    key: '3',
    label: `Events`,
    children: (
      <div className="min-h-[100vh] ">
        <AdminEvents />
      </div>
    ),
  },
  // {
  //   key: '4',
  //   label: `Payments`,
  //   children: (
  //     <div className="min-h-[100vh] ">
  //       <AdminPaymentTable />
  //     </div>
  //   ),
  // },
  // {
  //   key: '5',
  //   label: `Homepage`,
  //   children: (
  //     <div className="min-h-[100vh] ">
  //       <AdminHomepage />
  //     </div>
  //   ),
  // },
  // {
  //   key: '6',
  //   label: ` voucher code`,
  //   children: (
  //     <div className="min-h-[100vh] ">
  //       <AdminVouchers />
  //     </div>
  //   ),
  // },
];

function AdminDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#801527] w-full h-[135px] ">
        <div className="main-container">
          <div className="container">
            <h1 className="text-[20px] text-white py-[31px] mb-0 px-[45px] nunito-font">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </div>
      <div className="main-container mt-[-36px] main-tabs">
        <div className="container relative">
          <Tabs
            className={
              'mt-[-18px] z-10  dashboard-custom-tab events-tabs-padding px-[4%]'
            }
            defaultActiveKey="2"
            items={items}
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
