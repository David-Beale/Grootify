import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useStore } from "../Store/store";
import { Border1, Border2, Container, Text } from "./LoaderStyle";

export default function Loader() {
  const isLoaded = useStore((state) => state.isLoaded);
  const setLoaded = useStore((state) => state.setLoaded);
  const { active, progress } = useProgress();

  useEffect(() => {
    if (active === false && progress > 0) {
      setLoaded(true);
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
