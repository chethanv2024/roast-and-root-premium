
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = {
  cup: "#382019",
  cupLight: "#523124",
  coffee: "#8B4E2B",
  gold: "#D6AC6B",
  cream: "#F8E8CE",
  steam: "#FFF3E2",
  foam: "#FFF8EC",
};

const CYCLE_DURATION = 6;

// Shared animation timing keeps the cup and spill synchronized.
function getDropAmount(time) {
  const phase = (time % CYCLE_DURATION) / CYCLE_DURATION;

  if (phase < 0.32 || phase > 0.57) return 0;

  if (phase < 0.39) {
    const t = (phase - 0.32) / 0.07;
    return t * t * (3 - 2 * t);
  }

  if (phase < 0.45) {
    return 1;
  }

  const t = (phase - 0.45) / 0.12;
  return 1 - t * t * (3 - 2 * t);
}

/* -----------------------------------------
   ANIMATED STEAM
------------------------------------------ */

function SteamWisp({ index }) {
  const group = useRef(null);
  const material = useRef(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.035, 0.09, 0),
      new THREE.Vector3(-0.045, 0.18, 0),
      new THREE.Vector3(0.04, 0.28, 0),
      new THREE.Vector3(-0.015, 0.38, 0),
    ]);

    return new THREE.TubeGeometry(curve, 32, 0.012, 8, false);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current || !material.current) return;

    const time = clock.elapsedTime * 0.8 + index * 0.8;
    const cycle = (time % 2.4) / 2.4;

    group.current.position.y = 0.43 + cycle * 0.27;
    group.current.position.x =
      (index - 1) * 0.13 + Math.sin(time * 2.2) * 0.05;

    group.current.rotation.z = Math.sin(time * 1.6) * 0.2;
    group.current.scale.setScalar(0.7 + cycle * 0.5);

    material.current.opacity =
      Math.sin(cycle * Math.PI) * 0.8;
  });

  return (
    <group
      ref={group}
      position={[(index - 1) * 0.13, 0.43, 0.02]}
    >
      <mesh geometry={geometry} renderOrder={10}>
        <meshBasicMaterial
          ref={material}
          color={COLORS.steam}
          transparent
          opacity={0.7}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* -----------------------------------------
   COFFEE BEAN BADGE
------------------------------------------ */

function CoffeeBeanBadge() {
  return (
    <group position={[0, -0.015, 0.323]}>
      <mesh>
        <circleGeometry args={[0.15, 48]} />
        <meshStandardMaterial color={COLORS.gold} />
      </mesh>

      <mesh position={[0, 0, 0.003]}>
        <circleGeometry args={[0.137, 48]} />
        <meshStandardMaterial color={COLORS.cup} />
      </mesh>

      <mesh
        position={[-0.027, 0.025, 0.008]}
        rotation={[0, 0, -0.4]}
        scale={[0.58, 1, 1]}
      >
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color={COLORS.cream} />
      </mesh>

      <mesh
        position={[0.027, 0.025, 0.009]}
        rotation={[0, 0, 0.4]}
        scale={[0.58, 1, 1]}
      >
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color={COLORS.gold} />
      </mesh>

      <mesh position={[0, 0.025, 0.012]}>
        <boxGeometry args={[0.008, 0.09, 0.003]} />
        <meshBasicMaterial color={COLORS.cup} />
      </mesh>

      <mesh position={[0, -0.055, 0.01]}>
        <boxGeometry args={[0.12, 0.006, 0.003]} />
        <meshBasicMaterial color={COLORS.gold} />
      </mesh>

      <mesh position={[0, -0.075, 0.01]}>
        <boxGeometry args={[0.075, 0.004, 0.003]} />
        <meshBasicMaterial color={COLORS.cream} />
      </mesh>
    </group>
  );
}

/* -----------------------------------------
   LATTE ART
------------------------------------------ */

function LatteArt() {
  return (
    <group position={[0, 0.365, 0.015]}>
      <mesh
        position={[0, 0.02, 0]}
        scale={[0.62, 1, 1]}
      >
        <circleGeometry args={[0.105, 32]} />
        <meshBasicMaterial color={COLORS.cream} />
      </mesh>

      {[-1, 0, 1].map((n) => (
        <mesh
          key={n}
          position={[
            n * 0.042,
            0.015 - Math.abs(n) * 0.035,
            0.005,
          ]}
          rotation={[0, 0, n * -0.45]}
          scale={[0.65, 1, 1]}
        >
          <circleGeometry args={[0.052, 24]} />
          <meshBasicMaterial color={COLORS.foam} />
        </mesh>
      ))}

      <mesh position={[0, -0.045, 0.009]}>
        <boxGeometry args={[0.006, 0.065, 0.002]} />
        <meshBasicMaterial color={COLORS.foam} />
      </mesh>
    </group>
  );
}

/* -----------------------------------------
   COFFEE SPILL AND DROPLETS
------------------------------------------ */

function CoffeeSpill() {
  const stream = useRef(null);
  const streamMaterial = useRef(null);
  const droplets = useRef([]);

  const dropletData = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        delay: i * 0.012,
        x: 0.17 + Math.sin(i * 2.4) * 0.13,
        z: 0.23 + Math.cos(i * 1.7) * 0.035,
        speed: 0.65 + (i % 5) * 0.13,
        size: 0.012 + (i % 4) * 0.004,
        side: i % 2 === 0 ? 1 : -1,
      })),
    []
  );

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const cycle = (time % CYCLE_DURATION) / CYCLE_DURATION;

    // Coffee spills during the cup's downward motion.
    const spillStart = 0.345;
    const spillEnd = 0.545;
    const active = cycle >= spillStart && cycle <= spillEnd;

    const progress = THREE.MathUtils.clamp(
      (cycle - spillStart) / (spillEnd - spillStart),
      0,
      1
    );

    if (stream.current && streamMaterial.current) {
      stream.current.visible = active;

      // The stream stretches as coffee pours out.
      stream.current.scale.y = 0.55 + progress * 1.8;
      stream.current.position.x =
        0.19 + Math.sin(time * 13) * 0.025;

      stream.current.rotation.z = Math.sin(time * 9) * 0.12;

      streamMaterial.current.opacity =
        active ? 0.92 * (1 - progress * 0.3) : 0;
    }

    droplets.current.forEach((drop, i) => {
      if (!drop) return;

      const item = dropletData[i];
      const localProgress = progress - item.delay * 3;
      const visible =
        active && localProgress >= 0 && localProgress <= 1;

      drop.visible = visible;

      if (!visible) return;

      const fall = localProgress * item.speed;

      drop.position.x =
        item.x + item.side * fall * 0.16;

      drop.position.y =
        0.28 - fall * 0.72;

      drop.position.z =
        item.z + Math.sin(time * 8 + i) * 0.015;

      drop.rotation.z = time * item.side * 2;

      // Slightly elongate the falling droplets.
      drop.scale.set(
        item.size,
        item.size * (1.2 + fall * 0.6),
        item.size
      );
    });
  });

  return (
    <group>
      {/* Liquid flowing from the right-front rim */}
      <mesh
        ref={stream}
        position={[0.19, 0.245, 0.255]}
        rotation={[0, 0, -0.16]}
        visible={false}
      >
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshStandardMaterial
          ref={streamMaterial}
          color={COLORS.coffee}
          roughness={0.18}
          metalness={0.02}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Individual coffee droplets */}
      {dropletData.map((item, i) => (
        <mesh
          key={i}
          ref={(node) => {
            droplets.current[i] = node;
          }}
          position={[item.x, 0.28, item.z]}
          visible={false}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color={COLORS.coffee}
            roughness={0.18}
            metalness={0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -----------------------------------------
   ANIMATED COFFEE CUP
------------------------------------------ */

function CoffeeCup() {
  const cup = useRef(null);
  const { pointer } = useThree();

  useFrame(({ clock }, delta) => {
    if (!cup.current) return;

    const time = clock.elapsedTime;
    const phase = (time % CYCLE_DURATION) / CYCLE_DURATION;
    const drop = getDropAmount(time);

    // Gentle rotation responds to the mouse.
    const targetY =
      Math.sin(time * 0.65) * 0.12 + pointer.x * 0.18;

    const targetX =
      Math.sin(time * 0.8) * 0.035 - pointer.y * 0.07;

    // Tilt the cup forward as it drops.
    const tilt =
      THREE.MathUtils.smoothstep(phase, 0.32, 0.40) *
      (1 - THREE.MathUtils.smoothstep(phase, 0.45, 0.57));

    cup.current.rotation.y = THREE.MathUtils.damp(
      cup.current.rotation.y,
      targetY,
      3,
      delta
    );

    cup.current.rotation.x = THREE.MathUtils.damp(
      cup.current.rotation.x,
      targetX,
      3,
      delta
    );

    cup.current.rotation.z = THREE.MathUtils.damp(
      cup.current.rotation.z,
      -tilt * 0.34,
      5,
      delta
    );

    // Small downward movement during the spill.
    const targetHeight =
      Math.sin(time * 1.5) * 0.025 - drop * 0.13;

    cup.current.position.y = THREE.MathUtils.damp(
      cup.current.position.y,
      targetHeight,
      5,
      delta
    );
  });

  return (
    <group ref={cup} scale={1.05}>
      {/* Saucer */}
      <mesh
        position={[0, -0.43, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <cylinderGeometry args={[0.48, 0.53, 0.055, 64]} />
        <meshStandardMaterial
          color={COLORS.cream}
          roughness={0.28}
        />
      </mesh>

      {/* Gold saucer rim */}
      <mesh
        position={[0, -0.397, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.44, 0.009, 12, 64]} />
        <meshStandardMaterial
          color={COLORS.gold}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>

      {/* Main ceramic cup */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.245, 0.75, 64]} />
        <meshStandardMaterial
          color={COLORS.cup}
          roughness={0.22}
          metalness={0.06}
        />
      </mesh>

      {/* Front highlight */}
      <mesh
        position={[0, 0.02, 0.19]}
        scale={[0.85, 1.4, 0.28]}
      >
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial
          color={COLORS.cupLight}
          roughness={0.25}
        />
      </mesh>

      {/* Gold band */}
      <mesh position={[0, -0.29, 0]}>
        <torusGeometry args={[0.278, 0.009, 12, 64]} />
        <meshStandardMaterial
          color={COLORS.gold}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Cup lip */}
      <mesh position={[0, 0.375, 0]}>
        <torusGeometry args={[0.34, 0.017, 16, 64]} />
        <meshStandardMaterial
          color={COLORS.gold}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.315, 0.315, 0.018, 64]} />
        <meshStandardMaterial
          color={COLORS.coffee}
          roughness={0.25}
        />
      </mesh>

      <LatteArt />
      <CoffeeBeanBadge />

      {/* Handle */}
      <mesh position={[0.375, 0.025, 0]} castShadow>
        <torusGeometry args={[0.145, 0.042, 24, 64]} />
        <meshStandardMaterial
          color={COLORS.cup}
          roughness={0.22}
        />
      </mesh>

      {/* Gold handle detail */}
      <mesh
        position={[0.385, 0.025, 0.008]}
        scale={[0.78, 0.78, 0.8]}
      >
        <torusGeometry args={[0.145, 0.009, 12, 48]} />
        <meshStandardMaterial
          color={COLORS.gold}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Coffee spill follows the cup's motion */}
      <CoffeeSpill />

      {/* Steam */}
      {[0, 1, 2].map((index) => (
        <SteamWisp key={index} index={index} />
      ))}
    </group>
  );
}

/* -----------------------------------------
   LIGHTING AND SCENE
------------------------------------------ */

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={2.5}
        castShadow
      />

      <pointLight
        position={[-3, 2, 4]}
        intensity={1.5}
        color="#E8B77C"
      />

      <pointLight
        position={[2, 1, -3]}
        intensity={0.8}
        color="#F6DDC0"
      />

      <Float
        speed={1.5}
        rotationIntensity={0.08}
        floatIntensity={0.2}
        floatingRange={[-0.04, 0.04]}
      >
        <CoffeeCup />
      </Float>

      <ContactShadows
        position={[0, -0.51, 0]}
        opacity={0.35}
        scale={2.5}
        blur={2.5}
        far={1.6}
      />

      <Environment preset="studio" />
    </>
  );
}

/* -----------------------------------------
   EXPORTED CANVAS
------------------------------------------ */

export default function BeanCanvas() {
  return (
    <div className="bean-canvas coffee-cup-canvas">
      <Canvas
        camera={{
          position: [0, 0.15, 2.7],
          fov: 38,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
