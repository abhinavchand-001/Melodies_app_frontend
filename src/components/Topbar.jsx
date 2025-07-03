import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {

    const navigate = useNavigate(); 
  


  // google authentication code 
const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

// google authentication code

  return (
    <div
      id="iamtopbar"
      className=" h-20 w-[100%] flex pt-5 items-center justify-between text-3xl font-bold z-20"
    >
      <div
        id="iamsearchbar"
        className="h-12 w-[25vw] ml-15 bg-[#1f1f1fa2] flex items-center rounded-[15px]"
      >
        <CiSearch className="text-4xl font-bold ml-2 text-[#ee10b0]" />
        <input
          placeholder="Search for Music,Artist,..."
          className="text-[15px] w-full px-2 py-1 text-white focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-center gap-9 mr-15">

{/* // google authentication code */}

       { isAuthenticated && <h2 className="text-white font-light">Hi {user.name}</h2>}

        {
          isAuthenticated ? (
            <button onClick={(e) => logout({ logoutParams: { returnTo: window.location.origin } })} className="iamlink h-10 w-[8vw] text-[15px] text-white flex items-center justify-center cursor-pointer bg-[#ee10b0]">Sign Out</button>
          ) : (

            <button onClick={(e) => loginWithRedirect()} className="iamlink h-10 w-[8vw] text-[15px] text-white flex items-center justify-center cursor-pointer bg-[#ee10b0]">Sign In</button>
          )
        }
        
 {/* // google authentication code */}

        <div onClick={() => navigate("/about")} className="iamlink  h-10 w-[8vw] text-[#ee10b0] text-[15px] flex items-center justify-center border-[2px] border-[#ee10b0] active:scale-90">
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
