export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]} receiveShadow>
      <circleBufferGeometry args={[75, 32]} />
      <meshStandardMaterial color="rgb(0, 67, 78)" />
    </mesh>
  );
}
