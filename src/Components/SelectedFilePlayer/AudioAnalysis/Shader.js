import { useMemo, useRef } from "react";
import { _VS } from "./shaders/vs";
import { _FS } from "./shaders/fs";
import { useFrame } from "@react-three/fiber";

export default function Shader({ analyzer }) {
  const shader = useRef();

  const uniforms = useMemo(() => {
    return {
      resolution: { value: 175 },
      data: { value: Array(20).fill(0) },
      time: { value: 0 },
    };
  }, []);

  const data = useRef();

  useFrame((state) => {
    if (analyzer.current) {
      data.current = analyzer.current.getFrequencyData();
      const uniform = [];
      let leftCounter = 9;
      let rightCounter = 10;
      for (let i = 0; i < 20; i++) {
        let index;
        if (i % 2 === 0) {
          index = leftCounter;
          leftCounter--;
        } else {
          index = rightCounter;
          rightCounter++;
        }
        uniform[index] = data.current[i * 4] / 255;
      }
      shader.current.uniforms.data.value = uniform;
      shader.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 11, -100]}>
      <planeBufferGeometry args={[340, 130]} />
      <shaderMaterial
        ref={shader}
        uniforms={uniforms}
        vertexShader={_VS}
        fragmentShader={_FS}
      />
    </mesh>
  );
}
