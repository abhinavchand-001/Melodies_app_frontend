import React from "react";
import Videolofi from "../assets/lofigirl.mp4";
const Videobody = () => {
  return (
    <div
      id="videocontainer"
      className="text-5xl text-white m-10 mt-5 h-[40rem] w-[95%] rounded-[20px] "
    >
      <video
        id="iamvideo"
        src={Videolofi}
        autoPlay
        loop
        muted
        className="h-full w-[80vw] object-cover rounded-[20px]"
      >
        {" "}
      </video>

      

      <div
        id="contentinsidevideo"
        className="h-[40vh] w-[22vw]"
      >
        <p className=" text-shadow-white mb-5 text-[2vw]">
          All of{" "}
          <span className="text-[#ee10b0] text-[3vw] font-bold">
            Best Songs
          </span>{" "}
        </p>

        <p className="in_one_place mb-6 text-[3vw]">In One Place</p>
        <p className="maintext text-white  text-justify text-[1vw]">
          On our website, you can access an amazing collection of popular and
          new songs. Stream your favorite tracks in high quality and enjoy
          without interruptions. Whatever your taste in music, we have it all
          for you!
        </p>
      </div>
    </div>
  );
};

export default Videobody;
