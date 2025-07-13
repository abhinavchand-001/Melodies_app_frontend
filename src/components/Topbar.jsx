import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Playercontext } from "../context/Playercontext";

const url = "https://melodies-app-backend.vercel.app";

const Topbar = () => {
  const { playwithid } = useContext(Playercontext);

  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  

  const handelclick = (e) => {
    setInput(e.target.value);
    const todisplay = document.querySelector(".suggestion_bar");
    todisplay.style.display = "block";
    if(input === ""){
      todisplay.style.display = "none";
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      fetch(`${url}/api/song/list`)
        .then((res) => res.json())
        .then((data) => {
          setSearchData(
            data.songs.filter((song) =>
              song.name.toLowerCase().includes(input.toLowerCase())
            ) || []
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          setSearchData([]);
        });
    } else {
      setSearchData([]);
    }
  }, [input]);

  const playsong = (id) => {
    playwithid(id);
    const todisplay = document.querySelector(".suggestion_bar");
    todisplay.style.display = "none";
    const showsongbar = document.querySelector('.iamplaypause');
    showsongbar.style.display = "flex";
  };

  // google authentication code
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  // google authentication code

  return (
    <div
      id="iamtopbar"
      className=" h-20 w-[100%] flex pt-5 items-center justify-between text-3xl font-bold z-20"
    >
      <div className="complete_search_bar flex flex-col">
        <div
          id="iamsearchbar"
          className="h-12 w-[25vw] ml-15 bg-[#1f1f1fa2] flex items-center rounded-[15px]"
        >
          <CiSearch className="text-4xl font-bold ml-2 text-[#ee10b0]" />
          <input
            value={input}
            onChange={handelclick}
            placeholder="Search for Music,Artist,..."
            className="text-[15px] w-full px-2 py-1 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="suggestion_bar h-[40vh] hidden w-[25vw] gap-y-20 ml-15 overflow-y-auto pt-5 pl-4 bg-[#181818]">
          {searchData.map((data, index) => (
            <div
              key={index}
              onClick={() => playsong(data._id)}
              className="iamlink flex gap-5 font-bold mb-2 cursor-pointer hover:bg-[#2d2d2d] rounded-lg p-2"
            >
              <img className="w-12" src={data.image} alt="" />
              <div className="flex flex-col gap-2">
                <p className="text-[16px] text-white">{data.name}</p>
                <p className="text-xs text-[#d1c5ee]">
                  {data.desc?.slice(0, 32)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-9 mr-15">
        {/* // google authentication code */}

        {isAuthenticated && (
          <h2 className="text-white font-light">Hi {user.name}</h2>
        )}

        {isAuthenticated ? (
          <button
            onClick={(e) =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="iamlink h-10 w-[8vw] text-[15px] text-white flex items-center justify-center cursor-pointer bg-[#ee10b0]"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={(e) => loginWithRedirect()}
            className="iamlink h-10 w-[8vw] text-[15px] text-white flex items-center justify-center cursor-pointer bg-[#ee10b0]"
          >
            Sign In
          </button>
        )}

        {/* // google authentication code */}

        <div
          onClick={() => navigate("/about")}
          className="iamlink  h-10 w-[8vw] text-[#ee10b0] text-[15px] flex items-center justify-center border-[2px] border-[#ee10b0] active:scale-90"
        >
          About Us
        </div>
        <Link className="iamlink  h-10 w-[8vw] text-white text-[15px] bg-[#ee10b0] flex items-center justify-center active:scale-90 ">
          Install App
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
