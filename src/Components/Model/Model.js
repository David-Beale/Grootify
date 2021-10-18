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
export default function Model({ dead }) {
  const [fbx, setFbx] = useState({});
  const mixer = useRef();
  const actions = useRef({});
  const currentAction = useRef();

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
    if (!dead) return;
    die();
    // if (toggle) die();
    // else dance();
    toggle = !toggle;
  }, [dead]);

  useEffect(() => {
    loader.load(HipHopDancing, (fbx) => {
      fbx.scale.setScalar(0.02);
      fbx.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
      actions.current["hipHop1"] = action;
      action.name = "hipHop1";
      setFbx(fbx);
      for (const name in animations) {
        loadAnimation(name, animations[name]);
      }
      currentAction.current = action;
    });
  }, [loadAnimation]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  const die = () => {
    console.log("die");
    const action = actions.current["Stunned"];
    // mixer.current.stopAllAction();
    action.reset();
    action.setEffectiveTimeScale(1.0);
    action.setEffectiveWeight(1.0);
    action.crossFadeFrom(currentAction.current, 0.5);
    // currentAction.current.stop();
    // action.fadeIn(0.5);
    action.play();
    currentAction.current = action;
    console.log("currentAction now die");

    mixer.current.addEventListener("finished", standUp);
  };
  const standUp = () => {
    console.log("standup");
    mixer.current.removeEventListener("finished", standUp);
    const action = actions.current["GettingUp"];
    // mixer.current.stopAllAction();
    action.reset();
    action.setEffectiveTimeScale(1.0);
    action.setEffectiveWeight(1.0);
    console.log(currentAction.current.name);
    action.crossFadeFrom(currentAction.current, 0.5);
    // action.fadeIn(0.5);
    action.play();
    action.loop = THREE.LoopOnce;
    action.clampWhenFinished = true;
    currentAction.current = action;

    mixer.current.addEventListener("finished", angry);
  };
  const angry = () => {
    mixer.current.removeEventListener("finished", angry);
    const action = actions.current["Angry"];
    // mixer.current.stopAllAction();
    action.reset();
    action.setEffectiveTimeScale(1.0);
    action.setEffectiveWeight(1.0);
    action.crossFadeFrom(currentAction.current, 0.5);
    // currentAction.current.stop();
    // action.fadeIn(0.5);
    action.play();
    currentAction.current = action;
    // mixer.current.addEventListener("finished", dance);
  };
  const dance = () => {
    mixer.current.removeEventListener("finished", dance);
    const action = actions.current["hipHop1"];
    // mixer.current.stopAllAction();
    action.reset();
    action.setEffectiveTimeScale(1.0);
    action.setEffectiveWeight(1.0);
    action.crossFadeFrom(currentAction.current, 0.5);
    // action.fadeIn(0.5);
    action.play();
    currentAction.current = action;
    console.log("currentAction now dance");
  };

  return <primitive object={fbx} position={[0, -20, 0]} />;
}
