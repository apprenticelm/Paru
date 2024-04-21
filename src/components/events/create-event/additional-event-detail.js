import { Button, Form, Input, Spin, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { uploadFile } from '../../../services/uploadFile';
import { useMutation } from 'react-query';
import { useAuth } from '../../../hooks/useAuth';
import { addAdditionalEvent } from '../../../services/events';
import { useParams } from 'react-router-dom';
import MultiFileUploader from '../../home/shared/MultiFileUploader/MultiFileUploader';
import MultiLinks from '../../home/shared/MultiLinks/MultiLinks';

const { Dragger } = Upload;
const { TextArea } = Input;

function AdditionalEventDetails({ eventId, setActiveTab }) {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const { id } = useParams();

  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState('');
  const [otherFile, setOtherFile] = useState();

  const [ImageUrl, setImageUrl] = useState();
  const [documentUrl, setDocumentUrl] = useState();

  const [materialImages, setMaterialImages] = useState([]);
  const [materialDocuments, setMaterialDocument] = useState([]);
  const [materialVideos, setMaterialVideos] = useState([]);
  const [links, setLinks] = useState([]);

  const { mutate: fileMutate } = useMutation(
    (data) => uploadFile({ data, token: user?.token }),
    {
      onSuccess: (val) => {
        console.log('success', val?.data?.data?.file);
        if (val?.data?.data?.file?.type?.includes('image')) {
          setImageUrl(val?.data?.data?.file?.path);
        } else {
          setDocumentUrl(val?.data?.data?.file?.path);
        }
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  const { mutate, isLoading } = useMutation(
    (data) => addAdditionalEvent({ data, token: user?.token }),
    {
      onSuccess: () => {
        message.success('successfully added additional details!');
        setActiveTab('Available');
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
        setActiveTab('Available');
      },
    },
  );

  const imageChange = useCallback(({ file }) => {
    if (file?.status !== 'uploading') {
      if (file?.type?.includes('image') && file?.size < 10000000) {
        setFile(file?.originFileObj);
        const formData = new FormData();
        formData.append('file', file?.originFileObj);
        fileMutate(formData);
        let blobURL = URL.createObjectURL(file?.originFileObj);
        setImageSrc(blobURL);
        form.setFieldsValue({
          imageStatus: true,
        });
      } else {
        message.error('Invalid Image');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const otherFileChange = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file?.originFileObj);
    if (file?.status !== 'uploading') {
      fileMutate(formData);

      setOtherFile(file?.originFileObj);
      console.log(file);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Spin spinning={isLoading}>
      <h2>Add an event</h2>
      <Form
        layout="vertical"
        onFinish={(val) => {
          const mutateData = {
            ...val,
            ...{ documentUrl, ImageUrl, eventId: id ? +id : +eventId },
          };
          // convert mutateData to form data
          const formData = new FormData();
          for (const key in mutateData) {
            mutateData[key] && formData.append(key, mutateData[key]);
          }
          materialImages.forEach((image) => {
            formData.append('materialImages', image);
          });
          materialDocuments.forEach((document) => {
            formData.append('materialDocuments', document);
          });
          materialVideos.forEach((video) => {
            formData.append('materialVideos', video);
          });

          links.forEach((link) => {
            formData.append('links', link);
          });

          mutate(formData);
        }}
        form={form}
      >
        <div className="max-w-[600px]">
          <SubHeadings text={'Additional event details'} number={'8'} />
          <Form.Item name="details" label="Event description">
            <TextArea
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          {/* <Form.Item name="learn" label="What will you learn">
            <TextArea
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          <Form.Item name="requirements" label="Requirement(s) if any">
            <TextArea
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          <Form.Item name="advantages" label="Advantages of the course">
            <TextArea
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item> */}
          <SubHeadings text={'Upload File (File type: pdf format)'} number={'9'} />
          <Dragger
            showUploadList={false}
            className="!h-[274px !w-full"
            height={274}
            style={{ width: '100%', height: '274px' }}
            onChange={otherFileChange}
            // beforeUpload={(file) => setCroppedImage && setCroppedImage(file)}
          >
            <div className={imageSrc ? 'h-[274px] w-full' : '!w-full'}>
              {otherFile ? (
                <div>
                  {otherFile?.name}{' '}
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
          <SubHeadings text={'Upload Image Header (Dimension: 564x255)'} number={'10'} />
          <Dragger
            showUploadList={false}
            className="!h-[274px !w-full"
            height={274}
            style={{ width: '100%', height: '274px' }}
            onChange={imageChange}
            // beforeUpload={(file) => setCroppedImage && setCroppedImage(file)}
          >
            <div className={imageSrc ? 'h-[274px] w-full' : '!w-full'}>
              {imageSrc ? (
                <img
                  src={imageSrc}
                  style={{
                    height: '255px',
                    width: '100%',
                    borderRadius: '8px',
                    objectFit: 'contain',
                  }}
                  alt="upload"
                  className="imageCreate"
                />
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
        <SubHeadings text={'Material for Participant'} number={'12'} />
        <span className="mt-2 ml-2 ">
          <h3>A. Upload files</h3>
        </span>
        <MultiFileUploader
          files={materialDocuments}
          setFiles={setMaterialDocument}
          type={'pdf'}
        />
        <span className="mt-2 ml-2 ">
          <h3>B. Upload Images</h3>
        </span>
        <MultiFileUploader
          files={materialImages}
          setFiles={setMaterialImages}
          type={'image'}
        />
        <span className="mt-2 ml-2 ">
          <h3>C. Upload Videos</h3>
        </span>
        <MultiFileUploader
          files={materialVideos}
          setFiles={setMaterialVideos}
          type={'video'}
        />
        <div className="max-w-[500px]">
          <span className="mt-2 ml-2 ">
            <h3>D. Embedded link</h3>
          </span>
          <MultiLinks links={links} setLinks={setLinks} />
        </div>
        <div className="flex gap-4 my-4 float-right">
          <Button htmlType="submit">Create additional details</Button>
        </div>
      </Form>
    </Spin>
  );
}

export default AdditionalEventDetails;

function SubHeadings({ text, number }) {
  return (
    <div className="flex items-center mt-5">
      <div className="border-[1px] border-solid border-black rounded-full h-[22px] w-[22px] flex justify-center items-center text-[14px] ">
        <div className="mt-[0px]">{number}</div>
      </div>
      <span className="mt-2 ml-2 ">
        <h3>{text}</h3>
      </span>
    </div>
  );
}
