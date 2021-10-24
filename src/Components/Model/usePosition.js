import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";
import { useChains } from "./useChains";

export const usePosition = () => {
  const isPlayingRef = useRef(false);
  const menuOpenRef = useRef(false);
  const isLoadedRef = useRef(false);
  const isPlaying = useStore((state) => state.isPlaying);
  const playlistTracksOpen = useStore((state) => state.playlistTracksOpen);
  const searchTracksOpen = useStore((state) => state.searchTracksOpen);
  const isLoaded = useStore((state) => state.isLoaded);

  const {
    leftDanceChain,
    danceChain,
    rightDanceChain,
    idleChain,
    rightIdleChain,
    angryChain,
    scaredDanceChain,
    scaredIdleChain,
  } = useChains();

  useEffect(() => {
    isLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isLoadedRef.current) return;
    if (isPlaying) {
      if (!menuOpenRef.current) {
        if (model.pos === "right" || model.pos === "transit") leftDanceChain();
        else danceChain();
      } else {
        if (model.pos === "left" || model.pos === "transit") rightDanceChain();
        else danceChain();
      }
    } else {
      if (!menuOpenRef.current) {
        if (model.pos === "right") idleChain();
        else if (model.pos === "transit") rightIdleChain();
        else angryChain();
      } else {
        if (model.pos === "left" || model.pos === "transit") rightIdleChain();
        else idleChain();
      }
    }
  }, [
    angryChain,
    danceChain,
    idleChain,
    isPlaying,
    leftDanceChain,
    rightDanceChain,
    rightIdleChain,
  ]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    menuOpenRef.current = playlistTracksOpen || searchTracksOpen;
    if (isPlayingRef.current) {
      if (menuOpenRef.current && model.pos === "right") danceChain();
      else if (playlistTracksOpen) scaredDanceChain();
      else if (searchTracksOpen) rightDanceChain();
      else if (model.pos === "right" || model.pos === "transit")
        leftDanceChain();
      else danceChain();
    } else {
      if (model.pos === "right") idleChain();
      else if (playlistTracksOpen) scaredIdleChain();
      else rightIdleChain();
    }
  }, [
    danceChain,
    idleChain,
    leftDanceChain,
    playlistTracksOpen,
    rightDanceChain,
    rightIdleChain,
    scaredDanceChain,
    scaredIdleChain,
    searchTracksOpen,
  ]);
};
