import * as THREE from "three";
import { memo } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import HipHopDancing from "./files/Hip Hop Dancing.fbx";
import Angry from "./files/Angry.fbx";
import Stunned from "./files/Stunned.fbx";
import GettingUp from "./files/Getting Up.fbx";
import HangingIdle from "./files/HangingIdle.fbx";
import Falling from "./files/Fall.fbx";
import Land from "./files/Land.fbx";
import Waving from "./files/Waving.fbx";

const animations = {
  angry: { file: Angry, once: false },
  stunned: { file: Stunned, once: true },
  gettingUp: { file: GettingUp, once: true },
  hangingIdle: { file: HangingIdle, once: false },
  falling: { file: Falling, once: false },
  land: { file: Land, once: true },
  waving: { file: Waving, once: true },
};
const loader = new FBXLoader();
let toggle = true;
const chainLookup = {
  stunned: "gettingUp",
  gettingUp: "angry",
  land: "waving",
  waving: "angry",
};

export default memo(function Model({ clicked, setLightOn }) {
  const [fbx, setFbx] = useState({});
  const mixer = useRef();
  const actions = useRef({});
  const currentAction = useRef();
  const nextAnimation = useRef();
  const animationInProgress = useRef(false);
  const posRef = useRef();
  const velRef = useRef(0);
  const falling = useRef(false);
  const fadeSpeed = useRef(0.25);

  const runNextAnimation = useCallback(() => {
    mixer.current.removeEventListener("finished", runNextAnimation);
    const action = actions.current[nextAnimation.current];
    action.reset();
    if (currentAction.current) {
      action.crossFadeFrom(currentAction.current, fadeSpeed.current);
      if (currentAction.current.name === "gettingUp") {
        animationInProgress.current = false;
      }
      if (currentAction.current.name === "land") {
        fadeSpeed.current = 0.5;
      }
    }
    action.play();
    currentAction.current = action;
    nextAnimation.current = chainLookup[nextAnimation.current];
    if (nextAnimation.current) {
      mixer.current.addEventListener("finished", runNextAnimation);
    }
  }, []);

  const loadAnimation = useCallback((name, anim) => {
    const { file, once } = anim;
    loader.load(file, (fbx) => {
      const action = mixer.current.clipAction(fbx.animations[0]);
      if (once) {
        action.loop = THREE.LoopOnce;
        action.clampWhenFinished = true;
      }
      action.name = name;
      actions.current[name] = action;
      if (name === "hangingIdle") {
        currentAction.current = action;
        action.play();
      }
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
      actions.current["hipHop1"] = action;
      action.name = "hipHop1";
      setFbx(fbx);
      for (const name in animations) {
        loadAnimation(name, animations[name]);
      }
    });
  }, [loadAnimation]);

  useEffect(() => {
    if (!clicked || animationInProgress.current) return;
    if (toggle) {
      // animationInProgress.current = true;
      falling.current = 1;
      nextAnimation.current = "falling";
      runNextAnimation();
    } else {
      nextAnimation.current = "land";
      runNextAnimation();
    }
    toggle = !toggle;
  }, [clicked, runNextAnimation]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    if (falling.current) {
      velRef.current += 0.01;
      posRef.current.position.y -= velRef.current;
      if (falling.current === 1 && posRef.current.position.y < 20) {
        falling.current = 2;
      }
      if (falling.current === 2 && posRef.current.position.y <= -20) {
        nextAnimation.current = "land";
        falling.current = 3;
        runNextAnimation();
        posRef.current.position.y = -20;
        falling.current = false;
        setLightOn(true);
      }
    }
  });

  return (
    <group ref={posRef} position={[0, 21.5, 0]}>
      <primitive object={fbx} />;
    </group>
  );
});
