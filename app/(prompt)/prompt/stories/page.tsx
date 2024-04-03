'use client'
import React from 'react'
import { useState } from 'react'
import Modal from '@/components/ui/modal-slider'
import { Swiper, SwiperSlide } from 'swiper/react';
import CSVDisplay from '@/components/ui/CSVDisplay';


const Story = () => {
  let retrievedData
  if (window !== undefined) {
    retrievedData = JSON.parse(localStorage.getItem('stories') || "null");
    console.log(retrievedData)
  }

  return (
    <div className='bg-gray-900 flex flex-col justify-center items-center'>
      {retrievedData.length > 0 ? retrievedData.map((item: any, index: any) => (
        <div key={index} className='mt-16 p-16 text-white'>
          <h2>Title: {item.title}</h2>
          <p>ID: {item.id}</p>

          {/* Render images */}
          <div className='grid grid-cols-3 grid-rows-2 gap-4'>
            <p>Generated Images</p>
            {item.images.map((image: any, imageIndex: any) => (
              <img key={imageIndex} src={image} alt={`Image ${imageIndex}`} className='w-[500px] h-[500px] m-2' />
            ))}
          </div >

          {/* Render videos */}
          <div className='grid grid-cols-1 items-center justify-center'>
            <p>Generated Video</p>
            {item.video.map((video: any, videoIndex: any) => (
              <video key={videoIndex} controls className='w-[500px] h-[500px] m-4'>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>

          {/* Render audios */}
          <p>Generated Audios Story</p>
          <div className='grid grid-cols-3 grid-rows-2 gap-4'>
            {item.audio.map((audio: any, audioIndex: any) => (
              <audio key={audioIndex} controls className='m-4'>
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            ))}
          </div>

          {/* Render other data similarly */}
          <div>
            {item.doc.map((csvlink:any, index:any)=>(
               <CSVDisplay url={csvlink}/> 
            ))}
          </div>
        </div>
      )) : <p>Not Stories Found create one</p>}

      {/* <div className='rounded-lg p-2 border m-2 text-white max-w-[300px] md:max-w-[700px]'>
            <h1 className='my-2'>The Story of People</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat omnis magnam voluptatem quasi possimus illum! Voluptatum magnam nemo sunt, harum quae eveniet autem id possimus vero enim dicta dolor reiciendis!</p>
            <div className='flex flex-col gap-4 flex-wrap my-2'>
              <button className='rounded-xl p-2 bg-white text-black' onClick={()=> setOpenImages(!openImages)}>Open Images</button>
              {openImages && <Modal>Images</Modal>}
              <button className='rounded-xl p-2 bg-white text-black' onClick={()=> setOpenListenStory(!openListenStory)}>Listen Story</button>
              {openListenStory && <Modal>Listen Story</Modal>}
              <button className='rounded-xl p-2 bg-white text-black' onClick={()=> setOpenVideo(!openVideo)}>Watch Video</button>
              {openVideo && <Modal>Open Video</Modal>}
              <button className='rounded-xl p-2 bg-white text-black' onClick={()=> setOpenResadStory(!openReadStory)}>Read Story</button>
              {openReadStory && <Modal>Read Story</Modal>}
            </div>
          </div> */}
    </div>
  )
}

export default Story