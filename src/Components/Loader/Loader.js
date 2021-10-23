import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useStore } from "../Store/store";
import { Border1, Border2, Container, Text } from "./LoaderStyle";

export default function Loader() {
  const isLoaded = useStore((state) => state.isLoaded);
  const setPreLoaded = useStore((state) => state.setPreLoaded);
  const { active, progress } = useProgress();

  useEffect(() => {
    if (active === false && progress > 0) {
      setPreLoaded();
    }
  }, [progress, active, setPreLoaded]);

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
