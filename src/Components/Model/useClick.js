import { useEffect } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useClick = () => {
  const click = useStore((state) => state.click);

  useEffect(() => {
    if (!click) return;
    model.fallOverChain();
  }, [click]);
};
