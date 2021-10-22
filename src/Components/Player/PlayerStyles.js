import styled from "styled-components";
import { colors } from "../../colors";

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0 0 15px 0 ${colors.spotifyGreen};
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
