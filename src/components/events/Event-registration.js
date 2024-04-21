import { Button, Col, Form, Input, Radio, Row, Spin, message } from 'antd';
import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMutation, useQuery } from 'react-query';
import { getEventDetailById, proceedWithPayment } from '../../services/events';
import { useNavigate, useParams } from 'react-router-dom';
import { me } from '../../services/auth';
import moment from 'moment';

function EventRegistration() {
  const { user } = useAuth();
  const [form] = Form.useForm();

  const params = useParams();
  const navigate = useNavigate();

  const id = params?.id;

  const { data: meData, isLoading: meLoading } = useQuery(
    'me',
    () => me(user?.token),
    {
      enabled: !!user?.token,
    }
  );

  const { data: eventDetails, isLoading: eventIsLoading } = useQuery(
    ['events-by-id', id],
    () => {
      return getEventDetailById({ id });
    }
  );

  const meUser = meData?.data;

  const eventDetail = eventDetails?.data?.event;

  useEffect(() => {
    if (meUser?.id) {
      form.setFieldsValue({
        fullName: meUser?.firstName + ' ' + meUser?.lastName,
        email: meUser?.email,
        department: meUser?.department,
        practicingNumber: meUser?.practicingNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meUser?.id]);

  return (
    <Spin spinning={meLoading || eventIsLoading}>
      <div className="main-container mt-[100px]">
        <div className="container">
          <Spin spinning={meLoading}>
            <div className=" px-[15%]">
              <h1>Registration</h1>
              <p>who are you registrating for?</p>
              <Row>
                <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                  <Form
                    layout="vertical"
                    onFinish={(value) => {
                      // if (
                      //   eventDetail?.price -
                      //     (data?.data?.coupon?.discount || 0) >
                      //   0
                      // ) {
                      //   handleSubmit(value);
                      // } else {
                      // }
                      const registrationFor =
                        value?.registrationFor || 'mySelf';
                      // console.log(
                      //   'value?.registrationFor',
                      //   '/event-qr?fullName=' +
                      //     value?.fullName +
                      //     '&email=' +
                      //     value?.email +
                      //     '&eventId=' +
                      //     params?.id +
                      //     '&registrationFor=' +
                      //     registrationFor
                      // );
                      navigate(
                        '/event-qr?fullName=' +
                          value?.fullName +
                          '&email=' +
                          value?.email +
                          '&eventId=' +
                          params?.id +
                          '&registrationFor=' +
                          registrationFor
                      );

                      // mutate({
                      //   ...value,
                      //   eventId: +params?.id,
                      //   registrationFor: value?.registrationFor || 'mySelf',
                      // });
                    }}
                    form={form}
                    onValuesChange={(item) => {
                      if (item?.registrationFor === 'mySelf') {
                        console.log('item', item);
                        form.setFieldsValue({
                          fullName: meUser?.firstName + ' ' + meUser?.lastName,
                          email: meUser?.email,
                          department: meUser?.department,
                          practicingNumber: meUser?.practicingNumber,
                        });
                      } else if (item?.registrationFor === 'forOther') {
                        form.setFieldsValue({
                          fullName: '',
                          email: '',
                          department: '',
                          practicingNumber: '',
                        });
                      }
                    }}
                  >
                    <Form.Item name="registrationFor">
                      <Radio.Group
                        buttonStyle="solid"
                        className="flex gap-4"
                        defaultValue={'mySelf'}
                      >
                        <div className="border-[1px] border-[#445FD8] border-solid p-2 rounded-lg">
                          <Radio value="mySelf">Myself</Radio>
                        </div>
                        <div className="border-[1px] border-[#445FD8] border-solid p-2 rounded-lg">
                          <Radio value="forOther">for someone else</Radio>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="fullName"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input type="email" />
                    </Form.Item>
                    {/* <Form.Item
                      name="telephone"
                      label="Telephone No."
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="nationality"
                      label="Nationality"
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="insituition"
                      label="Instituition / Organisation"
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="department"
                      label="Department"
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="practicingNumber"
                      label="Particing No."
                      rules={[
                        {
                          required: true,
                          message: 'Field required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item> */}
                    <Form.Item>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="rounded-[8px] h-[50px] px-[30px] bg-[#165887]  "
                      >
                        Proceed to Payment
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                  <div className="p-8">
                    <div className="border-[2px] border-solid border-[lightgray] min-h-[250px] rounded-lg p-2 relative">
                      <h2>{eventDetail?.title}</h2>
                      <br />
                      <h3>From</h3>
                      <div className="text-[gray] text-[14px] font-semibold ">
                        {moment(eventDetail?.scheduleStart).format(
                          'ddd, MMMM Do YYYY'
                        )}
                        <span className="ml-4 text-[blue] text-[12px]">
                          {moment(eventDetail?.scheduleStart).format('h:mma')}
                        </span>
                      </div>
                      <br />
                      <h3>To</h3>
                      <div className="text-[gray] text-[14px] font-semibold ">
                        {moment(eventDetail?.scheduleEnd).format(
                          'ddd, MMMM Do YYYY'
                        )}
                        <span className="ml-4 text-[blue] text-[12px]">
                          {moment(
                            eventDetail?.scheduleStart?.scheduleEnd
                          ).format('h:mma')}
                        </span>
                      </div>
                      <br />

                      <br />
                      <br />
                      <br />
                      <div className="text-[16px] font-semibold w-full flex justify-between absolute bottom-2">
                        <div>Total:</div>
                        <div className="mr-[20px]">RM {eventDetail?.price}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Spin>
        </div>
      </div>
    </Spin>
  );
}

export default EventRegistration;
