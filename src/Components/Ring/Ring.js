export default function Ring() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -20, 0]}
      renderOrder={3}
    >
      <torusBufferGeometry args={[76, 1, 3, 36]} />
      <meshBasicMaterial color="chartreuse" />
    </mesh>
  );
}
