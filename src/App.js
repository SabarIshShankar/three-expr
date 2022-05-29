import "./styles.css";
import * as THREE from "three";
import { useMemo } from "react";
import { Canvas, applyProps } from "@react-three/fiber";
import {
  useGLTF,
  BakeShadows,
  Environment,
  ContactShadows,
  OrbitCOntrols
} from "@react-three/drei";
import { LayerMaterial, Base, Depth } from "lamina";
import { FlakesTexture } from "three-stdlib";

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-7.5, 0, -7.5], fov: 35 }}
    >
      <spotLight
        position={[0, 15, 0]}
        angle={0.25}
        penumbra={1}
        castShadow
        intensity={6}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.2} />
      <ContactShadows
        resolution={2048}
        frames={1}
        position={[0, -1.16, 0]}
        scale={10}
        blur={0.75}
        opacity={1}
        far={10}
      />
    </Canvas>
  );
}
