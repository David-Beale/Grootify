import { useEffect, useMemo, useRef } from "react";
import { useStore } from "../Store/store";

export const useClick = (setNextAnimation) => {
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
      setNextAnimation({ chain: hitChain });
    } else {
      setNextAnimation({ chain: danceChain });
    }
    toggle.current = !toggle.current;
  }, [click, setNextAnimation, danceChain, hitChain]);
};
