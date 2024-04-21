import { Col, Divider, Form, Input, Radio, Row, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  getAllEvents,
  getModulesAndInstructors,
} from '../../../services/events';
import { useAuth } from '../../../hooks/useAuth';
import Events from '../Events';
import useDebounce from '../../../hooks/debounce';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Search } = Input;

function SearchEvent() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParamValue = searchParams.get('search');

  const [values, setValues] = useState();
  const [searchString, setSearchString] = useState('');

  const debouncedSearchTerm = useDebounce(searchString, 800);

  const { data, isLoading } = useQuery('modules-instructors', () => {
    return getModulesAndInstructors({ token: user?.token });
  });

  // const { data: eventsData, isLoading: eventsLoading } = useQuery(
  //   ['events', values, debouncedSearchTerm],
  //   () => {
  //     return getAllEvents({
  //       token: user?.token,
  //       params: { search: debouncedSearchTerm, ...values },
  //     });
  //   },
  // );

  const { data: eventsData, isLoading: eventsLoading } = useQuery(
    ['events', values, debouncedSearchTerm],
    () => {
      return getAllEvents({
        token: user?.token,
        params: { search: debouncedSearchTerm, ...values },
      });
    },
  );


  useEffect(() => {
    if (searchParamValue) {
      setSearchString(searchParamValue);
    }
  }, [searchParamValue]);

  useEffect(() => {
    debouncedSearchTerm &&
      navigate(`/search-event?search=${debouncedSearchTerm}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const events1 =
    values?.format === 'available'
      ? eventsData?.data?.available
      : values?.format === 'past'
      ? eventsData?.data?.past
      : eventsData?.data?.all;

  return (
    <div className="main-container">
      <div className="container ">
        <Row className="my-10 " gutter={[10, 20]}>
          <Search
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            value={searchString}
            placeholder="What are you interested in?"
            allowClear
            style={{
              width: '100%',
            }}
          />
          <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
            <Spin spinning={isLoading}>
              <div className="rounded-xl border-[2px] border-gray-500 border-solid p-4">
                <h2>Filter</h2>
                <Form
                  form={form}
                  className="mt-8"
                  onFieldsChange={(changedValues, allValues) => {
                    setValues({
                      format: allValues[0]?.value,
                      module: allValues[1]?.value,
                      priceFrom: allValues[2]?.value?.split('-')[0],
                      priceTo: allValues[2]?.value?.split('-')[1],
                      instructor: allValues[3]?.value,
                    });
                  }}
                >
                  <h3>Formats</h3>
                  <Form.Item name="format" initialValue={'all'}>
                    <Radio.Group>
                      <Space direction="vertical">
                        {/* <Radio value={'all'}>All</Radio> */}
                        <Radio value={'available'}>Upcoming Events</Radio>
                        <Radio value={'past'}>Past</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Divider />

                  <h3>Module</h3>
                  <Form.Item name="module" initialValue={'all'}>
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value={'all'} key={'all'}>
                          All
                        </Radio>
                        {data?.data?.modules.map((module) => {
                          return (
                            <Radio value={module} key={module}>
                              {module}
                            </Radio>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Divider />

                  <h3>Pricing</h3>
                  <Form.Item name="price" initialValue={'all'}>
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value={'all'}>All</Radio>
                        <Radio value={'0-0'}>Free</Radio>
                        <Radio value={'50-250'}>RM 50 - RM 250</Radio>
                        <Radio value={'250-500'}>RM 250 - RM 500</Radio>
                        <Radio value={'500-1000'}>RM 500 - RM 1000</Radio>
                        <Radio value={'1000-5000'}>RM 1000 - RM 5000</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Divider />

                  <h3>Instructor</h3>
                  <Form.Item name="instractor" initialValue={'all'}>
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value={'all'}>All</Radio>
                        {data?.data?.instructors.map((instractor) => {
                          return (
                            <Radio value={instractor} key={instractor}>
                              {instractor}
                            </Radio>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </div>
            </Spin>
          </Col>
          <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
            <Spin spinning={eventsLoading}>
              <Events events={events1} />
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SearchEvent;
