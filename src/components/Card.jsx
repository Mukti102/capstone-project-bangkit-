import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import cardImg from "../assets/card.jpeg";
import { HiCheck, HiClock } from "react-icons/hi";
import { Badge, Rating } from "flowbite-react";

export default function Card() {
  return (
    <a href="/detail" className="w-[362px] group  h-[379px] relative">
      <div className="w-[362px] h-[379px] px-[13px] py-[15px] left-0 top-0 absolute bg-white group-hover:bg-gray-50 rounded-[22px] shadow flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="w-full  h-[209px] rounded-3xl overflow-hidden">
          <img className="w-full h-full object-cover" src={cardImg} />
        </div>
        {/* rate */}
        <div className="w-full px-2 flex gap-1 relative ">
          <span className="font-bold">3.0</span>
          <Rating>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
          </Rating>
        </div>
        {/* title */}
        <div className="px-2 font-semibold text-lg">
          <h1>Lorem ipsum dolor sit amet,</h1>
        </div>
        {/* location */}
        <div className="flex items-center gap-1 px-2">
          <span>
            <IoLocationOutline />
          </span>
          <span className="text-xs text-gray-600">Kahayangan,Bali</span>
        </div>
        {/* line */}
        <div className="w-[90%] mx-auto h-[1px] my-2  border border-black/10"></div>
        {/* buttons */}
        <div className="flex w-full justify-between px-3">
          <Badge
            color="failure"
            icon={IoTimeOutline}
            className="text-[10px] font-normal px-3"
          >
            3 days ago
          </Badge>
          <button className="flex items-center gap-2">
            <span className="text-xs">Details</span>
            <span>
              <FaArrowRightLong />
            </span>
          </button>
        </div>
      </div>
    </a>
  );
}
