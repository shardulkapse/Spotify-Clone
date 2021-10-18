import { Favorite, PlayCircleFilled } from "@material-ui/icons";
import React from "react";
import { useDataLayerValue } from "../../appData/DataLayer";
import classes from "./Body.module.css";
import Header from "./Header";
import { MoreHoriz } from "@material-ui/icons";
import SongRow from "./SongRow";

const Body = ({ spotify }) => {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack(res).then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className={classes.body}>
      <Header spotify={spotify} />

      <div className={classes.body__info}>
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className={classes.body__infoText}>
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className={classes.body__songs}>
        <div className={classes.body__icons}>
          <PlayCircleFilled
            className={classes.body__shuffle}
            onClick={playPlaylist}
          />
          <Favorite fontSide="large" className={classes.body__margin} />
          <MoreHoriz className={classes.body__margin} />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow track={item.track} playSong={playSong} key={item.track.id} /> 
        ))}
      </div>
    </div>
  );
};

export default Body;
