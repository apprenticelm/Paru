import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAlreadyRegisteredEvent,
  getEventDetailById,
} from '../services/events';
import { useQuery } from 'react-query';
import { Col, Image, Row, Spin, Table } from 'antd';
import moment from 'moment';
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { me } from '../services/auth';
import EventParticipantJoined from '../components/events/EventParticipantJoined';

function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectCase, setSelectCase] = useState();

  const id = params?.id;

  const { data, isLoading } = useQuery(['events-by-id', id], () => {
    return getEventDetailById({ id });
  });
  const { data: meData, isLoading: meLoading } = useQuery(
    'me',
    () => me(user?.token),
    {
      enabled: !!user?.token,
    }
  );

  const { data: alreadyRegistered, isLoading: alreadyRegisteredLoading } =
    useQuery(
      ['is-already-registered', id],
      () => {
        return getAlreadyRegisteredEvent({ id, token: user?.token });
      },
      {
        enabled: !!user?.token && !!id,
        retry: 0,
      }
    );

  // getEventDetailById
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const past = new Date(data?.data?.event?.registrationEnd) < new Date();

  function downloadURI(url, filename) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(console.error);
  }
  useEffect(() => {
    if (data?.data?.event?.EventCreationAdditional?.MaterialLinks) {
      setSelectCase(
        data?.data?.event?.EventCreationAdditional?.MaterialLinks[0]
      );
    }
  }, [data?.data?.event?.EventCreationAdditional?.MaterialLinks]);

  return (
    <Spin spinning={isLoading || alreadyRegisteredLoading || meLoading}>
      {data?.data?.event?.EventCreationAdditional?.ImageUrl ? (
        <img
          className="w-full h-[300px] object-contain"
          src={
            BASE_URL +
            '/' +
            data?.data?.event?.EventCreationAdditional?.ImageUrl
          }
          alt="background"
        />
      ) : (
        <div className="bg-[#165887] h-[300px] flex justify-center items-center">
          <div className="text-[54px] text-white">
            {data?.data?.event?.title}
          </div>
        </div>
      )}
      <div className="main-container pb-[80px]">
        <div
          className="container"
          style={{
            padding: '0 5%',
            marginTop: '30px',
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xxl={16} xl={16} lg={16} sm={24} md={24} xs={24}>
              <h1>{data?.data?.event?.title}</h1>
              <h2>{data?.data?.event?.modules}</h2>
              <>
                <br />
                {(data?.data?.event?.EventCreationAdditional?.details ||
                  data?.data?.event?.EventCreationAdditional?.learn ||
                  data?.data?.event?.EventCreationAdditional?.requirements ||
                  data?.data?.event?.EventCreationAdditional?.advantages) && (
                  <div className="p-10 bg-[#165887] rounded-3xl">
                    {data?.data?.event?.EventCreationAdditional?.details && (
                      <>
                        <br />
                        <div className="text-[20px] text-white">
                          Course details
                        </div>
                        <br />
                        <div className="text-white">
                          {data?.data?.event?.EventCreationAdditional?.details}
                        </div>
                      </>
                    )}
                    {/*{data?.data?.event?.EventCreationAdditional?.learn && (
                      <>
                        <br />
                        <br />
                        <div className="text-[20px] text-white">
                          What will you learn
                        </div>
                        <br />
                        <div className="text-white">
                          {data?.data?.event?.EventCreationAdditional?.learn}
                        </div>
                      </>
                    )}
                    {data?.data?.event?.EventCreationAdditional
                      ?.requirements && (
                      <>
                        <br />
                        <br />

                        <div className="text-[20px] text-white">
                          Requirement(s){' '}
                        </div>
                        <br />
                        <div className="text-white">
                          {
                            data?.data?.event?.EventCreationAdditional
                              ?.requirements
                          }
                        </div>
                      </>
                    )}
                    {data?.data?.event?.EventCreationAdditional?.advantages && (
                      <>
                        <br />
                        <br />

                        <div className="text-[20px] text-white">
                          Advantages of the course
                        </div>
                        <br />
                        <div className="text-white">
                          {
                            data?.data?.event?.EventCreationAdditional
                              ?.advantages
                          }
                        </div>
                      </>
                        )}*/}
                  </div>
                )}
              </>

              {data?.data?.event?.EventCreationAdditional?.documentUrl && (
                <>
                  <br />
                  <br />
                  <h1>Program</h1>
                  <a
                    href={
                      BASE_URL +
                      '/' +
                      data?.data?.event?.EventCreationAdditional?.documentUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here to download document
                  </a>
                </>
              )}
            </Col>
            <Col xxl={8} xl={8} lg={8} sm={24} md={24} xs={24}>
              <div className="border-[1px] border-solid border-black w-full rounded-xl ">
                <div className="p-5 ">
                  <h2>
                    {data?.data?.event?.price === 0
                      ? 'Free'
                      : 'RM ' + data?.data?.event?.price}
                  </h2>
                  {!past && (
                    <>
                      <div className="text-[#62c432] text-[20px]"></div>
                      <div className="mt-1 text-[14px]">
                        {data?.data?.event?.capacity} maximum participants
                      </div>
                    </>
                  )}
                  <div className="text-[18px] mt-4">Upcoming session</div>
                  <div className="text-[16px] mt-4">From</div>
                  <h2 className="flex flex-wrap items-center">
                    {moment(data?.data?.event?.scheduleStart).format(
                      'ddd, MMMM Do YYYY'
                    )}
                    <span className="ml-4 text-[blue] text-[18px]">
                      {moment(data?.data?.event?.scheduleStart).format('h:mma')}
                    </span>
                  </h2>
                  <div className="text-[16px] mt-4">To</div>
                  <h2 className="flex flex-wrap items-center">
                    {moment(data?.data?.event?.scheduleEnd).format(
                      'ddd, MMMM Do YYYY'
                    )}
                    <span className="ml-4 text-[blue] text-[18px]">
                      {moment(data?.data?.event?.scheduleEnd).format('h:mma')}
                    </span>
                  </h2>
                  <div className="w-full flex justify-center mt-20">
                    {past ? (
                      <div className="w-full flex justify-center mt-2 ">
                        <button className="cursor-not-allowed bg-[gray] text-white px-20 flex h-16 items-center text-[26px] border-[1px] border-solid border-[lightgray] rounded-md">
                          Register
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className={
                            (alreadyRegistered
                              ? 'bg-[#288810] text-[24px] cursor-not-allowed px-16'
                              : 'bg-[#E40046] text-[30px] cursor-pointer px-20') +
                            ' text-white  flex h-16 items-center  border-[1px] border-solid border-[lightgray]  rounded-md'
                          }
                          onClick={() => {
                            !alreadyRegistered &&
                              navigate('/register-event/' + id);
                          }}
                        >
                          {alreadyRegistered ? 'Registered' : 'Register'}
                        </button>
                        {alreadyRegistered && (
                          <div className="w-full flex justify-center mt-2">
                            <button
                              className="bg-[#E40046] text-white px-10 flex h-16 items-center text-[26px] border-[1px] border-solid border-[lightgray] cursor-pointer rounded-md"
                              onClick={() => {
                                navigate('/register-event/' + id);
                              }}
                            >
                              Register again
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="w-full border-[1px] border-solid border-[#9c9c9c] bg-[#f0f0f0] rounded-xl flex"
                  style={{ borderBottom: 'none' }}
                >
                  <div className="w-[50%] p-4 flex items-center">
                    <MailOutlined className="text-[20px]" />
                    <div className="text-[12px] ml-2">
                      <div>anis@longemend.com</div>
                      <div>elyia@longemend.com</div>
                    </div>
                  </div>
                  <div
                    className="w-[50%] border-l h-full p-4  flex items-center"
                    style={{
                      borderLeft: '1px solid #9c9c9c',
                    }}
                  >
                    <PhoneOutlined className="text-[20px]" />
                    <div className="text-[12px] ml-2">
                      +60389592593 (Anis/Elyia)
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <br />

          <br />

          {(alreadyRegistered ||
            meData?.data?.role === 'admin' ||
            meData?.data?.id === data?.data?.event?.userId) &&
            (data?.data?.event?.EventCreationAdditional?.MaterialDocuments
              ?.length > 0 ||
              data?.data?.event?.EventCreationAdditional?.MaterialImages
                .length > 0 ||
              data?.data?.event?.EventCreationAdditional?.MaterialVideos
                ?.length > 0) && (
              <>
                <h1>Materials for registered user</h1>
                <br />
                {data?.data?.event?.EventCreationAdditional?.MaterialDocuments
                  ?.length > 0 && <h2>Documents</h2>}

                {data?.data?.event?.EventCreationAdditional?.MaterialDocuments.map(
                  (document) => {
                    return (
                      <div className="flex mb-6 " key={document?.id}>
                        <div className=" text-[16px] max-w-[400px] w-[300px] truncate">
                          {document?.originalFilename}
                        </div>
                        <div
                          className="ml-4 text-[blue] cursor-pointer font-bold text-[16px]"
                          onClick={() => {
                            window.open(
                              process.env.REACT_APP_BASE_URL +
                                '/' +
                                document?.path,
                              '_blank'
                            );
                          }}
                        >
                          Preview
                        </div>
                        <div
                          className="ml-4 text-[blue] cursor-pointer font-bold text-[16px]"
                          onClick={() => {
                            downloadURI(
                              process.env.REACT_APP_BASE_URL +
                                '/' +
                                document?.path,
                              document?.originalFilename
                            );
                          }}
                        >
                          Download
                        </div>
                      </div>
                    );
                  }
                )}
                {data?.data?.event?.EventCreationAdditional?.MaterialImages
                  .length > 0 && <h2>Pictures</h2>}
                <Row gutter={[24, 24]}>
                  {data?.data?.event?.EventCreationAdditional?.MaterialImages.map(
                    (image) => {
                      return (
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Image
                            className="w-full object-contain"
                            src={
                              process.env.REACT_APP_BASE_URL + '/' + image?.path
                            }
                            alt={image?.originalFilename}
                          />
                        </Col>
                      );
                    }
                  )}
                </Row>

                <br />
                {data?.data?.event?.EventCreationAdditional?.MaterialVideos
                  ?.length > 0 && <h2>Videos</h2>}
                <Row gutter={[24, 24]}>
                  {data?.data?.event?.EventCreationAdditional?.MaterialVideos.map(
                    (file) => {
                      return (
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                          <video
                            className="w-full h-[300px] object-cover"
                            controls
                          >
                            <source
                              src={
                                process.env.REACT_APP_BASE_URL +
                                '/' +
                                file?.path
                              }
                              type={file?.mimetype}
                            ></source>
                          </video>
                        </Col>
                      );
                    }
                  )}
                </Row>

                <br />
                <br />
              </>
            )}
          <h2>Instructors</h2>
          <div className="flex items-center mt-4">
            <div className="p-2 bg-[lightblue] h-12 w-12 flex justify-center items-center rounded-full">
              <UserOutlined className="text-[20px]" />
            </div>
            <div className="ml-5 ">
              <div className="text-[blue] text-[22px] font-semibold">
                {data?.data?.event?.instructor &&
                  JSON.parse(data?.data?.event?.instructor)
                    .reduce((acc, array) => acc.concat(array), [])
                    .map((instructor, index) => {
                      return (
                        <div key={index}>
                          <span>
                            {/* {index + 1}
                            {')'} &nbsp; */}
                            {instructor}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          {data?.data?.event?.speaker && (
            <>
              <h2>Speakers</h2>
              <div className="flex items-center mt-4">
                <div className="p-2 bg-[lightblue] h-12 w-12 flex justify-center items-center rounded-full">
                  <UserOutlined className="text-[20px]" />
                </div>
                <div className="ml-5 ">
                  <div className="text-[black] text-[22px] font-semibold">
                    {data?.data?.event?.speaker &&
                    data?.data?.event?.speaker[0] === '['
                      ? JSON.parse(data?.data?.event?.speaker)
                          .reduce((acc, array) => acc.concat(array), [])
                          .map((speaker, index) => {
                            return (
                              <div key={index}>
                                <span>
                                  {/* {index + 1}
                                  {')'} &nbsp; */}
                                  {speaker}
                                </span>
                              </div>
                            );
                          })
                      : data?.data?.event?.speaker}
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
            </>
          )}
          <br />
          {(alreadyRegistered ||
            meData?.data?.role === 'admin' ||
            meData?.data?.id === data?.data?.event?.userId) &&
            data?.data?.event?.EventCreationAdditional?.MaterialLinks?.length >
              0 && (
              <>
                <div>
                  <iframe
                    className="flex w-full h-[60vh] border-none"
                    title={selectCase}
                    src={selectCase}
                  ></iframe>
                </div>
                <br />
                <div className="flex">
                  {data?.data?.event?.EventCreationAdditional?.MaterialLinks?.map(
                    (link, index) => {
                      return (
                        <div key={link} className="m-2">
                          <button
                            className=" button-color border-none  text-white h-[40px] bg-[#165887] flex items-center gap-2  px-6 py-2 rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
                            onClick={() => {
                              setSelectCase(link);
                            }}
                          >
                            Case {index + 1}
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
                <br />
                <br />
              </>
            )}

          {(meData?.data?.id === data?.data?.event?.userId ||
            meData?.data?.role === 'admin') && (
            <div>
              <EventParticipantJoined />
            </div>
          )}
          <div className="flex items-center ">
            <div
              className="border-[1px] border-solid border-gray rounded-full w-12 h-12 flex justify-center items-center  cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftOutlined className="text-[24px]" />
            </div>
            <div
              className="ml-4 font-bold text-[20px] underline-[blue] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
              <div className="text-[blue] underline">BACK</div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default EventDetails;
