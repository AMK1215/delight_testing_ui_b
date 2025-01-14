"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "@/services/bannerService";

const Banners = () => {
  const { data } = useQuery({
    queryKey: ["GET_BANNERS"],
    queryFn: fetchBanners,
  });

  return (
    <div className="w-full relative">
      <Carousel opts={{ loop: true }} className="relative w-full">
        <CarouselContent>
          {data?.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <img
                  src={item.img_url}
                  className="bg-contain w-full h-[140px] md:h-[390px]"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute z-10 bottom-8 right-14 left-14">
          <CarouselPrevious className="bg-transparent border-2 border-white w-6 h-6 sm:w-10 sm:h-10 z-10" />
          <CarouselNext className="bg-transparent border-2 border-white w-6 h-6  sm:w-10 sm:h-10" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banners;
