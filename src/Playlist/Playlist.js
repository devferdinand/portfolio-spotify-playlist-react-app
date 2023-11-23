import React from 'react';
import styles from './Playlist.module.css';

function Playlist({customPlaylist, removeTrackFromCustomPlaylist}){
    return (
        <>
            <h1 className={`${styles.azure}`}>{customPlaylist.name}</h1>
            {
                customPlaylist.tracks.map((track) => {
                    const artists = track.artist;
                    const combinedArtists = artists.join(', ');
                    return (
                        <div className={styles.childRow}>
                            <div>
                                <p className={`${styles.bold} ${styles.titleColor}`}>{track.name}</p>
                                <p className={`${styles.lightgrey}`}>{combinedArtists} | {track.album}</p>
                            </div>
                            <button className={styles.removeBtn} onClick={() => removeTrackFromCustomPlaylist(track)}>-</button>
                        </div>
                    )
                })
            }
        </>
    );
}

export default Playlist;