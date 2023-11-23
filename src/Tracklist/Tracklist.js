import React from 'react';
import styles from './Tracklist.module.css';

function Tracklist(props){
    const artists = props.artist;
    const combinedArtists = artists.join(', ');
    return (
        <>
            <p className={`${styles.bold} ${styles.titleColor}`}>{props.name}</p>
            <p className={`${styles.lightgrey}`}>{combinedArtists} | {props.album}</p>
        </>
    );
}

export default Tracklist;