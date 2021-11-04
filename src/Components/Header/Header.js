import { useStore } from "../Store/store";
import { HeaderContainer } from "./HeaderStyle";
import Search from "./Search/Search";
import SpotifyLogo from "./SpotifyLogo/SpotifyLogo";

export default function Header() {
  const interfaceOpen = useStore((state) => state.interfaceOpen);
  return (
    <HeaderContainer open={interfaceOpen}>
      <SpotifyLogo />
      <Search />
    </HeaderContainer>
  );
}
