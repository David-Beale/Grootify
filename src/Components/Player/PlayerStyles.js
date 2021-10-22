import styled from "styled-components";
import { colors } from "../../colors";

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const styles = {
  bgColor: "rgb(26, 26, 26)",
  height: "75px",
  color: colors.primary,
  sliderTrackColor: colors.secondary,
  sliderColor: colors.spotifyGreen,
  sliderHandleColor: colors.primary,
  trackNameColor: colors.primary,
  trackArtistColor: colors.secondary,
};
