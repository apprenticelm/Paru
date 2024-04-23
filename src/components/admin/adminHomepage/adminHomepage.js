import React from 'react';
import { Upload, Button, message, Spin, Table } from 'antd';
import { useMutation, useQuery } from 'react-query';

import { useAuth } from '../../../hooks/useAuth';
import {
  HomeImages,
  removeImage,
  uploadHomeImage,
} from '../../../services/uploadFile';
const { Dragger } = Upload;
System.out.print("test");

function AdminHomepage() {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery(
    'homeImages',
    () => HomeImages({ token: user?.token }),
    {
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );
  const { mutate: fileMutate } = useMutation(
    (data) => uploadHomeImage({ data, token: user?.token }),
    {
      onSuccess: (val) => {
        refetch();
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    },
  );

  // remove image by id
  const { mutate: mutateRemoveImage } = useMutation(
    (values) => removeImage({ token: user?.token, id: values.id }),
    {
      onSuccess: (success) => {
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    },
  );

  const otherFileChange = ({ file }) => {
    console.log('freely called');
    const formData = new FormData();
    formData.append('file', file?.originFileObj);
    if (file?.status !== 'uploading') {
      fileMutate(formData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // console.log('data', data);

  const columns = [
    {
      title: 'Uploaded Files',
      dataIndex: 'originalFilename',
      key: 'originalFilename',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => {
            mutateRemoveImage({ id: record.id });
          }}
        >
          Remove
        </Button>
      ),
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <Dragger
        showUploadList={false}
        className="!h-[274px !w-full"
        height={274}
        style={{ width: '100%', height: '274px' }}
        onChange={otherFileChange}
        // beforeUpload={(file) => setCroppedImage && setCroppedImage(file)}
      >
        <div className={'!w-full'}>
          <div className="relative flex justify-center">
            <img
              src="/images/Icon awesome-plus.svg"
              width={100}
              height={85}
              alt="upload"
            />
          </div>
        </div>
      </Dragger>
      <Table
        className="mt-10"
        columns={columns}
        dataSource={data?.data?.images}
        pagination={false}
      />
    </Spin>
  );
}

export default AdminHomepage;
