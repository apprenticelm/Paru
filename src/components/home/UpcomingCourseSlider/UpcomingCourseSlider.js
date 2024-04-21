import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Card, Tag } from 'antd';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
      }}
      onClick={onClick}
    >
      <div
        style={{
          backgroundColor: '#f8f8f8',
          height: '42px',
          width: '42px',
          borderRadius: '6px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <RightOutlined style={{ color: '#4096ff', fontSize: '20px' }} />
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ display: 'block' }} onClick={onClick}>
      <div
        style={{
          backgroundColor: '#f8f8f8',
          height: '42px',
          width: '42px',
          borderRadius: '6px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ color: '#4096ff', fontSize: '20px' }}>
          <LeftOutlined />
        </div>
      </div>
    </div>
  );
}

const settings = {
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: false,
  pauseOnHover: true,
  swipeToSlide: true,
  centerMode: false,
  arrows: true,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 1213,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,

        infinite: true,
      },
    },

    {
      breakpoint: 1137,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,

        centerPadding: '-20px',
      },
    },
    {
      breakpoint: 896,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,

        centerPadding: '-40px',
      },
    },
    {
      breakpoint: 648,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

        centerPadding: '-100px',
      },
    },
    {
      breakpoint: 740,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

        centerPadding: '20px',
      },
    },
    {
      breakpoint: 648,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

        centerPadding: '-20px',
      },
    },
    {
      breakpoint: 561,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

        centerPadding: '-30px',
      },
    },
    {
      breakpoint: 541,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

        centerPadding: '-50px',
      },
    },
    {
      breakpoint: 503,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

        centerPadding: '-90px',
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 290,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        slidesToScroll: 1,

        autoplay: false,
      },
    },
  ],
};

const UpcomingCourseSlider = () => {
  let sliderRef;
  return (
    <div className="main-container bg-[#E8E9ED] pb-[80px]">
      <div className="container">
        <div className="px-[45px] tablet:px-[15px]">
          <div className="py-[70px] text-center text-[32px] font-bold">
            Upcoming courses
          </div>

          <div className="">
            <div className="slider-container">
              <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                  return (
                    <div className="pr-5">
                      <Card
                        hoverable
                        style={{
                          width: '95%',
                          margin: '20px',
                          height: '292px',
                          padding: '8px',
                          marginBottom: '5px',
                          borderRadius: '6px',
                          position: 'relative',
                          marginLeft: '20px',
                        }}
                      >
                        <div className="w-full">
                          <div className="text-[#1c3ed9] text-center ml-[80px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold w-[100% - 80px] ">
                            Aesculap Académie - B. Braun
                          </div>
                          <h3 className="mt-[5px] font-bold text-[18px] leading-[26px] tracking-wide overflow-hidden">
                            Maladie rénale chronique : prévention métabolique et
                          </h3>
                          <div className="flex justify-start items-center">
                            <StarFilled className="text-[#f6bb46]" />
                            &nbsp;<span>4.3</span>
                            &nbsp;<span>(29)</span>
                          </div>
                        </div>
                        <div className="absolute top-[-25px] left-[20px]">
                          <img
                            src="/images/companyLogo.png"
                            preview={false}
                            height={60}
                            width={60}
                            className="cover rounded-[5px]"
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="flex items-center mt-3 !rounded-full">
                            <img
                              src="/images/personExample.jpeg"
                              alt=""
                              className="!rounded-full h-[30px] w-[30px]"
                            />
                            <div className="font-semibold text-[12px] ml-3">
                              Prof. Denis Fouque
                            </div>
                          </div>
                        </div>
                        <div className="mt-[10px]">
                          <Tag bordered={false} color="processing">
                            Nephrology
                          </Tag>
                        </div>
                        <div className="w-full mt-1">
                          <Button
                            type="primary"
                            className="w-full h-[40px] bg-[rgb(28,62,217)]"
                          >
                            See more
                          </Button>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </Slider>
              <div
                className="custom-prev"
                onClick={() => {
                  sliderRef.slickPrev();
                }}
              >
                <SamplePrevArrow />
              </div>
              <div
                className="custom-next"
                onClick={() => {
                  sliderRef.slickNext();
                }}
              >
                <SampleNextArrow />
              </div>
            </div>
          </div>

          <div className="pt-[80px] flex justify-center items-center">
            <Button
              type="primary"
              className="h-[50px] text-[18px] min-w-[50px] px-[30px] font-semibold bg-[rgb(28,62,217)]"
            >
              Check out our magazine
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCourseSlider;
