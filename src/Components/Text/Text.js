import { Text } from "@react-three/drei";
import font from "./aAttackGraffiti.ttf";

export default function Logo() {
  return (
    <Text
      font={font}
      fontSize={7}
      color="lime"
      position={[0, 15, -20]}
      letterSpacing={0.3}
      outlineColor={"darkgreen"}
      outlineBlur={0.5}
      outlineWidth={0.1}
      strokeColor="green"
      strokeWidth={0.21}
    >
      Grootify
    </Text>
  );
}
