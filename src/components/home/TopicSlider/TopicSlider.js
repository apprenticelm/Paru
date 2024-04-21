import { Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

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
  const { className, onClick } = props;
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
  slidesToShow: 2,
  slidesToScroll: 0.5,
  initialSlide: 0,
  autoplay: false,
  pauseOnHover: true,
  swipeToSlide: true,
  centerMode: false,
  arrows: true,

  responsive: [
    {
      breakpoint: 1213,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 0.5,

        infinite: true,
      },
    },

    {
      breakpoint: 1005,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 0.5,

        centerPadding: '-20px',
      },
    },
    {
      breakpoint: 932,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 0.5,

        centerPadding: '-40px',
      },
    },
    {
      breakpoint: 648,
      settings: {
        slidesToShow: 0.5,
        slidesToScroll: 0.5,

        centerPadding: '-100px',
      },
    },
    {
      breakpoint: 740,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 0.5,

        centerPadding: '20px',
      },
    },
    {
      breakpoint: 648,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 0.5,

        centerPadding: '-20px',
      },
    },
    {
      breakpoint: 561,
      settings: {
        slidesToShow: 0.5,
        slidesToScroll: 0.5,

        centerPadding: '-30px',
      },
    },
    {
      breakpoint: 541,
      settings: {
        slidesToShow: 0.5,
        slidesToScroll: 0.5,

        centerPadding: '-50px',
      },
    },
    {
      breakpoint: 503,
      settings: {
        slidesToShow: 0.5,
        slidesToScroll: 0.5,

        centerPadding: '-90px',
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 0.5,
        centerMode: false,
        slidesToScroll: 0.5,
      },
    },
    {
      breakpoint: 290,
      settings: {
        slidesToShow: 0.5,
        centerMode: false,
        slidesToScroll: 0.5,

        autoplay: false,
      },
    },
  ],
};
function TopicSlider() {
  const navigate = useNavigate();
  let sliderRef;
  return (
    <div className="main-container pb-[80px]">
      <div className="container">
        <div className=" tablet:px-[15px] ">
          {/* <div className="py-[70px] text-center text-[32px] font-bold">
            Upcoming Events
          </div> */}
          <div className="slider-container">
            <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
              <div className="!flex">
                <div className="pr-5 w-full  ">
                  <Card
                    hoverable
                    style={{
                      width: '100%',
                      margin: '0px',
                      height: '100%',
                      marginBottom: '5px',
                      borderRadius: '5px',
                      position: 'center',
                      marginLeft: '20px',
                    }}
                    // onClick={() => {
                    //   navigate('/register-event/1');
                    // }}
                    className="mr-[20px] mb-5 card !rounded-[5px]"
                    // cover={
                    //   <div>
                    //     <img
                    //       alt="example"
                    //       src="/images/poster1.jpg"
                    //       height={900}
                    //       className="object-fit"
                    //     />
                    //   </div>
                    // }
                  >
                  </Card>
                </div>
                
              </div>
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
          {/* <div className="pt-[80px] flex justify-center items-center">
            <Button
              type="primary"
              className="h-[50px] text-[18px] min-w-[50px] px-[30px] font-semibold bg-[rgb(28,62,217)]"
            >
              Check all medical cources
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TopicSlider;
