import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useClick = () => {
  const click = useStore((state) => state.click);
  const toggle = useRef(true);

  useEffect(() => {
    if (!click) return;
    if (toggle.current) {
      model.setNextAnimation({
        chain: [
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
      });
    } else {
      model.setNextAnimation({
        chain: [
          {
            animation: "hipHop1",
          },
        ],
      });
    }
    toggle.current = !toggle.current;
  }, [click]);
};
