import './App.module.css';
import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import {v4 as uuidv4} from 'uuid';
import Playlist from '../Playlist/Playlist';
import styles from '../App/App.module.css'

function App() {
  /*
    TODO
      Call Spotify API to populate the tracks data based on user search input
  */
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
      name: "",
      tracks: 
      [
        
      ]
    }
  );

  const addTrackToCustomPlaylist = (track) => {
    const isFound = customPlaylist.tracks.some((element) => element.id === track.id);

    if(!isFound){
      setCustomPlaylist((prevState) => ({
        ...prevState,
        tracks: [...prevState.tracks, track]
      }));
    }
  };

  const removeTrackFromCustomPlaylist = (track) => {
    const updatedCustomPlaylist = customPlaylist.tracks.filter((e) => e.id !== track.id);
    setCustomPlaylist((prevState) => ({
      ...prevState,
      tracks: updatedCustomPlaylist
    }));
};

  const handleCustomPlaylistInput = (newName) => {
    const updatedCustomPlaylistName = { ...customPlaylist, name: newName};
    setCustomPlaylist(updatedCustomPlaylistName);
  }

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
              <button onClick={() => addTrackToCustomPlaylist(track)}>+</button>
            </>
          )
          
        })
      }
      <br/>
      <br/>
      <label htmlFor="userPlaylist" className={styles.bold}>Playlist Name: </label>
      <input 
        id="userPlaylist"
        value={customPlaylist.name}
        onChange={(e) => handleCustomPlaylistInput(e.target.value)}
        name="userPlaylist"
        type="text"
      />
      <Playlist 
        customPlaylist={customPlaylist} 
        removeTrackFromCustomPlaylist={removeTrackFromCustomPlaylist}
      />
    </>
  );
}

export default App;
