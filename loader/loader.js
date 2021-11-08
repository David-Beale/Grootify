/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("helpers/three.min.js");
importScripts("helpers/FBXLoader.js");
importScripts("helpers/fflate.min.js");
importScripts("helpers/NURBSCurve.js");
importScripts("helpers/NURBSUtils.js");

const loader = new FBXLoader();

self.onmessage = (e) => {
  const { name, type } = e.data;
  loader.load(`files/${type}/${name}.fbx`, (fbx) => {
    const string = JSON.stringify(fbx.animations[0]);
    const parsed1 = JSON.parse(string);
    self.postMessage({ anim: parsed1, type });
  });
};
