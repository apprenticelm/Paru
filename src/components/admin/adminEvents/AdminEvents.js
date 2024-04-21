import React from 'react';
import { useQuery } from 'react-query';
import { getAllAdminEvents } from '../../../services/events';
import { useAuth } from '../../../hooks/useAuth';
import AdminEventCard from './AdminEventCard';

function AdminEvents() {
  const { user } = useAuth();

  const { data } = useQuery('getAllAdminEvents', () =>
    getAllAdminEvents({ token: user?.token }),
  );

  console.log('data?.events', data?.data?.events);

  const events = data?.data?.events;

  return (
    <div className="bg-[#17598A] py-[50px] px-[30px] event-cards-padding rounded-md">
      {events?.map((event) => {
        return (
          <div className="my-6 " key={event?.id}>
            <AdminEventCard event={event} />
          </div>
        );
      })}
    </div>
  );
}

export default AdminEvents;
