import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllEventWithModules } from '../services/events';
import { Spin } from 'antd';
import ModulesCard from '../components/modules/modulesCard';
import Events from '../components/events/Events';

function EventsWithModule() {
  const navigate = useNavigate();
  const params = useParams();

  const moduleName = params?.moduleName;

  const { data, isLoading } = useQuery('events-by-module', () => {
    return getAllEventWithModules({ moduleName });
  });

  return (
    <Spin spinning={isLoading}>
      <div className="main-container pb-[80px]">
        <div
          className="container"
          style={{
            padding: '0 5%',
            marginTop: '30px',
          }}
        >
          <h1>Module</h1>
          <br />
          <div
            onClick={() => {
              navigate('/modules');
            }}
          >
            <ModulesCard module={moduleName} />
          </div>
          <br />
          <br />
          <h1>Courses available right now</h1>
          <Events events={data?.data?.events} />
        </div>
      </div>
    </Spin>
  );
}

export default EventsWithModule;
