'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const Banners = () => {
  const banners = [
    'https://asiabet.s3.ap-southeast-1.amazonaws.com/images/banners/01JBZVTWETB5AR9H1TFN528G0X.jpeg',
    'https://asiabet.s3.ap-southeast-1.amazonaws.com/images/banners/01JBZVTWETB5AR9H1TFN528G0X.jpeg',
    'https://asiabet.s3.ap-southeast-1.amazonaws.com/images/banners/01JBZVTWETB5AR9H1TFN528G0X.jpeg',
  ];

  return (
    <div className="w-full relative">
      <Carousel opts={{ loop: true }} className='relative w-full'>
        <CarouselContent>
          {banners.map((item, index) => {
            return <CarouselItem key={index}>
              <img src={item} className='bg-contain w-full h-[230px] md:h-[280px]' />
            </CarouselItem>
          })}
        </CarouselContent>
        <div className="absolute z-10 bottom-8 right-14 left-14">
          <CarouselPrevious className='bg-transparent border-2 border-white w-6 h-6 sm:w-10 sm:h-10 ' />
          <CarouselNext className='bg-transparent border-2 border-white w-6 h-6  sm:w-10 sm:h-10' />
        </div>
      </Carousel>
      <div className="mb-4  px-4 sm:w-2/3 absolute top-0 bottom-5 sm:bottom-0 flex flex-col justify-center  left-0 right-0 ">
        <h1 className='mb-4 text-xl sm:text-2xl font-bold'>Win Big at AsiaBet
          The Best Online Game for Asia's Top Players!</h1>
        <p className='text-[15px] sm:text-base mb-3 text-active font-semibold'>Spin to Win! Try the Latest Slot Games <br /> at Asia Bet Casino
        </p>
        <p className='text-[15px] sm:text-base text-active font-semibold'>– Join Today!
        </p>
      </div>

    </div>
  );
};

export default Banners;
