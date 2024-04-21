import React from 'react';
import Banner from '../components/home/Banner/Banner';
import Works from '../components/home/Works/Works';
import Stepsportion from '../components/home/Steps/Stepsportion';
import TopicSlider from '../components/home/TopicSlider/TopicSlider';
import AllCourses from '../components/home/AllCourses/AllCourses';

function Home() {
  return (
    <div>
      <Banner />
      <Works />
      <AllCourses />
      {/* <Stepsportion /> */}
      {/* <UpcomingCourseSlider /> */}
      {/* <Healthcare /> */}
      
      {/* <TopicSlider /> */}
      {/* <Member /> */}
      
    </div>
  );
}

export default Home;
