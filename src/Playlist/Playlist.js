import React from 'react';
import styles from './Playlist.module.css';

function Playlist(props){
    return (
        <>
            <h1>{props.playlistName}</h1>
            {
                props.playlistTracks.map((track) => {
                    return (
                        <>
                            <p className={styles.bold}>{track.name}</p>
                            <p>{track.artist} | {track.album}</p>
                        </>
                    )
                })
            }
        </>
    );
}

export default Playlist;