import React from 'react';
import styles from './Tracklist.module.css';

function Tracklist(props){
    const artists = props.artist;
    const combinedArtists = artists.join(', ');
    return (
        <>
            <p className={styles.bold}>{props.name}</p>
            <p>{combinedArtists} | {props.album}</p>
        </>
    );
}

export default Tracklist;