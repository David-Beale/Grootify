import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Border1, Border2, Container, Text } from "./LoaderStyle";

export default function Loader({ loaded, setLoaded }) {
  const { active, progress } = useProgress();
  const activeRef = useRef();

  useEffect(() => {
    activeRef.current = active;
    if (active === false && progress > 0) {
      setTimeout(() => {
        if (!activeRef.current) setLoaded(true);
      }, 5000);
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
