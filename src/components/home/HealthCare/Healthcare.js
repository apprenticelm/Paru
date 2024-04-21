import { Col, Image, Row } from 'antd';
import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { GoLinkExternal } from 'react-icons/go';
function Healthcare() {
  return (
    <div className="main-container bg-[rgb(28,62,217)]">
      <div className="container">
        <div className="py-[60px] px-[45px] tablet:px-[15px]   ">
          <div className="text-white flex items-center justify-center flex-col">
            <p className=" text-[32px] tablet:text-center">
              Healthcare industry, Training organization, Hospital...
            </p>
            <p className="text-[16px] tablet:text-center">
              Share your content and events on a platform dedicated to
              healthcare professionals.
            </p>
          </div>
          <Row>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Image preview={false} src="/images/connectDesktop.png" />
            </Col>
            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={24}
              sm={24}
              xs={24}
              className="pl-4 flex items-center justify-start tablet:justify-center "
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-white gap-3 text-[16px]">
                  <span>
                    <CheckOutlined />
                  </span>
                  <p>Centralize your content and events on our platform</p>
                </div>
                <div className="flex items-center text-white gap-3 text-[16px]">
                  <span>
                    <CheckOutlined />
                  </span>
                  <p>Make your content visible to your audience</p>
                </div>
                <div className="flex items-center text-white gap-3 text-[16px]">
                  <span>
                    <CheckOutlined />
                  </span>
                  <p>Collect leads and analyse your events</p>
                </div>
                <div className="tablet:flex tablet:justify-center">
                  <button className="border-none   text-[#165887] bg-[rgb(238,241,253)] flex items-center  gap-2 h-[40px] px-[14px] py-[8px] rounded cursor-pointer hover:bg-[rgb(211,219,250)] duration-300">
                    <GoLinkExternal className="text-[19px] " />{' '}
                    <span className="tracking-wide ">
                      Invivox For Business{' '}
                    </span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Healthcare;
