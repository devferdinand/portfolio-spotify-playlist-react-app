import React from 'react';
import styles from './Playlist.module.css';

function Playlist({customPlaylist, removeTrackFromPlaylist}){
    return (
        <>
            <h1>{customPlaylist.name}</h1>
            {
                customPlaylist.tracks.map((track) => {
                    return (
                        <>
                            <p className={styles.bold}>{track.name}</p>
                            <p>{track.artist} | {track.album}</p>
                            <button onClick={() => removeTrackFromPlaylist(track)}>-</button>
                        </>
                    )
                })
            }
        </>
    );
}

export default Playlist;