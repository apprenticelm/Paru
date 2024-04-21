import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Profile from '../components/profile/profile';
import EventsTabs from '../components/events/Events-tabs';

const items = [
  {
    key: '1',
    label: `My Profile`,

    children: (
      <div className=" min-h-[100vh]">
        <Profile />
      </div>
    ),
  },
  {
    key: '2',
    label: `Events`,
    children: (
      <div className="  min-h-[100vh] ">
        <EventsTabs />
      </div>
    ),
  },
];

function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#1C3ED9] w-full h-[135px] ">
        <div className="main-container">
          <div className="container">
            <h1 className="text-[20px] text-white py-[31px] mb-0 px-[45px] nunito-font">
              My Dashboard
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

export default Dashboard;
