import { Image } from 'antd';
import React from 'react';

function Member() {
  const images = [
    {
      id: 4,
      src: '/images/healthCare.png',
    },
    {
      id: 1,
      src: '/images/bpi-France.png',
    },
    {
      id: 3,
      src: '/images/eit-Health.png',
    },
    {
      id: 3,
      src: '/images/euoropean-Health.png',
    },
  ];

  return (
    <div className="main-container bg-[rgb(232,233,237)]">
      <div className="container">
        <div className="py-[35px] px-[45px] tablet:px-[15px]">
          <div>
            <p className="text-[20px] text-center font-bold">Member of</p>
            <div className="flex flex-wrap items-center justify-center gap-14 py-[20px]">
              {images.map((val) => {
                return (
                  <Image
                    className="!w-[110px] "
                    preview={false}
                    key={val.id}
                    src={val.src}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;
