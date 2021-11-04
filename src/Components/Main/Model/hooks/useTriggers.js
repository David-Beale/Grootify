import { useEffect, useRef } from "react";
import { useStore } from "../../../Store/store";
import model from "../classes/modelClass";

export const useTriggers = () => {
  const isLoadedRef = useRef(false);
  const isPlaying = useStore((state) => state.isPlaying);
  const mood = useStore((state) => state.mood);
  const playlistTracksOpen = useStore((state) => state.playlistTracksOpen);
  const searchTracksOpen = useStore((state) => state.searchTracksOpen);
  const isLoaded = useStore((state) => state.isLoaded);
  const mode = useStore((state) => state.mode);

  useEffect(() => {
    if (mode === "file") {
      model.setIsPlaying(true);
      const pos = model.positionManager.pos;
      if (pos === "right" || pos === "transit") {
        model.setChain("leftDanceChain");
      } else model.setChain("danceChain");
    }
  }, [mode]);

  useEffect(() => {
    isLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    model.setIsPlaying(isPlaying);
    if (!isLoadedRef.current) return;
    const pos = model.positionManager.pos;
    const menuOpen = playlistTracksOpen || searchTracksOpen;
    if (isPlaying) {
      if (!menuOpen) {
        if (pos === "right" || pos === "transit") {
          model.setChain("leftDanceChain");
        } else model.setChain("danceChain");
      } else {
        if (pos === "left" || pos === "transit") {
          model.setChain("scaredDanceChain");
        } else model.setChain("danceChain");
      }
    } else {
      if (!menuOpen) {
        if (pos === "right") model.setChain("idleChain");
        else if (pos === "transit") model.setChain("rightIdleChain");
        else model.setChain("angryChain");
      } else {
        if (pos === "left" || pos === "transit") {
          model.setChain("scaredIdleChain");
        } else model.setChain("idleChain");
      }
    }
  }, [isPlaying, playlistTracksOpen, searchTracksOpen]);

  useEffect(() => {
    if (mood === null) return;
    if (mood === "thriller") {
      model.danceManager.setMood(2);
      const pos = model.positionManager.pos;
      if (pos === "right" || pos === "transit") {
        model.setChain("leftThrillerChain");
      } else model.setChain("thrillerChain");
      return;
    }
    model.danceManager.setMood(mood);
    if (model.danceManager.isDancing) model.setChain("danceChain");
  }, [mood]);
};
