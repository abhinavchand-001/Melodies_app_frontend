import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Routes, Route} from "react-router-dom";

const Topsongs = ({image, name , desc , id}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/albums/${id}`);
  };


  return (
    <div onClick={handleClick} className="iamsong iamlink flex flex-col h-60 w-50 gap-1 p-3 mb-8 hover:bg-[#272727] items-center justify-center cursor-pointer">
      <div className="h-47 w-38 "> <img src={image} alt="" /></div>
      <p className="text-white font-bold">{name}</p>
      <p className="text-[#d1c5ee] text-center text-[15px]">{desc}</p>

      <div className="platbutton-in-iamsong w-[50px] h-[50px] flex items-center justify-center bg-[#4e8af8] rounded-full">
        {" "}
        <FaPlay className="text-[#1b2f3a] flex items-center justify-center text-2xl" />
      </div>
    </div>
  );
};

export default Topsongs;
