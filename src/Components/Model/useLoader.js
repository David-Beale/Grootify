import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { animations } from "./animations";

const loader = new FBXLoader();

export const useLoader = () => {
  const mixer = useRef();
  const actions = useRef({});
  const currentAction = useRef();
  const chaining = useRef();
  const fadeSpeed = useRef(0.25);

  const [fbx, setFbx] = useState({});

  const loadAnimation = useCallback((name, anim) => {
    const { file, once, blocking, cb } = anim;
    loader.load(file, (fbx) => {
      const action = mixer.current.clipAction(fbx.animations[0]);
      if (once) {
        action.loop = LoopOnce;
        action.clampWhenFinished = true;
      }
      action.name = name;
      action.blocking = blocking;
      action.cb = cb;
      actions.current[name] = action;

      if (name === "hangingIdle") {
        currentAction.current = action;
        action.play();
      }
    });
  }, []);

  useEffect(() => {
    const mainModel = animations["hipHop1"].file;
    loader.load(mainModel, (fbx) => {
      fbx.scale.setScalar(0.02);
      fbx.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });
      mixer.current = new AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      actions.current["hipHop1"] = action;
      action.name = "hipHop1";
      action.blocking = false;
      setFbx(fbx);
      for (const name in animations) {
        if (name === "hipHop1") continue;
        loadAnimation(name, animations[name]);
      }
    });
  }, [loadAnimation]);

  const runNextAnimation = useCallback(() => {
    mixer.current.removeEventListener("finished", runNextAnimation);
    const next = chaining.current.shift();
    if (!next) return;
    const { animation, cb } = next;
    if (cb) cb();
    const action = actions.current[animation];
    action.reset();
    if (currentAction.current) {
      action.crossFadeFrom(currentAction.current, fadeSpeed.current);

      if (currentAction.current.name === "land") {
        fadeSpeed.current = 0.5;
      }
    }
    action.play();
    currentAction.current = action;
    mixer.current.addEventListener("finished", runNextAnimation);
  }, [chaining]);

  const setNextAnimation = useCallback(
    ({ chain, override = false }) => {
      if (!override && currentAction.current.blocking) return;
      if (chain) chaining.current = chain;
      runNextAnimation();
    },
    [runNextAnimation]
  );

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return { fbx, setNextAnimation };
};
