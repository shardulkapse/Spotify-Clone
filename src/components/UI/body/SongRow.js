import React from "react";
import classes from "./SongRow.module.css";

function SongRow({ track, playSong }) {
  return (
    <div className={classes.songRow} onClick={() => playSong(track.id)}>
      <img
        className={classes.songRow__album}
        src={track.album.images[0].url}
        alt="alt"
      />
      <div className={classes.songRow__info}>
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
