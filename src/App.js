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
      <Lamborghini scale={0.015} />
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
            <Base color="#A6B9B7" alpha={1} mode="normal" />
            <Depth
              colorA="hotblue"
              colorB="#white"
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
      <OrbitControls enablePan={true} enableZoom={true} />
    </Canvas>
  );
}

function Lamborghini(props) {
  const { scene, nodes, materials } = useGLTF("/lambo.glb");

  useMemo(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        node.receiveShadow = node.castShadow = true;
        if (node.name.startsWith("glass")) node.geometry.computeVertexNormals();
        if (node.name === "silver_001_BreakDiscs_0")
          node.material = applyProps(materials.BreakDiscs.clone(), {
            color: "#ddd"
          });
      }
    });
    nodes["glass_003"].scale.setScalar(2.7);

    applyProps(materials.FrameBlack, {
      metalness: 0.5,
      roughness: 1,
      color: "black"
    });
    applyProps(materials.Chrome, {
      metalness: 1,
      roughness: 0.2,
      color: "#171717"
    });
    applyProps(materials.BreakDiscs, {
      metalness: 0.2,
      roughness: 0.2,
      color: "#171717"
    });
    applyProps(materials.TiresGum, { metalness: 0, color: "#333" });
    applyProps(materials.GreyElements, { metalness: 0, color: "#171717" });
    applyProps(materials.WhiteCar, {
      roughness: 0.0,
      metalness: 0.15,
      color: "#16340B",
      envMapIntensity: 2,
      normalMap: new THREE.CanvasTexture(
        new FlakesTexture(),
        THREE.UVMapping,
        THREE.RepeatWrapping,
        THREE.RepeatWrapping
      ),
      "normalMap-repeat": [40, 40],
      normalScale: [0.04, 0.04]
    });
  }, [nodes, materials]);
  return <primitive object={scene} {...props} />;
}

function Striplight(props) {
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshBasicMaterial color="#788690" toneMapped={false} />
    </mesh>
  );
}

function Ringlight(props) {
  return (
    <mesh {...props}>
      <ringGeometry args={[1, 2, 64]} />
      <meshBasicMaterial color="white" toneMapped={false} />
    </mesh>
  );
}
