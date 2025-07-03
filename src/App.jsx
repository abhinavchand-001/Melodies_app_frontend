import React, { useContext , useRef } from "react";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import Playpause from "./components/Playpause";
import { Routes, Route , useLocation } from "react-router-dom";
import Albums from "./components/Albums";
import { Playercontext } from "./context/Playercontext";
import About_us from "./components/About_us";
// import Socialmediabutton from "./components/Socialmediabutton";

const App = () => {
  const { audioRef, track, songsData, albumData } = useContext(Playercontext); 

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";


   return (
    <div ref={displayRef} className="iamapp  flex min-screen max-w-screen">
      {songsData.length !== 0 ? (
        <>
          <Sidebar />

          {albumData.length > 0 
          ?  <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/albums/:id" element={<Albums album={albumData.find ( (x) => (x._id == albumId))} />} />
          <Route path="/about" element={<About_us/>} />
        </Routes>
        : null
        }

         

          <Playpause />
        </>
      ) : null}

      <audio
        ref={audioRef}
        src={track ? track.file : null}
        preload="auto"
      ></audio>
    </div>
  );
};

export default App;
