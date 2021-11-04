import { Logo } from "./SpotifyLogoStyle";
import image from "./spotifyLogo.png";

export default function SpotifyLogo() {
  const onClick = () => {
    const newWindow = window.open(
      "https://open.spotify.com/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return <Logo onClick={onClick} src={image} alt={"spotify-logo"} />;
}
