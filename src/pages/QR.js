import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { proceedWithPayment } from '../services/events';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Image, Spin, Upload, message } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { uploadFile } from '../services/uploadFile';

function QR() {
  const { user } = useAuth();

  const [documentUrl, setDocumentUrl] = useState();

  const { Dragger } = Upload;
  const [otherFile, setOtherFile] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fullName = searchParams.get('fullName');
  const email = searchParams.get('email');
  const eventId = searchParams.get('eventId');
  const registrationFor = searchParams.get('registrationFor');

  const { mutate, isLoading } = useMutation(
    (data) => proceedWithPayment({ data, token: user?.token }),
    {
      onSuccess: (val) => {
        console.log(val?.freeRegistration?.EventPayment?.paymentIntentId);
        message.success('Event registration successful!');
        navigate('/event-detail/' + eventId);
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    }
  );
  const { mutate: fileMutate } = useMutation(
    (data) => uploadFile({ data, token: user?.token }),
    {
      onSuccess: (val) => {
        console.log('success', val?.data?.data?.file);
        setDocumentUrl(val?.data?.data?.file?.path);
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    }
  );
  if (
    !fullName ||
    !email ||
    !eventId ||
    !registrationFor ||
    fullName === 'undefined' ||
    email === 'undefined' ||
    eventId === 'undefined' ||
    registrationFor === 'undefined'
  ) {
    return <Navigate to="/" />;
  }

  const otherFileChange = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file?.originFileObj);
    if (file?.status !== 'uploading') {
      console.log('file?.type', file?.type);
      if (
        !(file?.type === 'application/pdf' || file?.type?.includes('image'))
      ) {
        return message.error('Invalid file type!');
      }
      console.log('file==========>>>', file);
      fileMutate(formData);
      setOtherFile(file?.originFileObj);
      console.log(file);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <div className="main-container mt-10">
      <div className="container">
        <div className="px-[45px]">
          <Spin spinning={isLoading}>
            <div
              style={{
                height: 'auto',
                margin: '0 auto',
                maxWidth: 150,
                width: '100%',
              }}
            >
              <Image src="/images/payment-qr.jpg" width={300} />
              {/* <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={'musa'}
                viewBox={`0 0 256 256`}
              /> */}
            </div>
            <div className="mt-20">
              <h1>Upload receipt (pdf and image format is acceptable)</h1>
              <Dragger
                showUploadList={false}
                className="!h-[274px !w-full"
                height={274}
                style={{ width: '100%', height: '274px' }}
                onChange={otherFileChange}
                // beforeUpload={(file) => setCroppedImage && setCroppedImage(file)}
              >
                <div className={'!w-full'}>
                  {otherFile ? (
                    <div>
                      {otherFile?.name}
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </div>
                  ) : (
                    <div className="relative flex justify-center">
                      <img
                        src="/images/Icon awesome-plus.svg"
                        width={100}
                        height={85}
                        alt="upload"
                      />
                    </div>
                  )}
                </div>
              </Dragger>
            </div>

            <div className="w-100 flex justify-center">
              <button
                className="button-color search-login-button border-none mt-10 text-white h-[20px] bg-[#165887] rounded-3xl flex items-center  px-9 py-[20px] cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
                onClick={() => {
                  const mutateData = {
                    fullName,
                    email,
                    eventId,
                    registrationFor,
                    documentUrl,
                  };

                  console.log('mutateData: ', mutateData);

                  // // convert mutateData to form data
                  // const formData = new FormData();
                  // for (const key in mutateData) {
                  //   mutateData[key] && formData.append(key, mutateData[key]);
                  // }

                  // materialDocuments.forEach((document) => {
                  //   formData.append('materialDocuments', document);
                  // });
                  if (!documentUrl) {
                    return message.error('Please upload receipt first!');
                  }
                  mutate(mutateData);
                }}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            <br />
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default QR;
