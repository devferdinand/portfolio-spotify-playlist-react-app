import React from 'react';
import styles from './Tracklist.module.css';

function Tracklist(props){
    return (
        <>
            <p className={styles.bold}>{props.name}</p>
            <p>{props.artist} | {props.album}</p>
        </>
    );
}

export default Tracklist;