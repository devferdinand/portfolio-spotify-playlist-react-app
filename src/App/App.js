import './App.module.css';
import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import {v4 as uuidv4} from 'uuid';
import Playlist from '../Playlist/Playlist';

function App() {
  const [tracks, setTracks] = useState(
    [
      {
        name: "Through the Night",
        artist: "IU",
        album: "Palette",
        id: uuidv4()
      },
      {
        name: "Good Day",
        artist: "IU",
        album: "REAL",
        id: uuidv4()
      },
      {
        name: "Palette (feat. G-DRAGON)",
        artist: "IU",
        album: "Palette",
        id: uuidv4()
      },
    ]
  );

  const [customPlaylist, setCustomPlaylist] = useState(
    {
      name: "iu playlist",
      tracks: 
      [
        
      ]
    }
  );

  const addTrackToPlaylist = (track) => {
    const isFound = customPlaylist.tracks.some((element) => element.id === track.id);

    if(!isFound){
      setCustomPlaylist((prevState) => ({
        ...prevState,
        tracks: [...prevState.tracks, track]
      }));
    }
  };

  return (
    <>
      <button>SEARCH</button>
      <button>SAVE TO SPOTIFY</button>
      
      <h1>Results</h1>
      {
        tracks.map((track) => {
          // we're in a function here so we return
          return (
            <>
              <Tracklist 
                name={track.name} 
                artist={track.artist} 
                album={track.album} 
                key={track.id} 
              />
              <button onClick={() => addTrackToPlaylist(track)}>+</button>
            </>
          )
          
        })
      }

      <Playlist playlistName={customPlaylist.name} playlistTracks={customPlaylist.tracks}/>
  
    </>
  );
}

export default App;
