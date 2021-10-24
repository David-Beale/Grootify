import { useCallback } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useChains = () => {
  const setRunning = useStore((state) => state.setRunning);

  const leftDanceChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "runLeft",
            cb: () => {
              setRunning("left");
              model.pos = "transit";
            },
          },
          {
            animation: "hipHop1",
            cb: () => {
              model.pos = "left";
            },
          },
        ],
        override: true,
      }),
    [setRunning]
  );
  const danceChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "hipHop1",
          },
        ],
        override: true,
      }),
    []
  );
  const rightDanceChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "runRight",
            cb: () => {
              setRunning("right");
              model.pos = "transit";
            },
          },
          {
            animation: "hipHop1",
            cb: () => {
              model.pos = "right";
            },
          },
        ],
        override: true,
      }),
    [setRunning]
  );
  const rightIdleChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "runRight",
            cb: () => {
              setRunning("right");
              model.pos = "transit";
            },
          },
          {
            animation: "idle",
            cb: () => {
              model.pos = "right";
            },
          },
        ],
        override: true,
      }),
    [setRunning]
  );
  const idleChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "idle",
          },
        ],
        override: true,
      }),
    []
  );
  const angryChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "angry",
          },
        ],
        override: true,
      }),
    []
  );
  const scaredDanceChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "scared",
            cb: () => {
              setRunning("right");
              model.pos = "transit";
            },
          },
          {
            animation: "hipHop1",
            cb: () => {
              model.pos = "right";
            },
          },
        ],
        override: true,
      }),
    [setRunning]
  );
  const scaredIdleChain = useCallback(
    () =>
      model.setNextAnimation({
        chain: [
          {
            animation: "scared",
            cb: () => {
              setRunning("right");
              model.pos = "transit";
            },
          },
          {
            animation: "idle",
            cb: () => {
              model.pos = "right";
            },
          },
        ],
        override: true,
      }),
    [setRunning]
  );

  return {
    leftDanceChain,
    danceChain,
    rightDanceChain,
    idleChain,
    rightIdleChain,
    angryChain,
    scaredDanceChain,
    scaredIdleChain,
  };
};
