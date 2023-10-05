function Tracklist(props){
    return (
        <>
            <p>{props.name}</p>
            <p>{props.artist}</p>
            <p>{props.album}</p>
        </>
    );
}

export default Tracklist;