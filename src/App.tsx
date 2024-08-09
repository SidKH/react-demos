import * as THREE from "three";
import { useMemo } from "react";
import { Canvas, GroupProps } from "@react-three/fiber";
import { Float, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import "./App.css";

export default function App() {
  return (
    <Canvas shadows={true} camera={{ position: [0, 0, 10] }}>
      <color attach="background" args={["black"]} />
      <Stars saturation={0} count={1000} speed={1} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        <Atom />
      </Float>
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.8} />
      </EffectComposer>
    </Canvas>
  );
}

function Atom(props: GroupProps) {
  return (
    <group {...props} rotation={[-0.6, 0, 0]}>
      <Tube rotation={[Math.PI / 2, 0, 0]} />
      <Tube rotation={[Math.PI / 3, Math.PI / 6, Math.PI / 4]} />
      <Tube rotation={[Math.PI / 3, -Math.PI / 6, -Math.PI / 4]} />
      <Sphere args={[0.55, 64, 64]} castShadow receiveShadow>
        <meshStandardMaterial emissive="#61DAFB" emissiveIntensity={5} />
      </Sphere>
    </group>
  );
}

function Tube({
  rotation,
  position,
}: {
  rotation?: [number, number, number];
  position?: [number, number, number];
}) {
  const tubeGeometry = useMemo(() => {
    const points = new THREE.EllipseCurve(
      0, // center x
      0, // center y
      3, // x radius
      1.15, // y radius
      0, // start angle
      2 * Math.PI, // end angle
      false, // counterclockwise
      0 // rotation
    ).getPoints(100); // 100 points
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    return new THREE.TubeGeometry(curve, 100, 0.2, 16, true);
  }, []);

  return (
    <mesh
      geometry={tubeGeometry}
      castShadow
      receiveShadow
      rotation={rotation}
      position={position}
    >
      <meshStandardMaterial emissive="#61DAFB" />
    </mesh>
  );
}
