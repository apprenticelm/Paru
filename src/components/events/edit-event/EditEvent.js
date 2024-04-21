/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, DatePicker, Form, Input, Row, Spin, message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getEventDetailById, updateEvent } from '../../../services/events';
import { useAuth } from '../../../hooks/useAuth';
import TagInput from '../../shared/TagInput';
import { queryClient } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { RangePicker } = DatePicker;

const activeButton =
  'rounded-lg text-white flex items-center justify-center px-[20px] py-[5px] bg-[rgb(28,62,217)] cursor-pointer';

const deactiveButton =
  'rounded-lg text-black flex items-center justify-center px-[20px] py-[5px] bg-[rgb(186,221,245)] cursor-pointer';

function EditEvent() {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();

  const [participant, setParticipant] = useState();
  const [pricing, setPricing] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagSpeaker, setSpeakerTags] = useState([]);

  const { mutate, isLoading } = useMutation(
    (data) => updateEvent({ data, token: user?.token, eventId: id }),
    {
      onSuccess: (val) => {
        message.success('Event updated successfully!');
        queryClient.refetchQueries('events');
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  const { data } = useQuery(
    ['events-by-id', id],
    () => {
      return getEventDetailById({ id });
    },
    {
      onSuccess: (data) => {
        const event = data?.data?.event;
        console.log('dara', data?.data?.event);
        if (event?.instructor) {
          console.log('instructor', JSON.parse(event?.instructor));
          setTags(JSON.parse(event?.instructor));
        }
        if (event?.speaker) {
          setSpeakerTags(JSON.parse(event?.speaker));
        }
        if (event?.capacity) {
          setParticipant(event?.capacity);
        }
        if (event?.price) {
          setPricing(event?.price);
        }
        form.setFieldsValue({
          title: event?.title,
          modules: event?.modules,
          //   schedule: [moment(event?.scheduleStart), moment(event?.scheduleEnd)],
          location: event?.location,
        });
      },
    },
  );

  const event = data?.data?.event;

  console.log('event', event);

  console.log(data?.data?.event, params);
  useEffect(() => {
    console.log(participant);
    form.setFieldsValue({
      capacity: participant,
      price: pricing,
    });
  }, [participant, pricing]);

  useEffect(() => {
    form.setFieldsValue({
      instructor: JSON.stringify(tags),
      speaker: JSON.stringify(tagSpeaker),
    });
  }, [tags.length, tagSpeaker?.length]);
  return (
    <div className="main-container pb-[80px] mt-12">
      <div className="container">
        <div className="px-[6%]">
          <Spin spinning={isLoading}>
            <h2>Edit an event</h2>
            <SubHeadings text={'Event details'} number={'1'} />
            <Form
              layout="vertical"
              onFinish={(val) => {
                console.log('mutate called');
                mutate({
                  ...val,
                  registrationStart:
                    val?.registration && val?.registration[0]?.$d,
                  registrationEnd:
                    val?.registration && val?.registration[1]?.$d,
                  scheduleStart: val?.schedule && val?.schedule[0]?.$d,
                  scheduleEnd: val?.schedule && val?.schedule[1]?.$d,
                  capacity: val?.capacity && +val?.capacity,
                  price: +val?.price && +val?.price,
                });
              }}
              form={form}
            >
              <div className="max-w-[600px]">
                <Form.Item name="title" label="Title">
                  <Input />
                </Form.Item>
                <Form.Item name="modules" label="Module(s)">
                  <Input />
                </Form.Item>
                <SubHeadings text={'Schedule'} number={'2'} />
                <Form.Item name="schedule" label="Date and Time">
                  <RangePicker
                    showTime={{
                      format: 'hh:mm A',
                      use12Hours: true,
                    }}
                    placeholder={[
                      moment(event?.scheduleStart).format(
                        'YYYY-MM-DD HH:mm:ss',
                      ),
                      moment(event?.scheduleEnd).format('YYYY-MM-DD HH:mm:ss'),
                    ]}
                  />
                </Form.Item>
                <SubHeadings text={'Location'} number={'3'} />
                <Form.Item name="location" label="Location">
                  <Input />
                </Form.Item>
                <SubHeadings text={'Instructor / Speakers'} number={'4'} />
                <Row gutter={40}>
                  <Col span={12}>
                    <Form.Item
                      className="text-[rgb(46,49,62)]"
                      name="instructor"
                      label="Instructor(s)"
                    >
                      <TagInput
                        tags={tags}
                        setTags={setTags}
                        label="New Instructor"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="speaker" label="Speaker(s)">
                      <TagInput
                        tags={tagSpeaker}
                        setTags={setSpeakerTags}
                        label="New Speaker"
                      />
                      {/* <Input
                    className="input rounded-sm   px-[18px] border-[rgb(131,139,163)]"
                    size="large"
                    placeholder="Speakers"
                  /> */}
                    </Form.Item>
                  </Col>
                </Row>
                <SubHeadings text={'Capacity'} number={'5'} />
                <div className="text-[20px]">No of participants</div>
                <div className="flex gap-4 my-4">
                  <div
                    className={
                      !(
                        participant === 50 ||
                        participant === 500 ||
                        participant === '50' ||
                        participant === '500'
                      )
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setParticipant();
                    }}
                  >
                    Open
                  </div>
                  <div
                    className={
                      participant === 50 || participant === '50'
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setParticipant('50');
                    }}
                  >
                    50 pax
                  </div>
                  <div
                    className={
                      participant === 500 || participant === '500'
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setParticipant('500');
                    }}
                  >
                    500 pax
                  </div>
                </div>
                <Form.Item name="capacity" placeholder="Custom">
                  <Input
                    type="number"
                    onChange={(e) => {
                      setParticipant(e.target.value);
                    }}
                  />
                </Form.Item>
                <SubHeadings text={'Pricing'} number={'6'} />
                <div className="flex gap-4 my-4">
                  <div
                    className={
                      !(
                        pricing === 50 ||
                        pricing === 250 ||
                        pricing === 500 ||
                        pricing === 1000 ||
                        pricing === '50' ||
                        pricing === '250' ||
                        pricing === '500' ||
                        pricing === '1000'
                      )
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setPricing(0);
                    }}
                  >
                    Free
                  </div>
                  <div
                    className={
                      pricing === '50' || pricing === 50
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setPricing('50');
                    }}
                  >
                    RM 50
                  </div>
                  <div
                    className={
                      pricing === '250' || pricing === 250
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setPricing('250');
                    }}
                  >
                    RM 250
                  </div>
                  <div
                    className={
                      pricing === 500 || pricing === '500'
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setPricing('500');
                    }}
                  >
                    RM 500
                  </div>
                  <div
                    className={
                      pricing === 1000 || pricing === '1000'
                        ? activeButton
                        : deactiveButton
                    }
                    onClick={() => {
                      setPricing('1000');
                    }}
                  >
                    RM 1000
                  </div>
                </div>
                <Form.Item name="price" placeholder="Custom">
                  <Input
                    type="number"
                    value={pricing}
                    onChange={(e) => {
                      setPricing(e.target.value);
                    }}
                  />
                </Form.Item>
                <SubHeadings text={'Registration'} number={'7'} />
                <Form.Item name="registration" label="Date and Time">
                  <RangePicker
                    showTime={{ format: 'hh:mm A', use12Hours: true }}
                    placeholder={[
                      moment(event?.registrationStart).format(
                        'YYYY-MM-DD HH:mm:ss',
                      ),
                      moment(event?.registrationEnd).format(
                        'YYYY-MM-DD HH:mm:ss',
                      ),
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex gap-4 my-4 float-right">
                <Button
                  onClick={() => {
                    if (event?.EventCreationAdditional) {
                      navigate(`/additional-event-edit/${id}`);
                    } else {
                      navigate(
                        `/dashboard/${event?.id}?tab=additional-event-detail`,
                      );
                    }
                  }}
                >
                  Edit additional details
                </Button>
              </div>
              <div className="mr-4 flex gap-4 my-4 float-right">
                <Button htmlType="submit">Update event</Button>
              </div>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;

function SubHeadings({ text, number }) {
  return (
    <div className="flex items-center mt-5">
      <div className="border-[1px] border-solid border-black rounded-[180px] h-[20px] w-[20px] flex justify-center items-center text-[16px] ">
        <div className="mt-[-2px]">{number}</div>
      </div>
      <span className="mt-2 ml-2 ">
        <h3>{text}</h3>
      </span>
    </div>
  );
}
