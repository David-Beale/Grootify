import styled from "styled-components";
import { colors } from "../../colors";

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 3;
`;

export const styles = {
  bgColor: colors.primaryBackground,
  height: "75px",
  color: colors.primary,
  sliderTrackColor: colors.secondary,
  sliderColor: colors.spotifyGreen,
  sliderHandleColor: colors.primary,
  trackNameColor: colors.primary,
  trackArtistColor: colors.secondary,
};
