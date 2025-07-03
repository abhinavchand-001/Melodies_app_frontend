import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { Playercontext } from "../context/Playercontext";

const Newreleasesongs = ({image, name , desc , id}) => {

const {playwithid} = useContext(Playercontext)

const handelclick = () => {
  playwithid(id)
}
  return (
     <div onClick={handelclick} className="iamsong iamlink flex flex-col h-60 w-50 gap-1 p-3 mb-8 hover:bg-[#272727] items-center cursor-pointer">
          <div className="h-47 w-38 object-cover "> <img src={image} alt="" /></div>
          <p className="text-white font-bold">{name}</p>
          <p className="text-[#d1c5ee] text-center text-[15px]">{desc}</p>
    
          <div className="platbutton-in-iamsong w-[50px] h-[50px] flex items-center justify-center bg-[#4e8af8] rounded-full">
            {" "}
            <FaPlay className="text-[#1b2f3a] flex items-center justify-center text-2xl" />
          </div>
        </div>
  );
};
 
export default Newreleasesongs;
