import React, { useContext, useState } from "react";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineSkipNext } from "react-icons/md";
import { CiPause1 } from "react-icons/ci";
import { Playercontext } from "../context/Playercontext";
import { CiVolumeHigh } from "react-icons/ci";
import { CiVolumeMute } from "react-icons/ci";

const playpause = () => {
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
    <div className="iamplaypause hidden h-[5rem] w-full bg-[#000000] text-white font-bold items-center justify-between p-10">
      {/* song details */}
      <div className="flex gap-5 font-bold ">
        <img className="w-12" src={track.image} alt="" />
        <div className="flex flex-col gap-2">
          <p className="font-bold">{track.name}</p>
          <p className="text-xs text-[#d1c5ee]">{track.desc.slice(0, 32)}</p>
        </div>
      </div>

      {/* play pause buttons  */}

      <div className="flex flex-col items-center justify-center ">
        <div className="flex gap-7 font-bold text-4xl">
          <button onClick={previous}>
            <MdOutlineSkipPrevious className="iamlink playpauseicon  text-[#ee10b0] cursor-pointer" />
          </button>

          {playing ? (
            <button onClick={pause}>
              <CiPause1 className="iamlink" />
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

        <div className="flex gap-5">
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

      {/* volume up and down  */}

      {/* <div className='flex gap-3 items-center justify-center'> 
        <div onClick={handleVolumeClick} className='iamlink volumebar h-[5px] w-[8vw] bg-[#fff]'>
          <div ref={insideVolumeRef} className='insidevolumebar h-[5px] w-[0px] bg-[#1070ee]'></div>
          <div ref={volumeCircleRef} className='volumecircle h-[15px] w-[15px] bg-[#ee10b0]'></div>
        </div>

        
        <button><CiVolumeHigh className='iamlink text-2xl font-bold'/></button>
        <button><CiVolumeMute className='iamlink text-2xl font-bold'/></button>

      </div> */}

      <div className="flex gap-3 items-center justify-center">
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
  ) : null;
};

export default playpause;
