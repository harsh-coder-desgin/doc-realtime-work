import React from 'react'
import { useEffect, useRef } from "react";

function Home() {
  const itemsRef = useRef([]);

  const feature = [{ id: 1, image: '/featureimg1.png', des: "This is was heplful user can work with muti-user to get more feature can save doc and see doc to all", name: "Muti-user" },
  { id: 2, image: '/featureimg2.png', des: "This is was heplful user can work with muti-user to get more feature can save doc and see doc to all", name: "name" },
  { id: 3, image: '/featureimg3.png', des: "This is was heplful user can work with muti-user to get more feature can save doc and see doc to all", name: "name" }]

  const how_it_works = [{ id: 1, step: "Step 1: Create Doc", des: "First craete new docunent then add other user then do work same doc and save data" },
  { id: 2, step: "Step 2: Add user", des: "First craete new docunent then add other user then do work same doc and save data" },
  { id: 3, step: "Step 3: Work with", des: "First craete new docunent then add other user then do work same doc and save data" },
  { id: 4, step: "Step 4: Work with all", des: "First craete new docunent then add other user then do work same doc and save data" }]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  
  return (
    <div>
      <div className='text-center mt-20 w-180 ml-100'>
        <h1 className='text-7xl mb-7 head-up'><a className='font-italic' style={{ fontStyle: 'italic', fontWeight: "lighter" }}>Real Time</a>
          <a className='bg-black text-white px-1 ml-2'>Collalartion</a></h1>
        <h1 className='text-6xl mt-5'>doc powered <a className='underline'>by Tinymce</a></h1>
      </div>
      <h1 className='text-center text-2xl mt-20 ml-172 text-green-100 bg-green-900 px-2 py-2 w-40 rounded-lg'>Live Demo</h1>
      <div className='h-180 bg-gray-200 mt-10 w-300 ml-40'>
        {/* here demo of doc */}
      </div>
      <h1 className='text-center text-4xl mt-20'>Our Feature</h1>
      <div className='flex space-x-5 ml-72 mt-15 w-240 mb-20'>
        {feature.map((item,index) => (
          <div key={item.id} className="p-10 rounded-md border border-blue-900 fade-up transition-all duration-300
            hover:scale-105 hover:shadow-xl shadow-blue-100" ref={(el) => (itemsRef.current[index] = el)}>
            <img src={item.image} className={`${item.image === '/featureimg1.png' && 'w-17 h-17'} ${item.image === '/featureimg2.png' && 'w-19 h-17'}
             ${item.image === '/featureimg3.png' && 'w-14 h-17 ml-1'}`} />
            <h1 className='text-lg mt-4 ml-2'>{item.name}</h1>
            <p className='font-light ml-2'>{item.des}</p>
          </div>
        ))}
      </div>
      <h1 className='text-center text-3xl mt-20 ml-12'>How it Works</h1>
      <div className='grid grid-cols-2 gap-4 space-x-5 ml-72 mt-15 mb-20 w-250'>
        {how_it_works.map((item,index) => (
          <div key={item.id} className='bg-blue-100 w-120 p-5 hover:bg-blue-200 fade-up transition-all duration-300
           hover:scale-103 hover:shadow-xl shadow-blue-100' ref={(el) => (itemsRef.current[index+5] = el)}>
            <h1 className='text-lg ml-2'>{item.step}</h1>
            <p className='font-light ml-2'> {item.des}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
