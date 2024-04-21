import React from 'react';
import { Button, Spin, Table, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { v4 as uuid } from 'uuid';
import { useMutation } from 'react-query';
import { removeFileById } from '../../../../services/uploadFile';
import { useAuth } from '../../../../hooks/useAuth';

function MultiFileUploader({ files, setFiles, type, edit = false, refetch }) {
  const otherFileChange = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file?.originFileObj);
    if (file?.status !== 'uploading') {
      console.log('file?.type', file?.type, typeof type === 'object');
      if (
        typeof type === 'object'
          ? type.find((t) => file?.type?.includes(t))
          : file?.type?.includes(type)
      ) {
        // check is file alreaded uploaded
        const isFileUploaded = files.find(
          (f) => f.name === file?.originFileObj?.name,
        );
        if (isFileUploaded) {
          message.error(`File ${file?.originFileObj?.name} already uploaded!`);
          return;
        } else {
          setFiles([...files, file?.originFileObj]);
        }
      } else {
        message.error(`Invalid file!`);
      }
    }
  };

  const { user } = useAuth();

  // remove image by id
  const { mutate: mutateRemoveImage, isLoading } = useMutation(
    (values) => removeFileById({ token: user?.token, id: values.id }),
    {
      onSuccess: (success) => {
        refetch();
      },
      onError: (error) => {
        console.log('error', error);
        message.error(error?.response?.data?.message);
      },
    },
  );

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
            // if edit mode then remove from api
            if (record.id) {
              mutateRemoveImage({ id: record.id });
            } else {
              // remove from files
              setFiles(
                files.filter((file) => file.name !== record.originalFilename),
              );
            }

            console.log(record);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];
  return (
    <>
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
      {files?.length > 0 && (
        <Spin spinning={isLoading}>
          <Table
            className="mt-10"
            columns={columns}
            dataSource={files?.map((file) => ({
              id: file?.id,
              key: uuid(),
              originalFilename: file?.name,
              size: file?.size,
            }))}
            pagination={false}
          />
        </Spin>
      )}
    </>
  );
}

export default MultiFileUploader;
