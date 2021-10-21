export const makeid = (length) => {
  const result = [];
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    const char = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    result.push(char);
  }
  return result.join("");
};
function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function pkce_challenge_from_verifier(v) {
  const hashed = await sha256(v);
  return base64urlencode(hashed);
}

// helper function to generate a random number
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const buildParams = (parameters) => {
  const result = [];
  const params = Object.keys(parameters);
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const value = parameters[param];
    if (i > 0) result.push("&");
    result.push(param, "=", value);
  }
  return result.join("");
};
export const popupWindow = (url, windowName, win, w, h) => {
  const y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
  const x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
  return win.open(
    url,
    windowName,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );
};
