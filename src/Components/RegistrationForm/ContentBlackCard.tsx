import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ContentBlackCardProps {
  link:string;
  heading: string;
  desc: string;
}

const ContentBlackCard: React.FC<ContentBlackCardProps> = ({ link,heading, desc }) => {
  return (
    <div className="bg-gradient-to-tr from-[#22272E] to-[#202332] text-white pt-12 pb-6 max-md:py-10 ">
    <div className="container w-[60%] max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-[100%] max-md:w-full">
      <Link to={link}>
    <FaArrowLeft className="text-base mb-8" />
      </Link>
      <h1 className="font-bold text-2xl mb-2 max-md:text-xl">{heading}</h1>
      <p className="w-[55%] max-md:w-full">{desc}</p>
    </div>
  </div>
  );
};

export default ContentBlackCard;
