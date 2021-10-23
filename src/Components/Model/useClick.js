import { useEffect, useMemo, useRef } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useClick = () => {
  const click = useStore((state) => state.click);
  const toggle = useRef(true);

  const hitChain = useMemo(
    () => [
      {
        animation: "stunned",
      },
      {
        animation: "gettingUp",
      },
      {
        animation: "angry",
      },
    ],
    []
  );
  const danceChain = useMemo(
    () => [
      {
        animation: "hipHop1",
      },
    ],
    []
  );

  useEffect(() => {
    if (!click) return;
    if (toggle.current) {
      model.setNextAnimation({ chain: hitChain });
    } else {
      model.setNextAnimation({ chain: danceChain });
    }
    toggle.current = !toggle.current;
  }, [click, danceChain, hitChain]);
};
