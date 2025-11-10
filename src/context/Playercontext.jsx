import { createContext , useEffect, useRef , useState} from "react";
import axios from "axios";



const url = "https://melodies-app-backend.vercel.app";

export const Playercontext = createContext();
const Playercontextprovider = (props) =>{

    const audioRef = useRef(null);
    const seekbg = useRef(null);
    const seekbar = useRef(null);
    const mobile_seekbg = useRef(null);
    const mobile_seekbar = useRef(null);


    const [songsData, setSongsData] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    const [track , setTrack] = useState(songsData[0]);
    const [playing , setPlaying] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [volume, setVolume] = useState(0.1);
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

    const playwithid = async (id, albumName = null) => {
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item)
                
            }
        })

        // Set or clear current album context
        setCurrentAlbum(albumName);

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
        // If we're in an album context, play next song from that album
        if (currentAlbum) {
            const albumSongs = songsData.filter(song => song.album === currentAlbum);
            const currentIndex = albumSongs.findIndex(song => song._id === track._id);
            
            if (currentIndex !== -1 && currentIndex < albumSongs.length - 1) {
                await setTrack(albumSongs[currentIndex + 1]);
                await audioRef.current.play();
                setPlaying(true);
            }
        } else {
            // Default behavior: play next song from all songs
            songsData.map(async (item, index) => {
                if (track._id === item._id && index < songsData.length ) {
                  await setTrack(songsData[index + 1]);
                  await audioRef.current.play();
                  setPlaying(true);
                }
              });
        }
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

    //only for mobile 

    const mobile_seekbarsong = async (e) => {
        // Get the bounding rectangle of the parent container
        const rect = mobile_seekbar.current.parentElement.getBoundingClientRect();
        // Calculate the click position relative to the container
        const x = e.clientX - rect.left;
        // Get the width of the container
        const width = rect.width;
        // Calculate progress (0-1)
        const progress = x / width;
        // Set the audio time
        audioRef.current.currentTime = progress * audioRef.current.duration;
        
        // Update seekbar width immediately
        if(mobile_seekbar.current && mobile_seekbg.current) {
          mobile_seekbar.current.style.width = `${progress * 100}%`;
          mobile_seekbg.current.style.left = `${progress * 100}%`;
        }
      
      
      
        // Ensure audio continues playing
        if (playing) {
            audioRef.current.play();
        }        
          }




   
// Function to convert linear slider value to perceived volume
const getPerceivedVolume = (value) => {
    // This formula creates a more natural volume curve
    return Math.pow(value, 2) * 0.5
  }
  
  // Function to convert perceived volume back to slider value
  const getSliderValue = (volume) => {
    return Math.sqrt(volume * 2)
  }
  
  const toggleMute = () => {
    const newVolume = volume === 0 ? 0.5 : 0;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };




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
                    if(mobile_seekbar.current && mobile_seekbg.current) {
                        mobile_seekbar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                        mobile_seekbg.current.style.left = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
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

    // Handle song end - auto play next song in album
    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.onended = () => {
                console.log('Song ended. Current album:', currentAlbum);
                if (currentAlbum) {
                    const albumSongs = songsData.filter(song => song.album === currentAlbum);
                    console.log('Album songs:', albumSongs.length, 'Current track:', track?.name);
                    const currentIndex = albumSongs.findIndex(song => song._id === track._id);
                    console.log('Current index:', currentIndex, 'Total songs:', albumSongs.length);
                    
                    // Play next song if available
                    if (currentIndex !== -1 && currentIndex < albumSongs.length - 1) {
                        const nextSong = albumSongs[currentIndex + 1];
                        console.log('Playing next song:', nextSong.name);
                        setTrack(nextSong);
                        setTimeout(() => {
                            audioRef.current.play();
                            setPlaying(true);
                        }, 100);
                    } else {
                        console.log('Last song in album, stopping');
                        // Last song in album, stop playing
                        setPlaying(false);
                    }
                } else {
                    console.log('No album context, stopping');
                    // Default behavior: stop playing
                    setPlaying(false);
                }
            }
        }
    }, [currentAlbum, track, songsData])

    const contextvalue = {
        audioRef,
        seekbg,
        seekbar,
        mobile_seekbg,
        mobile_seekbar,
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
        mobile_seekbarsong,
        songsData,
        albumData,
        volume,
        setVolume,
        getPerceivedVolume,
        getSliderValue,
        toggleMute,
        currentAlbum,
        setCurrentAlbum

    }

    return (
        <Playercontext.Provider value={contextvalue}>
            {props.children}
        </Playercontext.Provider>
    )
}


export default Playercontextprovider 