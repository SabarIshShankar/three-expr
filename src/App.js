import "./styles.css";
import * as THREE from "three";
import { useMemo } from "react";
import { Canvas, applyProps } from "@react-three/fiber";
import {
  useGLTF,
  BakeShadows,
  Environment,
  ContactShadows,
  OrbitControls
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

      <Environment background resolution={512}>
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, -4]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, -2]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, 2]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, 4]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Striplight
          rotation-y={Math.PI / 2}
          position={[-10, 2, 0]}
          scale={[20, 1, 1]}
        />
        <Striplight
          rotation-y={-Math.PI / 2}
          position={[10, 2, 0]}
          scale={[20, 1, 1]}
        />

        <Ringlight
          scale={2}
          position={[10, 5, 10]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />

        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Base color="#444" alpha={1} mode="normal" />
            <Depth
              colorA="hotpink"
              colorB="#447"
              alpha={0.5}
              mode="normal"
              near={0}
              far={300}
              origin={[100, 100, 100]}
            />
          </LayerMaterial>
        </mesh>
      </Environment>
      <BakeShadows />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2.4}
      />
    </Canvas>
  );
}
