import { useRef } from "react";
import { useStore } from "../../Store/store";
import { Button, Input } from "../WelcomeButtonsStyle";

export default function SelectSong() {
  const setFile = useStore((state) => state.setFile);
  const setMode = useStore((state) => state.setMode);

  const inputRef = useRef();
  const onClick = () => {
    inputRef.current.click();
  };
  const onChangeHandler = (e) => {
    if (!e.target.files[0]) return;
    const file = URL.createObjectURL(e.target.files[0]);
    setFile(file);
    setMode("file");
  };
  return (
    <Button onClick={onClick}>
      Select Song
      <Input
        ref={inputRef}
        type="file"
        name="file"
        accept="audio/*"
        onChange={onChangeHandler}
      ></Input>
    </Button>
  );
}
