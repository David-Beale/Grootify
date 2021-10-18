import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import HipHopDancing from "./files/Hip Hop Dancing.fbx";
import Die from "./files/Brutal Assassination.fbx";
import Angry from "./files/Angry.fbx";
import StandUp from "./files/Stand Up.fbx";
import Stunned from "./files/Stunned.fbx";
import GettingUp from "./files/Getting Up.fbx";

const animations = { Die, Angry, StandUp, Stunned, GettingUp };
const loader = new FBXLoader();
let toggle = true;
const chainLookup = {
  Stunned: "GettingUp",
  GettingUp: "Angry",
};

export default function Model({ clicked }) {
  const [fbx, setFbx] = useState({});
  const mixer = useRef();
  const actions = useRef({});
  const currentAction = useRef();
  const nextAnimation = useRef();
  const animationInProgress = useRef(false);

  const loadAnimation = useCallback((name, file) => {
    loader.load(file, (fbx) => {
      const action = mixer.current.clipAction(fbx.animations[0]);
      if (
        name === "Die" ||
        name === "Stunned" ||
        name === "GettingUp" ||
        name === "StandUp"
      ) {
        action.loop = THREE.LoopOnce;
        action.clampWhenFinished = true;
      }
      action.name = name;
      actions.current[name] = action;
    });
  }, []);

  useEffect(() => {
    loader.load(HipHopDancing, (fbx) => {
      fbx.scale.setScalar(0.02);
      fbx.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
      actions.current["HipHop1"] = action;
      action.name = "HipHop1";
      setFbx(fbx);
      for (const name in animations) {
        loadAnimation(name, animations[name]);
      }
      currentAction.current = action;
    });
  }, [loadAnimation]);

  const runNextAnimation = useCallback(() => {
    if (currentAction.current.name === "GettingUp") {
      animationInProgress.current = false;
    }
    const action = actions.current[nextAnimation.current];
    action.reset();
    action.crossFadeFrom(currentAction.current, 0.5);
    action.play();
    currentAction.current = action;
    nextAnimation.current = chainLookup[nextAnimation.current];
    if (nextAnimation.current) {
      mixer.current.addEventListener("finished", runNextAnimation);
    }
  }, []);

  useEffect(() => {
    if (!clicked || animationInProgress.current) return;
    mixer.current.removeEventListener("finished", runNextAnimation);
    if (toggle) {
      animationInProgress.current = true;
      nextAnimation.current = "Stunned";
      runNextAnimation();
    } else {
      nextAnimation.current = "HipHop1";
      runNextAnimation();
    }
    toggle = !toggle;
  }, [clicked, runNextAnimation]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={fbx} position={[0, -20, 0]} />;
}
