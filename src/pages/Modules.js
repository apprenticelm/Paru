import React from 'react';
import ModulesCard from '../components/modules/modulesCard';
import { useQuery } from 'react-query';
import { getAllModules } from '../services/events';
import { Spin } from 'antd';

function Modules() {
  const { data, isLoading } = useQuery('modules', () => {
    return getAllModules();
  });

  const moduleData = data?.data?.allModules;

  return (
    <div className="main-container mt-10">
      <div className="container">
        <div className="px-[45px]">
          <Spin spinning={isLoading}>
            <h1>Modules</h1>
            {moduleData?.map((module) => {
              return (
                <div key={module?.id}>
                  <ModulesCard module={module?.modules} />
                </div>
              );
            })}
          </Spin>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Modules;
