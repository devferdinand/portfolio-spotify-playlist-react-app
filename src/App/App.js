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
    if(!token){
      throw new Error('Failed to get user access token');
    }

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
      else{
        throw new Error('Failed to fetch response');
      }
    }
    catch(error){
      console.error('Error fetching search request:', error);
      throw error;
    }
    
  }
  
  const getUserId = async () => {
    const endpoint = '/v1/me';
    const url = `${spotifyBaseUrl}${endpoint}`;
    const token = getUserAccessToken();
    if(!token){
      throw new Error('Failed to get user access token');
    }

    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse.id;
      }
      else{
        throw new Error('Failed to fetch user data');
      }
    }
    catch(error){
      console.error('Error fetching user ID:', error);
      throw error;
    }
  };

  const createPlaylist = async (userId) => {
    // create new playlist on user spotify account
    const endpoint = `/v1/users/${userId}/playlists`;
    const url = `${spotifyBaseUrl}${endpoint}`;
    const token = getUserAccessToken();
    if(!token){
      throw new Error('Failed to get user access token');
    }

    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': customPlaylist.name,
        })
      });

      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse.id;
      }
      else{
        throw new Error('Failed to create spotify playlist');
      }
    }
    catch(error){
      console.error('Error in creating spotify playlist:', error);
      throw error;
    }
  };

  const getCustomPlaylistUriTracks = (arr) => {
    let retArr = [];
    for(let i = 0; i < arr.length; i++){
      retArr.push(arr[i]['uri']);
    }
    return retArr;
  };

  const emptyCustomPlaylist = () => {
    setCustomPlaylist({
      name: "",
      tracks: []
    });
  }

  const saveCustomPlaylistToAccount = async () => {
    // Logic to save a custom playlist to Spotify
    const userId = await getUserId();
    
    const spotifyPlaylistId = await createPlaylist(userId);

    const endpoint = `/v1/users/${userId}/playlists/${spotifyPlaylistId}/tracks`;
    const url = `${spotifyBaseUrl}${endpoint}`;
    const token = getUserAccessToken();
    if(!token){
      throw new Error('Failed to get user access token');
    }

    try{
      let uriTracks = getCustomPlaylistUriTracks(customPlaylist.tracks);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'uris': uriTracks
        })
      });

      if(response.ok){
        const jsonResponse = await response.json();
        emptyCustomPlaylist();
      }
      else{
        throw new Error('Failed to add tracks to spotify playlist');
      }
    }
    catch(error){
      console.error('Error in adding tracks to spotify playlist:', error);
      throw error;
    }
  };

  return (
    <div className={styles.purpleBackground}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="searchInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.childRow}>
          <button onClick={getUserAuthorization} className={styles.authBtn}>AUTHENTICATE</button>
          <button onClick={getSearchRequest} className={styles.searchBtn}>SEARCH</button>
        </div>
        
      </div>
      <br/>
      <h1 className={styles.azure}>Results</h1>
      <div className={`${styles.gridContainer}`}>
        <div className={`${styles.leftDiv}`}>
          {
            tracks.map((track) => {
              // we're in a function here so we return
              return (
                <div className={styles.childRow}>
                  <div>
                    <Tracklist 
                      name={track.name} 
                      artist={track.artist} 
                      album={track.album} 
                      key={track.id} 
                    />
                  </div>
                  <button className={styles.addBtn} onClick={() => addTrackToCustomPlaylist(track)}>+</button>
                </div>
              )
              
            })
          }
        </div>
        
        <div className={`${styles.rightDiv}`}>
          <label htmlFor="userPlaylist" className={`${styles.bold} ${styles.azure}`}>Playlist Name: </label>
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
          <br></br>
          <button onClick={saveCustomPlaylistToAccount}>SAVE TO SPOTIFY</button>
        </div>
      </div>
    </div>
  );
}

export default App;
