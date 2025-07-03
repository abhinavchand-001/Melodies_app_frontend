import React from "react";
import { PiInstagramLogoBold } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";

const Socialmediabutton = () => {




  return (
    <div className="socialmediabutton min-h-30 max-w-30 flex ml-8 items-center justify-center gap-8 text-4xl font-bold ">
      <a
        href="https://www.instagram.com/abhinav_draws_0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>
          <PiInstagramLogoBold className="iamlink text-[#1070ee] hover:text-[#0055ff] hover:scale-[1.2] transition-colors" />
        </button>
      </a>
      <a
        href="https://github.com/abhinavchand-001"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>
          <VscGithub className="iamlink text-[#ee10b0] hover:text-[#ff0080] hover:scale-[1.2]  transition-colors" />
        </button>
      </a>
      <a
        href="https://www.linkedin.com/in/abhinav-chand-8204622bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>
          <FaLinkedin className="iamlink text-[#1070ee] hover:text-[#0055ff] hover:scale-[1.2] transition-colors" />
        </button>
      </a>
    </div>
  );
};

export default Socialmediabutton;
