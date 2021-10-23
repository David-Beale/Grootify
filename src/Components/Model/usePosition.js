import { useEffect } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const usePosition = () => {
  const isPlaying = useStore((state) => state.isPlaying);
  const setRunning = useStore((state) => state.setRunning);

  useEffect(() => {
    if (isPlaying && model.pos === "right") {
      const chain = [
        {
          animation: "runLeft",
          cb: () => {
            setRunning("left");
            model.pos = "transitLeft";
          },
        },
        {
          animation: "hipHop1",
          cb: () => {
            model.pos = "left";
          },
        },
      ];
      model.setNextAnimation({ chain, override: true });
    }
  }, [isPlaying, setRunning]);
};
