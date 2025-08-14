import React, { useContext, useState } from "react";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineSkipNext } from "react-icons/md";
import { CiPause1 } from "react-icons/ci";
import { Playercontext } from "../context/Playercontext";
import { CiVolumeHigh } from "react-icons/ci";
import { CiVolumeMute } from "react-icons/ci";
import { MdOutlineArrowBackIos } from "react-icons/md";




const playpause = () => {

  const hovered = () => {
    // Only execute if screen width is 400px or less
    if (window.innerWidth <= 400) {
      const on_hovering_track_items = document.querySelector('.iamplaypause');
      if (on_hovering_track_items) {
        on_hovering_track_items.style.top = '0px';
      }
      const on_hovering_track_items2 = document.querySelector('.iamtop_playpause');
      if (on_hovering_track_items2) {
        on_hovering_track_items2.style.display = 'none';
      }
    }
  }


  const Unhovered = () => {
    // Only execute if screen width is 400px or less
    if (window.innerWidth <= 400) {
      const on_hovering_track_items = document.querySelector('.iamplaypause');
      if (on_hovering_track_items) {
        on_hovering_track_items.style.top = '89%';
      }
      const on_hovering_track_items2 = document.querySelector('.iamtop_playpause');
      if (on_hovering_track_items2) {
        on_hovering_track_items2.style.display = 'flex';
      }
    }
  }


  const {
    audioRef,
    track,
    seekbg, 
    seekbar,
    playing,
    play,
    pause,
    duration,
    previous,
    next,
    seekbarsong,
    volume,
    setVolume,
    getPerceivedVolume,
    getSliderValue,
    toggleMute,
  } = useContext(Playercontext);

  return track ? (
    <div className="iamplaypause hidden h-[100vh] w-full bg-[#000000] flex-col text-white items-start justify-between font-bold ">

      <div className="iamtop_playpause flex items-center justify-between w-full pt-3 p-10">

    
      
      {/* song details */}
      <div onClick={hovered} className="track-items flex gap-5 font-bold ">
        <img className="track_image w-12 object-cover" src={track.image} alt="" />
        <div className="name_and_desc flex flex-col gap-2">
          <p className="track_name font-bold">{track.name}</p>
          <p className="track_desc text-xs text-[#d1c5ee]">{track.desc.slice(0, 32)}</p>
        </div>
      </div>

      {/* play pause buttons  */}

      <div className="flex flex-col items-center justify-center ">
        <div className="button_contain flex justify-center items-center gap-7 font-bold text-4xl">

          <button onClick={previous}>
            <MdOutlineSkipPrevious className="iamlink playpauseicon  text-[#ee10b0] cursor-pointer" />
          </button>

          {playing ? (     
            
            <button onClick={pause}>
              <CiPause1 className="iamlink playpauseicon" />
            </button>
          ) : (
            <button onClick={play}>
              <IoPlayOutline className=" iamlink playpauseicon" />
            </button>
          )}


          <button onClick={next}>
            <MdOutlineSkipNext className="iamlink playpauseicon text-[#ee10b0] " />
          </button>

        </div>

        <div className="iamseekbar flex gap-5">
          <p>
            {duration.currentduration.minutes}:
            {duration.currentduration.seconds}
          </p>

          <div
            onClick={seekbarsong}
            className="iamlink hambar h-[5px] w-[40vw] mt-[10px] bg-[#fff]"
          >
            <div
              ref={seekbar}
              className="insidethehambar h-[5px] w-[0px] bg-[#ee10b0]"
            ></div>
            <div
              ref={seekbg}
              className="circle h-[18px] w-[10px] bg-[#1070ee]"
            ></div>
          </div>

          <p>
            {duration.totalduration.minutes}:{duration.totalduration.seconds}
          </p>
        </div>
      </div>

  

      <div className="iam_volume_container flex gap-3 items-center justify-center">
        <button onClick={toggleMute} className="iamlink text-2xl font-bold">
          {volume === 0 ? <CiVolumeMute /> : <CiVolumeHigh />}
        </button>
        <div className="relative w-[10vw]">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#666] rounded-full"></div>
          <input
            type="range"
            min={0}
            max={100}
            value={getSliderValue(volume) * 100}
            onChange={(e) => {
              const sliderValue = e.target.value / 100;
              const newVolume = getPerceivedVolume(sliderValue);
              setVolume(newVolume);
              audioRef.current.volume = newVolume;
            }}
            className="absolute top-0 left-0 w-full h-[6px] opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-0 left-0 h-[6px] rounded-full bg-[#ee10b0] transition-width duration-300"
            style={{ width: `${getSliderValue(volume) * 100}%` }}
          ></div>
          {/* Add volume indicator circle */}
          <div
            className="absolute top-[-5.5px] w-[16px] h-[16px] bg-[#6510ee] rounded-full shadow-lg transition-width duration-300"
            style={{ left: `${getSliderValue(volume) * 100}%` }}
          ></div>
        </div>
      </div>

      </div>


      {/* // only for mobile */}


      <div onClick={Unhovered} className="for_mobile_track_image gap-2 flex justify-start items-center flex-col mb-10 mt-7">

        <div className="w-full">
          <button onClick={Unhovered}>
            <MdOutlineArrowBackIos className="text-2xl" />
          </button>
        </div>

      <img className="track_mobile_image w-[80vw] h-[47vh] object-cover" src={track.image} alt="" />
      <div className="gap-2 flex justify-start items-center flex-col">
      <p className="track_mobile_name font-bold text-[20px]">{track.name}</p>
      <p className="track_mobile_desc text-[12px] text-[#d1c5ee]">{track.desc.slice(0, 32)}</p>
      </div>
      

      </div>
      
      {/* mobile_seekbar  */}


      <div className="for_mobile_seekbar gap-5 not-only-of-type:flex flex-col items-center justify-center ">
        <div className="button_contain flex justify-center items-center gap-7 font-bold text-4xl">

          <button onClick={previous}>
            <MdOutlineSkipPrevious className="iamlink playpauseicon2 text-[#ee10b0] cursor-pointer" />
          </button>

          <div className="w-[40vw] h-[8vh] flex justify-center items-center bg-[#6510ee] rounded-2xl">
          {playing ? (     
            
            <button onClick={pause}>
              <CiPause1 className="iamlink playpauseicon2" />
            </button>
          ) : (
            <button onClick={play}>
              <IoPlayOutline className=" iamlink playpauseicon2" />
            </button>
          )}
          </div>



         


          <button onClick={next}>
            <MdOutlineSkipNext className="iamlink playpauseicon2 text-[#ee10b0] " />
          </button>

        </div>

        <div className="mobile_iamseekbar flex gap-5">
          <p>
            {duration.currentduration.minutes}:
            {duration.currentduration.seconds}
          </p>

          <div
            onClick={seekbarsong}
            className="iamlink hambar h-[5px] w-[40vw] mt-[10px] bg-[#fff]"
          >
            <div
              ref={seekbar}
              className="insidethehambar h-[5px] w-[0px] bg-[#ee10b0]"
            ></div>
            <div
              ref={seekbg}
              className="circle h-[18px] w-[10px] bg-[#1070ee]"
            ></div>
          </div>

          <p>
            {duration.totalduration.minutes}:{duration.totalduration.seconds}
          </p>
        </div>
      </div>

      

      
    </div>
  ) : null;
};

export default playpause;
