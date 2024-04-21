import React from 'react';
import EventCard from './EventCard';

function Events({ events }) {
  console.log('events====>>>', events);
  return (
    <div className="bg-[#17598A] py-[50px] px-[30px] event-cards-padding rounded-md">
      {events?.map((event) => {
        return (
          <div className="my-6 " key={event?.id}>
            <EventCard event={event} />
          </div>
        );
      })}
    </div>
  );
}

export default Events;
