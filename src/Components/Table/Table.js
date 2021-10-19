import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import djglb from "./djglb.glb";

export default function Table() {
  const group = useRef();
  const { nodes } = useGLTF(djglb);
  return (
    <group
      ref={group}
      scale={[0.026, 0.026, 0.026]}
      position={[56, -20, 5]}
      rotation={[0, 2.8, 0]}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        position={[-0.12, 185.8, -29.12]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(djglb);
