import React, { useEffect, useState } from 'react';
import Events from './Events';
import CreateEvent from './create-event/create-event';
import AdditionalEventDetails from './create-event/additional-event-detail';
import { useQuery } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { getAllEvents } from '../../services/events';
import { Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

const tabs = ['All', 'Available', 'Past', 'Event-Tickets'];
const defaultTab = 'Available';

function EventsTabs() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [eventId, setEventId] = useState();

  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');

  const { data, isLoading } = useQuery('events', () => {
    return getAllEvents({ token: user?.token });
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard?tab=${tab}`);
  };

  const allEvents = data?.data?.all;
  const availableEvents = data?.data?.available;
  const pastEvents = data?.data?.past;

  useEffect(() => {
    if (urlTab) setActiveTab(urlTab);
  }, [urlTab]);

  return (
    <div>
      {
        <div
          className="bg-orange-700 h-[35px] text-white px-4 flex justify-center items-center w-[150px] float-right rounded-md cursor-pointer create-an-event"
          onClick={() => {
            setActiveTab('event-creation');
            navigate(`/dashboard?tab=event-creation`);
          }}
        >
          Create an event
        </div>
      }
      <div className="tabs flex">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab px-3 bg-white border-[1px] border-[#eef1fd] border-solid h-[35px] cursor-pointer flex items-center justify-center min-w-[80px] ${
              tab === activeTab ? 'event-active-tab' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <Spin spinning={isLoading}>
        <div className="tab-content">
          {[...tabs, ...['event-creation', 'additional-event-detail']].map(
            (tab) => (
              <div
                key={tab}
                className={`tab-pane  main-event-tab-padding p-4 bg-[#FFFFFF] ${
                  tab === activeTab ? ' ' : 'hidden'
                }`}
              >
                {/* Content for each tab */}
                {tab === 'All' && <Events events={allEvents} />}
                {tab === 'Available' && <Events events={availableEvents} />}
                {tab === 'Past' && <Events events={pastEvents} />}
                {tab === 'event-creation' && (
                  <CreateEvent
                    setActiveTab={setActiveTab}
                    setEventId={setEventId}
                  />
                )}
                {tab === 'additional-event-detail' && (
                  <AdditionalEventDetails
                    eventId={eventId}
                    setActiveTab={setActiveTab}
                  />
                )}
              </div>
            )
          )}
        </div>
      </Spin>
    </div>
  );
}

export default EventsTabs;
