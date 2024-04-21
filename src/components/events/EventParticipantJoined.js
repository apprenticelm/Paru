import { Table } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getRegisteredEventDetails } from '../../services/events';
import { useAuth } from '../../hooks/useAuth';

function EventParticipantJoined() {
  const params = useParams();
  const { user } = useAuth();

  const id = params?.id;

  const { data, isLoading } = useQuery(
    ['registered-event-details', id],
    () => {
      return getRegisteredEventDetails({ id, token: user?.token });
    },
    {
      enabled: !!user?.token && !!id,
      retry: 0,
    }
  );

  const columns = [
    {
      title: 'No',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Receipt uploaded',
      dataIndex: 'receipt',
      key: 'receipt',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <>
          {record?.documentUrl && (
            <div style={{ display: 'flex' }}>
              {console.log('record', record)}
              {/* open record.documentUrl in new tab */}
              <a
                href={
                  process.env.REACT_APP_BASE_URL + '/' + record?.documentUrl
                }
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
              {/* add download button for file */}
              <DownloadButton
                fileUrl={
                  process.env.REACT_APP_BASE_URL + '/' + record?.documentUrl
                }
              />
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Participant joined</h1>
      <Table
        loading={isLoading}
        dataSource={data?.data?.registrationDetails}
        columns={columns}
      />
    </div>
  );
}

export default EventParticipantJoined;

function DownloadButton({ fileUrl }) {
  const handleDownload = async () => {
    const response = await fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'filename.pdf'); // Choose the file name.
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div style={{ marginLeft: '30px' }}>
      <b onClick={handleDownload} style={{ cursor: 'pointer' }}>
        Download File
      </b>
    </div>
  );
}
