import { useEffect, useMemo, useRef } from "react";
import { AudioAnalyser } from "three";
import { _VS } from "./shaders/vs";
import { _FS } from "./shaders/fs";
import { useFrame } from "@react-three/fiber";

export default function Shader({ sound }) {
  const shader = useRef();

  const uniforms = useMemo(() => {
    return {
      resolution: { value: 175 },
      data: { value: Array(40).fill(0) },
      time: { value: 0 },
    };
  }, []);

  const analyzer = useRef();
  const data = useRef();

  useEffect(() => {
    analyzer.current = new AudioAnalyser(sound.current, 256);
  }, [sound]);

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
    <>
      <mesh position={[0, 40, -100]} renderOrder={0}>
        <planeBufferGeometry args={[340, 175]} />
        <shaderMaterial
          ref={shader}
          uniforms={uniforms}
          vertexShader={_VS}
          fragmentShader={_FS}
        ></shaderMaterial>
      </mesh>
    </>
  );
}
