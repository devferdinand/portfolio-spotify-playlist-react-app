import './App.module.css';
import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import {v4 as uuidv4} from 'uuid';
import Playlist from '../Playlist/Playlist';
import styles from '../App/App.module.css'
import {getUserAuthorization, getUserAccessToken} from '../Spotify/spotify.js'

function App() {
  const spotifyBaseUrl = 'https://api.spotify.com';

  const [userInput, setUserInput] = useState('');
  
  const [tracks, setTracks] = useState(
    [

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

  const getSearchRequest = async () => {
    const searchRequestEndpoint = '/v1/search?q=';
    const type = '&type=track'
    const url = `${spotifyBaseUrl}${searchRequestEndpoint}${userInput}${type}`;
    const token = getUserAccessToken();

    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(response.ok){
        const arr = [];
        const jsonResponse = await response.json();

        // Traverse track
        for(const key in jsonResponse.tracks.items){
          // Create object and store track name
          const obj = {
            name: jsonResponse.tracks.items[key].name,
          };

          // store artist(s)
          obj['artist'] = [];
          for(const i in jsonResponse.tracks.items[key].artists){
            obj['artist'].push(jsonResponse.tracks.items[key].artists[i].name);
          }

          // store album
          obj['album'] = jsonResponse.tracks.items[key].album.name;

          // store unique id
          obj['id'] = uuidv4();

          // store uri
          obj['uri'] = jsonResponse.tracks.items[key].uri;

          // push obj to array
          arr.push(obj);
        }
        
        // update tracks state object
        setTracks(arr);
      }
    }
    catch(error){
      console.log(error);
    }
    
  }
  
  const saveCustomPlaylistToAccount = () => {
    // Logic to save a custom playlist to Spotify
  };

  return (
    <>
      <button onClick={getSearchRequest}>SEARCH</button>
      <br/>
      <input
        type="text"
        id="searchInput"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
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
      <br/>
      <br/>
      <button onClick={getUserAuthorization}>AUTHENTICATE</button>
      <button onClick={saveCustomPlaylistToAccount}>SAVE TO SPOTIFY</button>
    </>
  );
}

export default App;
