import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const sphereColor = (angle) => {
  let r, g, b;
  r = parseInt((Math.sin(angle - Math.PI) + 1) * 128);
  g = parseInt((Math.sin(angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128);
  b = parseInt((Math.sin(angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128);
  return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
};

export default function Sphere({ index, position, angle, data }) {
  const mesh = useRef();

  function adjustScale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  const color = useMemo(() => {
    return sphereColor(angle);
  }, [angle]);
  useFrame(() => {
    if (data.current) {
      mesh.current.scale.x =
        mesh.current.scale.y =
        mesh.current.scale.z =
          adjustScale(data.current[index * 2], 0, 255, 0.25, 1.5);
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <sphereGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}
