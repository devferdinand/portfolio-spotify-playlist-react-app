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

  const [customPlaylist, setCustomPlaylist] = useState(
    {
      name: "iu playlist",
      tracks: 
      [
        {
          name: "Through the Night",
          artist: "IU",
          album: "Palette",
        },
        {
          name: "Palette (feat. G-DRAGON)",
          artist: "IU",
          album: "Palette",
        }
      ]
    }
  );

  return (
    <>
      <button>SEARCH</button>
      <button>SAVE TO SPOTIFY</button>
      
      <h1>Results</h1>
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

      <Playlist playlistName={customPlaylist.name} playlistTracks={customPlaylist.tracks}/>

    </>
  );
}

export default App;
