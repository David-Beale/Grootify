export default function Ring() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]}>
      <ringBufferGeometry args={[75, 78, 60, 1]} />
      <meshBasicMaterial color="chartreuse" />
    </mesh>
  );
}
