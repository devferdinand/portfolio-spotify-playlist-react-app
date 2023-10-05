import './App.module.css';
import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [tracks, setTracks] = useState(
    [
      {
        name: "Through the Night",
        artist: "IU",
        album: "Palette",
      },
      {
        name: "Good Day",
        artist: "IU",
        album: "REAL",
      },
      {
        name: "Palette (feat. G-DRAGON)",
        artist: "IU",
        album: "Palette",
      }
    ]
  );

  return (
    <>
      <button>SEARCH</button>
      <button>SAVE TO SPOTIFY</button>
      
      {
        tracks.map((track) => {
          // we're in a function here so we return
          return (
            <Tracklist 
              name={track.name} 
              artist={track.artist} 
              album={track.album} 
              key={uuidv4()} 
            />
          )
        })
      }

    </>
  );
}

export default App;
