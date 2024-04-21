import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModulesCard({ module }) {
  const navigate = useNavigate();

  return (
    <div
      className="border-[1px] border-solid border-gray p-8 mb-4 rounded-xl cursor-pointer"
      onClick={() => {
        navigate('/event-by-module/' + module);
      }}
    >
      <h2>{module}</h2>
    </div>
  );
}

export default ModulesCard;
