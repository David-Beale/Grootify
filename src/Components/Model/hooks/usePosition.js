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
    if (model.danceManager.isDancing) model.setChain("danceChain");
  }, [mood]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isLoadedRef.current) return;
    const pos = model.positionManager.pos;
    if (isPlaying) {
      if (!menuOpenRef.current) {
        if (pos === "right" || pos === "transit") {
          model.setChain("leftDanceChain");
        } else model.setChain("danceChain");
      } else {
        if (pos === "left" || pos === "transit") {
          model.setChain("rightDanceChain");
        } else model.setChain("danceChain");
      }
    } else {
      if (!menuOpenRef.current) {
        if (pos === "right") model.setChain("idleChain");
        else if (pos === "transit") model.setChain("rightIdleChain");
        else model.setChain("angryChain");
      } else {
        if (pos === "left" || pos === "transit") {
          model.setChain("rightIdleChain");
        } else model.setChain("idleChain");
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    const pos = model.positionManager.pos;
    menuOpenRef.current = playlistTracksOpen || searchTracksOpen;
    if (isPlayingRef.current) {
      if (menuOpenRef.current && pos === "right") model.setChain("danceChain");
      else if (playlistTracksOpen) model.setChain("scaredDanceChain");
      else if (searchTracksOpen) model.setChain("rightDanceChain");
      else if (pos === "right" || pos === "transit") {
        model.setChain("leftDanceChain");
      } else model.setChain("danceChain");
    } else {
      if (pos === "right") model.setChain("idleChain");
      else if (playlistTracksOpen) model.setChain("scaredIdleChain");
      else model.setChain("rightIdleChain");
    }
  }, [playlistTracksOpen, searchTracksOpen]);
};
