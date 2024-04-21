import { Col, Row, message } from 'antd';
import React from 'react';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from 'react-query';
import { deleteEvents } from '../../services/events';
import { queryClient } from '../../App';

function EventCard({ event }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: deleteEvent } = useMutation(
    (data) => deleteEvents({ data, token: user?.token }),
    {
      onSuccess: () => {
        queryClient.refetchQueries('events');
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  const handleDelete = () => {
    deleteEvent({ eventId: event?.id });
  };

  const handleEdit = () => {
    navigate(`/event-edit/${event?.id}`);
  };
  const myEvent = user?.user?.id === event?.userId;
  return (
    <div>
      <div className="bg-white  cursor-pointer rounded-lg text-[gray] relative">
        {myEvent && (
          <div className="mb-6">
            <div
              className="absolute right-5 top-3 z-50 mr-10"
              onClick={handleEdit}
            >
              <EditOutlined className="text-[24px] text-[gray]" />
            </div>
            <div className="absolute right-5 top-3 z-50" onClick={handleDelete}>
              <DeleteOutlined className="text-[24px] text-[red]" />
            </div>
          </div>
        )}
        <Row
          onClick={() => {
            navigate('/event-detail/' + event?.id);
          }}
        >
          <Col
            xxl={18}
            xl={18}
            lg={18}
            md={18}
            sm={24}
            className="p-8 py-5 event-card-border"
            style={{ borderRight: '2px solid lightgray' }}
          >
            <div className="flex flex-col justify-between gap-[65px]">
              <div className=" ">
                <h1 className="text-[black] event-heading">{event?.title}</h1>
                <p className=" mt-[-15px]">{event?.modules}</p>

                <br />
                <br />
                <h2>Location:</h2>
                <div className="event-address mt-[-10px]">
                  <h3>{event?.location}</h3>
                </div>
              </div>
              <div className="w-full">
                <div className="flex event-address-parent">
                  <div className="w-[100px]">Instructor</div>
                  <div className="ml-10 flex items-center">
                    <div className="flex flex-col ">
                      {event?.instructor[0] === '[' ? (
                        JSON.parse(event?.instructor).map(
                          (instructor, index) => {
                            return (
                              <div key={index}>
                                <span>
                                  {index + 1}
                                  {')'} &nbsp;
                                  {instructor}
                                </span>
                              </div>
                            );
                          },
                        )
                      ) : (
                        <span>
                          <UserOutlined />
                          &nbsp; {event?.instructor}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            className="p-5 px-5 relative"
            xxl={6}
            xl={6}
            lg={6}
            md={6}
            sm={24}
            xs={24}
          >
            <h2 className={myEvent ? 'mt-6 text-[black]' : 'text-[black]'}>
              {moment(event?.scheduleStart).format('MMMM Do, YYYY')}
            </h2>
            <p className=" mt-[-10px]">
              {moment(event?.scheduleStart).format('h:mm A')} -{' '}
              {moment(event?.scheduleEnd).format('h:mm A')}
            </p>
            <div className="absolute bottom-0 right-0 w-full">
              <div className=" event-address px-4 float-right w-full">
                {event?.price === 0 ? (
                  <h2 className="float-right">Free</h2>
                ) : (
                  <h2 className="float-right">RM {event?.price}</h2>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EventCard;
