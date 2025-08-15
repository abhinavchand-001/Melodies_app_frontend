import React , {useEffect, useState} from 'react'
import Topbar from './Topbar'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { Playercontext } from "../context/Playercontext";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';





const Albums = ({album}) => {

 const navigate = useNavigate();

 const handleClick3 = () => {
  navigate('/');
 }

  const {id}= useParams()
  const [albumsData , setAlbumsData] = useState("")
  const {playwithid, albumData, songsData} = useContext(Playercontext)

  useEffect(() => {
    albumData.map((item) => {
      if(item._id == id){
        setAlbumsData(item)
      }
    })
    
  },[])

  const playing  = (id) => {
    playwithid(id)
    const todisplay = document.querySelector(".iamplaypause");
    todisplay.style.display = "flex";
  }
  


  return albumsData ? (
    <div className='album_container bg-[#181818] w-full min-h-[100vh] flex flex-col items-sta overflow-hidden p-10 '>

      <div className='i_am_only_for_background w-full  h-full '>

            <div className="w-full p-5 mb-5">
                  <button onClick={handleClick3} className='iamlink'>
                    <MdOutlineArrowBackIos className="text-3xl text-white" />
                  </button>
                </div>

      <div className='iamalbum flex gap-8 w-full justify-between items-center p-5 '>
        <img className='h-60 w-60' src={albumsData.image} alt="" />

        <div className='flex flex-col gap-2'>
          <p className='text-white text-[15px] text-right'>Album</p>
          <h1 className='text-7xl font-bold text-white'>{albumsData.name}</h1>
          <p className='font-semibold text-[#d1c5ee] text-[15px] text-right'>{albumsData.desc}</p>
        </div>
      </div>

      <div className='song_heading grid grid-cols-4 items-center gap-6 p-2 mt-10 w-[95%] text-white font-bold text-[17px]'>
        <p className='heading_title gap-5 flex'> <b>#</b> Title</p>
        <p>Albums</p>
        <p className='artist_heading ml-[-10px]'>Artists</p>
        <p>Time</p>
      </div>
      <hr className='text-white w-[95%] mb-4'/>

      {songsData.filter((item) => item.album === album.name).map((song , index) => (
        <div onClick={() => playing(song._id)}  key={index} className='album_list iamlink grid grid-cols-4 items-center gap-2 p-2 mt-10 w-[95%] text-white hover:bg-[#272727b9]'>
          <div className='gap-3 flex items-center'>

            <p className='text-gray-500 font-bold'>{index + 1}</p>
            <img className='song_image inline w-10 mr-3' src={song.image} alt="" />
            <p className='song_name'>{song.name}</p>
          </div>

          <p className='album_name2'>{albumsData.name}</p>
          <p className='album_desc2'>{song.desc}</p>
          <p className='flex items-center gap-5'> <FaRegHeart className='like_icon text-[#4e8af8] text-2xl'/>{song.duration}</p>

          {/*only for mobile */}

        </div>
        

      ))}

      </div>  

   


    </div>
  ) : null
}

export default Albums