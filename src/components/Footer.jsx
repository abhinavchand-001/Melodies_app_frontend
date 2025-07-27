import React from "react";
import Socialmediabutton from "./Socialmediabutton";
import { useState } from "react";

const Footer = () => {



  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "59cd1215-3ba6-48a3-b3db-ab49b137fbc2");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="iamfooter min-h-[50vh] max-w-screen flex justify-center items-center flex-col mt-10 ">
      <div className="Footerheadname h-[20%] w-[90%] pt-10 flex items-center justify-center text-3xl font-bold text-white">
        <h1 className="Footermelodeisheadline">Melodies</h1>
      </div>

      <div className="belowtheheadname h-full w-full flex items-center justify-between p-10">

        <div className="about_text h-[17em] w-[34%] flex flex-col p-3  text-white">
          <h1 className="text-3xl font-bold m-2">About</h1>
          <p className="footer_text text-[1.2vw] text-justify m-2">
            Melodies is a website that has been created for over{" "}
            <span className="font-semibold text-[#ee10b0]">5 year's</span> now
            and it is one of the most famous music player website's in the
            world. in this website you can listen and download songs for free.
            also of you want no limitation you can buy our{" "}
            <span className="font-semibold text-[#1070ee]">premium pass </span>{" "}
            .
          </p>
          <div className="iamsocialmedia_button ">
          <Socialmediabutton/>

          </div>
        </div>

        <form
          action=""
          className="textareadiv h-[28em] w-[40%] flex flex-col items-center p-3 "
          onSubmit={onSubmit}
        >
          <h2 className="text-3xl font-bold m-2 text-white">Get In Touch</h2>
          <div className="h-10 w-full m-2 bg-[#1f1f1fa2]  ">
            <textarea
            name="name"
              placeholder="Name"
              className="text-[15px] h-10 w-full px-2 py-1 text-white outline-none "
              required
            />
          </div>

          <div className="h-10 w-full m-2 bg-[#1f1f1fa2]  ">
            <textarea
            name="email"
              placeholder="Email"
              className="text-[15px] h-10 w-full px-2 py-1 text-white outline-none "
              required
            />
          </div>

          <div className="h-full w-full m-2 bg-[#1f1f1fa2] ">
            <textarea
            name="message"
              placeholder="Type Message.."
              className="text-[15px] flex flex-col flex-wrap h-full w-full px-2 py-1 text-white outline-none "
              required
            />
          </div>

          <button
            type="submit"
            className="iamlink formbutton h-20 w-full text-2xl text-white mt-3 flex items-center justify-center cursor-pointer bg-[#ee10b0] rounded-[6px] "
          >
            Send
          </button>
        </form>
      </div>

      <div className="h-[10%] w-[90%] flex items-center justify-center text-white">
        <p>© 2025 Melodies. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
