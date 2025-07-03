import { createContext , useEffect, useRef , useState} from "react";
import axios from "axios";



const url = "https://melodies-app-backend.vercel.app/";

export const Playercontext = createContext();
const Playercontextprovider = (props) =>{

    const audioRef = useRef(null);
    const seekbg = useRef(null);
    const seekbar = useRef(null);

    const volumeBarRef = useRef(null);
    const insideVolumeRef = useRef(null);
    const volumeCircleRef = useRef(null);

    const [songsData, setSongsData] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    const [track , setTrack] = useState(songsData[0]);
    const [playing , setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [duration , setDuration] = useState({
        currentduration: {
            seconds: 0,
            minutes: 0

        },
        totalduration: {
            seconds: 0,
            minutes: 0

        }
    });

    const play = () => {
        audioRef.current.play();
        setPlaying(true);
    }

    const pause = () =>{
        audioRef.current.pause();
        setPlaying(false);
    }

    const playwithid = async (id) => {
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item)
                
            }
        })

        await audioRef.current.play()
        setPlaying(true)
    }

    const previous = async () => {
        songsData.map(async (item, index) => {
          if (track._id === item._id && index > 0) {
            await setTrack(songsData[index - 1]);
            await audioRef.current.play();
          }
        });
      };
      

    const next = async () => {

        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length ) {
              await setTrack(songsData[index + 1]);
              await audioRef.current.play();
            }
          });
    }

    const seekbarsong = async (e) => {
  // Get the bounding rectangle of the parent container
  const rect = seekbar.current.parentElement.getBoundingClientRect();
  // Calculate the click position relative to the container
  const x = e.clientX - rect.left;
  // Get the width of the container
  const width = rect.width;
  // Calculate progress (0-1)
  const progress = x / width;
  // Set the audio time
  audioRef.current.currentTime = progress * audioRef.current.duration;
  
  // Update seekbar width immediately
  if(seekbar.current && seekbg.current) {
    seekbar.current.style.width = `${progress * 100}%`;
    seekbg.current.style.left = `${progress * 100}%`;
  }
  
  // Ensure audio continues playing
  if (playing) {
      audioRef.current.play();
  }        
    }

   



    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const setVolumeLevel = (level) => {
        setVolume(level);
    };

    const increaseVolume = () => {
        if (volume < 1) {
            setVolume(prev => Math.min(prev + 0.1, 1));
        }
    };

    const decreaseVolume = () => {
        if (volume > 0) {
            setVolume(prev => Math.max(prev - 0.1, 0));
        }
    };

    const toggleMute = () => {
        setVolume(prev => prev === 0 ? 0.5 : 0);
    };


    const handleVolumeClick = (e) => {
        if (volumeBarRef.current) {
            const rect = volumeBarRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newVolume = clickX / width;
            setVolumeLevel(newVolume);
        }
    };

    useEffect(() => {
        if (insideVolumeRef.current && volumeCircleRef.current) {
            insideVolumeRef.current.style.width = `${volume * 100}%`;
            volumeCircleRef.current.style.left = `${volume * 100}%`;
        }
    }, [volume]);


    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            
                setSongsData(response.data.songs);
                setTrack(response.data.songs[0])
            
        } catch (error) {
           
        }
    }

    const getAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            
                setAlbumData(response.data.albums);
            
        } catch (error) {
           
        }
    }

    useEffect(() => {
        getSongsData();
        getAlbumData();
    }, []);


    useEffect(() => {
        setTimeout(() => {
            if(audioRef.current) {
                audioRef.current.ontimeupdate = () => {

                    if(seekbar.current && seekbg.current) {
                        seekbar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                        seekbg.current.style.left = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                    }
                    setDuration({
                        currentduration: {
                            seconds: Math.floor(audioRef.current.currentTime % 60),
                            minutes: Math.floor(audioRef.current.currentTime / 60)
            
                        },
                        totalduration: {
                            seconds: Math.floor(audioRef.current.duration % 60),
                            minutes: Math.floor(audioRef.current.duration / 60)
            
                        }
                    })
                
                }
            }

        } , 1000);

    }, [audioRef])


    const contextvalue = {
        audioRef,
        seekbg,
        seekbar,
        track,
        setTrack,
        playing,
        setPlaying,
        duration,
        setDuration,
        play,
        pause,
        playwithid,
        previous,
        next,
        seekbarsong,
        volume,
        setVolumeLevel,
        increaseVolume,
        decreaseVolume,
        toggleMute,
        volumeBarRef,
        insideVolumeRef,
        volumeCircleRef,
        handleVolumeClick,
        songsData,
        albumData

    }

    return (
        <Playercontext.Provider value={contextvalue}>
            {props.children}
        </Playercontext.Provider>
    )
}

export default Playercontextprovider;