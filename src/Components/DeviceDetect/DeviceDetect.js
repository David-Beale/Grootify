import { isBrowser } from "react-device-detect";
import Error from "./Error";

export default function DeviceDetect({ children }) {
  return <>{isBrowser ? children : <Error />}</>;
}
