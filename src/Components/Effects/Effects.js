import React, { useRef, useEffect, useState } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "./CustomBloom";

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass });

export default function Effects({ children, bloomRef }) {
  const composer = useRef();
  const { gl, size, camera } = useThree();
  const [scene, setScene] = useState();
  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );
  useFrame(() => {
    if (!scene || !composer.current) return;
    composer.current.render();
  }, 1);

  const bloom = {
    strength: 0,
    radius: 0.5,
    threshold: 0.1,
  };
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass
          ref={bloomRef}
          attachArray="passes"
          args={[undefined, bloom.strength, bloom.radius, bloom.threshold]}
        />
      </effectComposer>
    </>
  );
}
