import { useEffect, useRef } from "react";
import { useStore } from "../../Store/store";
import model from "../classes/modelClass";

export const usePosition = () => {
  const isPlayingRef = useRef(false);
  const menuOpenRef = useRef(false);
  const isLoadedRef = useRef(false);
  const isPlaying = useStore((state) => state.isPlaying);
  const mood = useStore((state) => state.mood);
  const playlistTracksOpen = useStore((state) => state.playlistTracksOpen);
  const searchTracksOpen = useStore((state) => state.searchTracksOpen);
  const isLoaded = useStore((state) => state.isLoaded);

  useEffect(() => {
    isLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    model.danceManager.setMood(mood);
    if (model.danceManager.isDancing) model.danceChain();
  }, [mood]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isLoadedRef.current) return;
    const pos = model.positionManager.pos;
    if (isPlaying) {
      if (!menuOpenRef.current) {
        if (pos === "right" || pos === "transit") model.leftDanceChain();
        else model.danceChain();
      } else {
        if (pos === "left" || pos === "transit") model.rightDanceChain();
        else model.danceChain();
      }
    } else {
      if (!menuOpenRef.current) {
        if (pos === "right") model.idleChain();
        else if (pos === "transit") model.rightIdleChain();
        else model.angryChain();
      } else {
        if (pos === "left" || pos === "transit") model.rightIdleChain();
        else model.idleChain();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    const pos = model.positionManager.pos;
    menuOpenRef.current = playlistTracksOpen || searchTracksOpen;
    if (isPlayingRef.current) {
      if (menuOpenRef.current && pos === "right") model.danceChain();
      else if (playlistTracksOpen) model.scaredDanceChain();
      else if (searchTracksOpen) model.rightDanceChain();
      else if (pos === "right" || pos === "transit") model.leftDanceChain();
      else model.danceChain();
    } else {
      if (pos === "right") model.idleChain();
      else if (playlistTracksOpen) model.scaredIdleChain();
      else model.rightIdleChain();
    }
  }, [playlistTracksOpen, searchTracksOpen]);
};
