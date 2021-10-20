import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Border1, Border2, Container, Text } from "./LoaderStyle";

export default function Loader({ loaded, setLoaded }) {
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
      {!loaded && (
        <Container>
          <Text>{Math.round(progress)}%</Text>
          <Border1 />
          <Border2 />
        </Container>
      )}
    </>
  );
}
