import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const usePosition = () => {
  const isPlayingRef = useRef(false);
  const menuOpenRef = useRef(false);
  const isLoadedRef = useRef(false);
  const isPlaying = useStore((state) => state.isPlaying);
  const playlistTracksOpen = useStore((state) => state.playlistTracksOpen);
  const searchTracksOpen = useStore((state) => state.searchTracksOpen);
  const isLoaded = useStore((state) => state.isLoaded);

  useEffect(() => {
    isLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isLoadedRef.current) return;
    if (isPlaying) {
      if (!menuOpenRef.current) {
        if (model.pos === "right" || model.pos === "transit")
          model.leftDanceChain();
        else model.danceChain();
      } else {
        if (model.pos === "left" || model.pos === "transit")
          model.rightDanceChain();
        else model.danceChain();
      }
    } else {
      if (!menuOpenRef.current) {
        if (model.pos === "right") model.idleChain();
        else if (model.pos === "transit") model.rightIdleChain();
        else model.angryChain();
      } else {
        if (model.pos === "left" || model.pos === "transit")
          model.rightIdleChain();
        else model.idleChain();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    menuOpenRef.current = playlistTracksOpen || searchTracksOpen;
    if (isPlayingRef.current) {
      if (menuOpenRef.current && model.pos === "right") model.danceChain();
      else if (playlistTracksOpen) model.scaredDanceChain();
      else if (searchTracksOpen) model.rightDanceChain();
      else if (model.pos === "right" || model.pos === "transit")
        model.leftDanceChain();
      else model.danceChain();
    } else {
      if (model.pos === "right") model.idleChain();
      else if (playlistTracksOpen) model.scaredIdleChain();
      else model.rightIdleChain();
    }
  }, [playlistTracksOpen, searchTracksOpen]);
};
