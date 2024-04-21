/* eslint-disable jsx-a11y/anchor-is-valid */
import { StarFilled } from "@ant-design/icons";
import { Button, Card, Tag } from "antd";
import React, { useRef } from "react";

import { RightSquareTwoTone, LeftSquareTwoTone } from "@ant-design/icons";

function UpcomingCards() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 600;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 600;
    }
  };
  return (
    <div className="pb-5 ">
      <div className="flex items-center justify-center ">
        <div>
          <LeftSquareTwoTone
            onClick={scrollLeft}
            className="text-[40px] text-white  "
          />
        </div>
        <div
          className="flex items-center overflow-x-scroll whitespace-nowrap hide-scrollbar overflow-y-hidden scroll-smooth "
          ref={scrollContainerRef}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
            return (
              <Card
                hoverable
                style={{
                  width: "320px",
                  height: "272px",
                  marginTop: "30px",
                  marginBottom: "5px",
                  borderRadius: "6px",
                  position: "relative",
                  marginLeft: "20px",
                }}
              >
                <div className="w-full">
                  <a
                    href="#"
                    className="text-[#1c3ed9] text-center ml-[80px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold w-[100% - 80px] "
                  >
                    Aesculap Académie - B. Braun
                  </a>
                  <h3 className="mt-[5px] font-bold text-[18px] text-ellipsis overflow-hidden">
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
                  <Button type="primary" className="w-full h-[40px]">
                    See more
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        <div>
          <RightSquareTwoTone
            onClick={scrollRight}
            className="text-[40px] border-none "
          />
        </div>
      </div>

      {/* <div className="py-[60px] flex justify-center items-center">
        <Button
          type="primary"
          className="h-[50px] min-w-[50px] px-[30px] font-semibold"
        >
          Check all medical cources
        </Button>
      </div> */}
    </div>
  );
}

export default UpcomingCards;
