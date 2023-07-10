import React from 'react'
import CourseCard from './CourseCard'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const CourseSlider = ({courses,type}) => {
    
    if(type === 1){
        courses.sort((a,b) => b.studentsEnrolled.length - a.studentsEnrolled.length);
        courses = courses.slice(0,6);

    }else if(type === 2){
        courses.sort((a,b) =>  a.createdAt.localeCompare(b.createdAt) );
    }else if(type === 3){
        courses.sort((a,b) => b.studentsEnrolled.length - a.studentsEnrolled.length);
        courses = courses.slice(0,3);
    }

    console.log(courses);

  return (
    <div className=''>
         {courses?.length ? (
            <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
            1024: {
              slidesPerView: 3,
              // speed : 5000
            },
          }}
        // navigation={true}
        // autoplay={{
        //   delay: 200,
        //   waitForTransition: true,
        //   disableOnInteraction: true,
        // }}
        // speed={2500}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
       {courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
      </Swiper>
      ) : (
        <p className="text-2xl text-richblack-5 text-center">No Course Found</p>
      )}
    </div>
  )
}

export default CourseSlider
