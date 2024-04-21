import React from 'react';
import { useNavigate } from 'react-router-dom';

function AllCourses() {
  const navigate = useNavigate();
  return (
    <div className="main-container pb-[80px]">
      <div className="container">
        <div className="tablet:px-[15px] ">
          <div className="relative">
            <div
              className="view-all-courses-section-background-image"
              style={{ backgroundImage: "url('./images/paru-bg.jpg')" }}
            ></div>
            <div className="view-all-courses-section-content ">
              <h1> Workshop Lists</h1>
              <div className="float-right">
              <b>List of workshop training</b> 
              </div>
            </div>
            <div className="absolute bottom-2 right-2 z-50">
              <button
                className="button-color search-login-button border-none mt-10 text-white h-[65px] bg-[#6693F5] box-shadow rounded-3xl flex items-center gap-2  px-9 py-[35px] cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
                onClick={() => {
                  navigate('/modules');
                }}
              >
                <b>View all workshop</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// rgb(68,95,216)] #165887 <div className="absolute bottom-2 right-2 z-50">
export default AllCourses;
