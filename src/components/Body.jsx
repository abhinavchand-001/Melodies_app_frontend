import React, { useEffect, useRef } from "react";
import { Routes, Route} from "react-router-dom";
import Topbar from "./Topbar";
import Videobody from "./Videobody";
import Topsongs from "./Topsongs";
import Newreleasesongs from "./Newreleasesongs";
// import {Routes, Route} from 'react-router-dom's
// import { useGetTopChartsQuery } from '../redux/services/Shazamcore'
import { useContext } from "react";
import { Playercontext } from "../context/Playercontext";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const body = () => {
  const navigate = useNavigate();

  const {songsData , albumData} = useContext(Playercontext)


  const handelclick = () => {
    const todisplay = document.querySelector(".suggestion_bar");
     todisplay.style.display = "none";
  }


  return (
    
    <div className="only_for_mobile overflow-hidden flex">



      {/* // this code is only for mobiles version  eg- pixels below 400 */}

      <div className="Mobile_navbaar sticky top-0 left-0 h-dvh w-[12vw] bg-[#181818] hidden flex-col gap-15 p-2 pl-7">

        <a className="Mobile_acnchor_tag mt-20 text-[#084c74] " href="#weeklytopsongs">Albums</a>
        <a className="Mobile_acnchor_tag text-[#084c74]" href="#footer">Connect</a>
        <a className="Mobile_acnchor_tag text-[#084c74]" onClick={() => navigate("/about")}>About</a>

    

      </div>


    
    <div
      id="iambody "
      onClick={handelclick}
      className="iamclassbody relative min-h-[300vh] w-[81vw] flex flex-col bg-[#181818] "
    >
      <Videobody  />
      <Topbar />


      <h4
        id="weeklytopsongs"
        className=" ml-12 mb-15 mt-10 text-3xl  text-white "
      >
        Weekly Top <span className="font-semibold text-[#ee10b0]">Albums</span>
      </h4>
      <div className="songscontainer flex flex-wrap flex-row m-10 mt-0 gap-6 p-4">
        {albumData.map((item, index) => (
          <Topsongs 
            key={index}
            image={item.image}
            name={item.name}
            desc={item.desc}
            id={item._id}
          />
        ))}
      </div>




      <h4 id="weeklytopsongs" className="songslist ml-12 mb-15 text-3xl  text-white ">
        All Time Top <span className="font-semibold text-[#ee10b0]">Songs</span>
      </h4>
      <div className="songscontainer flex flex-wrap flex-row m-10 mt-0 gap-6 p-4">
        {songsData.map((item, index) => (
          <Newreleasesongs
            key={index}
            image={item.image}
            name={item.name}
            desc={item.desc}
            id={item._id}
          />
        ))}
      </div>

      <Footer />
    </div>
    </div>
  );
};

export default body;
