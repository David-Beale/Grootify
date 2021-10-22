import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { colors } from "../../colors";

export const Container = styled.div`
  height: 50px;
  width: 50px;
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
  z-index: 2;
`;
export const StyledLogoutIcon = styled(LogoutIcon)`
  color: ${colors.primary};
`;
