import { Row, Col } from 'antd';
import React from 'react';
import { useWindowSize } from '../../../hooks/windowDimensions';

const Banner = () => {
  const { width } = useWindowSize();

  if (width > 520) {
    return (
      <div className="main-container">
        {' '}
        <section className="homeBanner">
          <div className="main-container">
            <div className="container">
              <div className="pr-[45px] pl-[65px]  overflow-x-hidden overflow-y-hidden pb-10">
                <Row gutter={60}>
                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className=" banner h-full  flex justify-center flex-col">
                      <p className=" title tablet:text-center tracking-wide text-[52px]   font-semibold mb-[37px]">
                        Patient-Specific Artificial Respiratory Unit
                      </p>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <img
                      src="/images/paru-bg.jpg"
                      alt="tablet"
                      className="h-[100%] w-[100%] pt-24 object-cover "
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="main-container min-w-[420px] overflow-x-auto">
        {' '}
        <section className="homeBanner">
          <div className="main-container">
            <div className="container">
              <div className="  overflow-x-hidden overflow-y-hidden ">
                <Row>
                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className=" banner h-full  flex justify-center flex-col">
                      <p className=" title tablet:text-center tracking-wide text-[54px]   font-semibold mb-[37px]">
                        Patient-Specific Artificial Respiratory Unit
                      </p>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <img
                      src="/images/paru-bg.jpg"
                      alt="tablet"
                      className="pt-14 h-[100%] w-[100%]"
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Banner;
