import { useStore } from "../../../Store/store";
import { StyledMoodButton } from "./MootButtonStyle";

const map = { 1: "Slow", 2: "Med", 3: "Fast" };
export default function MoodButton({ mood, selected }) {
  const setMood = useStore((state) => state.setMood);

  const onClick = () => {
    setMood(mood);
  };

  return (
    <StyledMoodButton selected={selected} onClick={onClick}>
      {map[mood]}
    </StyledMoodButton>
  );
}
