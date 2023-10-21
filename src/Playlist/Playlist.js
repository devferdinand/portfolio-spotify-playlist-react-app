import React from 'react';
import styles from './Playlist.module.css';

function Playlist({customPlaylist, removeTrackFromCustomPlaylist}){
    return (
        <>
            <h1>{customPlaylist.name}</h1>
            {
                customPlaylist.tracks.map((track) => {
                    const artists = track.artist;
                    const combinedArtists = artists.join(', ');
                    return (
                        <>
                            <p className={styles.bold}>{track.name}</p>
                            <p>{combinedArtists} | {track.album}</p>
                            <button onClick={() => removeTrackFromCustomPlaylist(track)}>-</button>
                        </>
                    )
                })
            }
        </>
    );
}

export default Playlist;