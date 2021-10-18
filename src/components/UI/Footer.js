import React, { useEffect } from "react";
import classes from "./Footer.module.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useDataLayerValue } from "../appData/DataLayer";
import { PauseCircleFilledOutlined } from "@material-ui/icons";

const Footer = ({ spotify }) => {
  const [{ item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify, dispatch, item]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className={classes.footer}>
      <div className={classes.footer__left}>
        <img
          src={item?.album.images[0].url}
          alt={item?.name}
          className={classes.footer__albumLogo}
        />
        {item ? (
          <div className={classes.footer__songInfo}>
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className={classes.footer__songInfo}>
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className={classes.footer__center}>
        <ShuffleIcon className={classes.footer__green} />
        <SkipPreviousIcon className={classes.footer__icon} onClick={skipPrevious} />
        {playing ? (
          <PauseCircleFilledOutlined
            fontSize="large"
            className={classes.footer__icon}
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleOutlineIcon
            fontSize="large"
            className={classes.footer__icon}
            onClick={handlePlayPause}
          />
        )}
        <SkipNextIcon className={classes.footer__icon} onClick={skipNext} />
        <RepeatIcon className={classes.footer__green} />
      </div>
      <div className={classes.footer__right}>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider className={classes.footer__slider} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
