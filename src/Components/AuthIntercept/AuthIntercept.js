import { useEffect, useState } from "react";

export default function AuthIntercept({ children }) {
  const [pass, setPass] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");
    if (error || (code && state)) {
      window.opener.spotifyCallback({ code, state, error });
    } else {
      setPass(true);
    }
  }, []);

  return <>{pass && children}</>;
}
