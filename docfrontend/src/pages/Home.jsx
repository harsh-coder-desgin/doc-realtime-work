import React from 'react'
import { useEffect, useRef } from "react";

function Home() {
  const itemsRef = useRef([]);

  const feature = [{ id: 1, image: '/featureimg1.png', des: "Edit documents together in real time. Every change is instantly synced across all connected users without refreshing", name: "Muti-user" },
  { id: 2, image: '/featureimg2.png', des: "Work with multiple users at the same time. See who is online and collaborating on the document live.", name: "Multi-User Collaboration" },
  { id: 3, image: '/featureimg3.png', des: "Each user’s cursor position is preserved during updates, ensuring smooth typing without cursor jumps or content conflicts", name: "Cursor Sync" }]

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
      <div className="text-center mt-20 w-180 ml-100">
        <h1 className="text-7xl mb-7 head-up">
          <a style={{ fontStyle: "italic", fontWeight: "lighter" }}>Real Time</a>
          <a className="bg-black text-white px-1 ml-2">collaborative</a>
        </h1>
        <h1 className="text-6xl mt-5 head-up delay-2 w-190">
          document editing <a>powered</a>
        </h1>
        <h1 className="text-5xl mt-5 underline ml-2 head-up delay-3">by TinyMce</h1>
      </div>
      <h1 className='text-center text-2xl mt-20 ml-172 text-green-100 bg-green-900 px-2 py-2 w-40 rounded-lg button-up'>Live Demo</h1>
      <div className='h-180 bg-gray-200 mt-10 w-300 ml-40 doc-up'>
        {/* here demo of doc */}
      </div>
      <h1 className='text-center text-4xl mt-20'>Our Feature</h1>
      <div className='flex space-x-5 ml-72 mt-15 w-240 mb-20'>
        {feature.map((item, index) => (
          <div key={item.id} className="w-100 p-10 rounded-md border border-blue-900 fade-up transition-all duration-300
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
        {how_it_works.map((item, index) => (
          <div key={item.id} className='bg-blue-100 w-120 p-5 hover:bg-blue-200 fade-up transition-all duration-300
           hover:scale-103 hover:shadow-xl shadow-blue-100' ref={(el) => (itemsRef.current[index + 5] = el)}>
            <h1 className='text-lg ml-2'>{item.step}</h1>
            <p className='font-light ml-2'> {item.des}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
