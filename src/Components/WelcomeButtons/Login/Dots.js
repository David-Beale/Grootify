import { useEffect, useState } from "react";

export default function Dots() {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    let t;
    const update = () => {
      t = setTimeout(() => {
        setDots((dots) => {
          if (dots.length === 3) return "";
          if (dots.length === 0) return ".";
          if (dots.length === 1) return "..";
          if (dots.length === 2) return "...";
        });
        update();
      }, 500);
    };
    update();
    return () => {
      clearTimeout(t);
    };
  }, []);
  return <>{dots}</>;
}
