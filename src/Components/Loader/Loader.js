import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";
import { Border1, Border2, Container, Text } from "./LoaderStyle";

export default function Loader() {
  const isLoaded = useStore((state) => state.isLoaded);
  const setLoaded = useStore((state) => state.setLoaded);
  const { active, progress } = useProgress();
  const activeRef = useRef();
  const idRef = useRef();

  useEffect(() => {
    activeRef.current = active;
    if (active === false && progress > 0) {
      const id = Date.now();
      idRef.current = id;
      setTimeout(() => {
        if (idRef.current !== id || activeRef.current) return;
        setLoaded(true);
      }, 3000);
    }
  }, [progress, active, setLoaded]);

  return (
    <>
      {!isLoaded && (
        <Container>
          <Text>{Math.round(progress)}%</Text>
          <Border1 />
          <Border2 />
        </Container>
      )}
    </>
  );
}
