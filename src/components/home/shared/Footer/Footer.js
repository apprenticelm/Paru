import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="main-container bg-black">
      <div className="container">
        <div className="py-20  px-[45]">
          <Row className="w-full flex    ">
            <Col
              xxl={6}
              xl={6}
              lg={6}
              md={6}
              sm={8}
              xs={24}
              className="flex   pl-[5%] pb-[20px]  tablet:flex   tablet:w-full tablet:mt-4"
            >
              <div className="w-[144px] h-[22px]">
                <Link to="/">
                  <img
                    className="w-[100px] object-contain"
                    src="/images/footer-logo.png"
                    alt="NisLogo"
                  />
                </Link>
              </div>
            </Col>

            {/* <Col
              xxl={9}
              xl={9}
              lg={9}
              md={9}
              sm={9}
              xs={12}
              className="  tablet:flex  pl-[5%]   tablet:w-full tablet:mt-4"
            >
              <div className="flex flex-col  ">
                <p className="text-[16px] text-white">
                  In the contact box below, have link buttons for :
                </p>
                <div className="flex justify-between max-w-[300px]">
                  <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
                    Contact Us
                  </p>
                  <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
                    About Us
                  </p>
                </div>
                <div className="flex justify-between max-w-[300px]">
                  <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
                    Terms and Conditions
                  </p>
                  <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
                    Course Feedback
                  </p>
                </div>
              </div>
            </Col> */}
            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className="  pl-[5%] tablet:flex  tablet:w-full tablet:mt-4"
            >
              <div className="flex flex-col  ">
                <ul className="p-0 footer-padding-info">
                  <li>
                    <div className="flex text-white flex-wrap">
                      <MailOutlined
                        style={{ color: 'white', fontSize: '24px' }}
                      />
                      <div>&nbsp;&nbsp;anis@longemed.com</div>&nbsp;|&nbsp;
                      <div>elyia@longemed.com</div>
                    </div>
                  </li>
                  <br />
                  <li>
                    <div className="flex text-white flex-wrap">
                      <PhoneOutlined
                        color="white"
                        style={{ color: 'white', fontSize: '24px' }}
                      />
                      <div>&nbsp;&nbsp;+60389592593 (Anis/Elyia)</div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    // <div className="main-container bg-black">
    //   <div className="container">
    //     <div className="py-20  px-[45]">
    //       <Row className="w-full flex    ">
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={24}
    //           className="flex   pl-[5%] pb-[20px]  tablet:flex   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="w-[144px] h-[22px]">
    //             <Link to="/">
    //               <img
    //                 className="w-[200px]"
    //                 src="images/NisLogo.jpg"
    //                 alt="NisLogo"
    //               />
    //             </Link>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex  pl-[5%]   tablet:w-full tablet:mt-4 "
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[16px] text-white">Company</p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Magzines
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Jobs
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Investors and Board members
    //             </p>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex  pl-[5%]   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[16px] text-white">Cources</p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Masterclasses
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Mentorings
    //             </p>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex  pl-[5%]   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[16px] text-white">Need help?</p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Terms & conditions
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Privacy policy
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Cookie policy
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Legal notice
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Contact us
    //             </p>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex  pl-[5%]   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[16px] text-white">Social</p>
    //             <div className="flex gap-2">
    //               <p className="text-[20px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //                 <AiOutlineTwitter />
    //               </p>
    //               <p className="text-[20px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //                 <AiOutlineInstagram />
    //               </p>
    //               <p className="text-[20px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //                 <FaLinkedinIn />
    //               </p>
    //             </div>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex  pl-[5%]   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[16px] text-white">For Industries</p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               For offer
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Our products
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Our academy
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               List of institutions
    //             </p>
    //           </div>
    //         </Col>
    //       </Row>

    //       <Row className="mt-20 flex    pl-[5%]">
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[16px] text-white">Specialties</p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               All specialties
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Cardiology
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Plastic Surgery
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Digestive Surgery
    //             </p>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Otolaryngology
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Orthopaedic Surgery
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Obstetrics & gynaecology
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Oncology
    //             </p>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Urology
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Dental Surgery
    //             </p>
    //             <p className="text-[12px] text-[rgb(205,205,207)] hover:text-white duration-300 cursor-pointer">
    //               Vascular Surgery
    //             </p>
    //           </div>
    //         </Col>
    //         <Col
    //           xxl={4}
    //           xl={4}
    //           lg={4}
    //           md={6}
    //           sm={8}
    //           xs={12}
    //           className="  tablet:flex   tablet:w-full tablet:mt-4"
    //         >
    //           <div className="flex flex-col  ">
    //             <p className="text-white">
    //               Distribute Your health training content
    //             </p>
    //             <button className="border-none   text-[rgb(28,62,217)] bg-[rgb(238,241,253)] flex items-center  gap-2 h-[40px] px-[14px] py-[8px] rounded cursor-pointer hover:bg-[rgb(218,224,247)] duration-300">
    //               <GoLinkExternal className="text-[19px] " />{' '}
    //               <span className="tracking-wide ">Invivox For Business </span>
    //             </button>
    //           </div>
    //         </Col>
    //         <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}></Col>
    //       </Row>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;
