import { Col, Row } from 'antd';
import React from 'react';




function Works() {
  // const navigate = useNavigate();
  // const params = useParams();

  // const moduleName = params?.moduleName;

  // const { data, isLoading } = useQuery('events-by-module', () => {
  //   return getAllEventWithModules({ moduleName });
  // });
  // const availableEvents = data?.data?.available;
 
  const partners = [
    {
      key: 1,
      src: '/images/MABIP Logo.png',
    },
    {
      key: 2,
      src: '/images/Persatuan Pulmonolgy Hospital Serdang Logo.jpg',
    },
    // {
    //   key: 4,
    //   src: '/images/University Logo.png',
    // },
    // {
    //   key: 5,
    //   src: '/images/UPM Logo.png',
    // },
    // {
    //   key: 6,
    //   src: '/images/MyNIS Logo.jpg',
    // },
    // {
    //   key: 7,
    //   src: '/images/University Logo.png',
    // },
    // {
    //   key: 8,
    //   src: '/images/UPM Logo.png',
    // },
    // {
    //   key: 9,
    //   src: '/images/MyNIS Logo.jpg',
    // },
  ];

  return (
    <div className="main-container">
      <div
        className="container"
        style={{
          padding: '0 5%',
          marginTop: '30px',
        }}
      >
        <div className="flex py-10 items-center justify-center flex-wrap ">
          {partners.map((val) => {
            return (
              <div key={val.key} className="mx-8">
                <img
                  src={val.src}
                  alt=""
                  className="work w-[105px] h-[100%] px-1 object-contain"
                />
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-center font-[700] text-[32px] mt-5">
            Clinical Education Supporter
          </h3>
          
          <div className="mt-10">
            <Row>
              <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}></Col>
              <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}></Col>
            </Row>
          </div>
        </div>
        
      </div>
      
    </div>
    
  );
}

export default Works;
