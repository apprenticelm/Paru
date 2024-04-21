import React from 'react';
import { useQuery } from 'react-query';
import { HomeImages } from '../../../services/uploadFile';
import { Spin, message } from 'antd';
import ImageGallery from 'react-image-gallery';

function ImageSlider() {
  const { data, isLoading } = useQuery('homeImages', () => HomeImages(), {
    onError: (err) => {
      message.error(err?.response?.data?.message);
    },
  });

  return (
    <div className="main-container pb-[80px]">
      <div className="container">
        <Spin spinning={isLoading}>
          {data && (
            <div>
              <ImageGallery
                style={{ height: '10vh !important' }}
                originalWidth={'300px'}
                originalHeight={'300px'}
                showFullscreenButton={false}
                showPlayButton={false}
                items={data?.data?.images?.map((item) => {
                  return {
                    original: process.env.REACT_APP_BASE_URL + '/' + item?.path,
                    thumbnail:
                      process.env.REACT_APP_BASE_URL + '/' + item?.path,
                  };
                })}
              />
            </div>
          )}
        </Spin>
      </div>
    </div>
  );
}

export default ImageSlider;
