import { useCallback, useState } from "react";
import { Tooltip } from "@mui/material";

import icon from "./danceIcon.png";
import MoodButton from "./MoodButton/MoodButton";
import { ButtonsContainer, Container, StyledIcon } from "./MoodButtonsStyle";
import { useStore } from "../../Store/store";

const moods = [1, 2, 3];
export default function MoodButtons() {
  const [open, setOpen] = useState(false);
  const storeMood = useStore((state) => state.mood);

  const onHover = useCallback(() => {
    setOpen(true);
  }, []);
  const onHoverOff = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Container
        open={open}
        onPointerEnter={onHover}
        onPointerLeave={onHoverOff}
      >
        <Tooltip title="Tempo" placement="right">
          <StyledIcon src={icon} />
        </Tooltip>
        <ButtonsContainer open={open}>
          {moods.map((mood) => (
            <MoodButton key={mood} mood={mood} selected={mood === storeMood} />
          ))}
        </ButtonsContainer>
      </Container>
    </>
  );
}
