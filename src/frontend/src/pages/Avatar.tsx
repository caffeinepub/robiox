import { Button } from "@/components/ui/button";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Save } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as THREE from "three";

const BODY_COLORS = [
  { id: "light", label: "Light", value: "#FFDBAC" },
  { id: "tan", label: "Tan", value: "#C8956C" },
  { id: "brown", label: "Brown", value: "#7D4A2C" },
  { id: "dark", label: "Dark", value: "#3D1C08" },
  { id: "blue", label: "Blue", value: "#5B8DD9" },
  { id: "red", label: "Red", value: "#E02020" },
  { id: "green", label: "Green", value: "#3DBE6C" },
  { id: "yellow", label: "Yellow", value: "#FFD700" },
];

const SHIRTS = [
  { id: "red-shirt", label: "Red Tee", color: "#E02020" },
  { id: "blue-shirt", label: "Blue Tee", color: "#3B82F6" },
  { id: "black-shirt", label: "Black Tee", color: "#1a1a1a" },
  { id: "white-shirt", label: "White Tee", color: "#e0e0e0" },
  { id: "green-shirt", label: "Green Tee", color: "#22C55E" },
  { id: "purple-shirt", label: "Purple Tee", color: "#A855F7" },
];

const PANTS = [
  { id: "black-jeans", label: "Black Jeans", color: "#1a1a2e" },
  { id: "blue-jeans", label: "Blue Jeans", color: "#1e40af" },
  { id: "cargo", label: "Cargo Pants", color: "#4a5240" },
  { id: "white-pants", label: "White Pants", color: "#e0e0e0" },
];

const HATS = [
  { id: "none", label: "None", color: null },
  { id: "top-hat", label: "Top Hat", color: "#1a1a1a" },
  { id: "red-cap", label: "Red Cap", color: "#E02020" },
  { id: "blue-cap", label: "Blue Cap", color: "#3B82F6" },
  { id: "crown", label: "Crown", color: "#FFD700" },
];

type AvatarState = {
  bodyColor: string;
  shirtColor: string;
  pantsColor: string;
  hatColor: string | null;
  hatId: string;
};

function RobloxAvatar({ avatarState }: { avatarState: AvatarState }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });

  const body = new THREE.MeshStandardMaterial({
    color: avatarState.bodyColor,
    roughness: 0.6,
  });
  const shirt = new THREE.MeshStandardMaterial({
    color: avatarState.shirtColor,
    roughness: 0.7,
  });
  const pants = new THREE.MeshStandardMaterial({
    color: avatarState.pantsColor,
    roughness: 0.7,
  });
  const hatMat = avatarState.hatColor
    ? new THREE.MeshStandardMaterial({
        color: avatarState.hatColor,
        roughness: 0.5,
      })
    : null;
  const eyeMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a" });
  const smileMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a" });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Head */}
      <mesh material={body} position={[0, 2.55, 0]} castShadow>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
      </mesh>
      {/* Left Eye */}
      <mesh material={eyeMat} position={[-0.22, 2.62, 0.44]}>
        <boxGeometry args={[0.14, 0.14, 0.04]} />
      </mesh>
      {/* Right Eye */}
      <mesh material={eyeMat} position={[0.22, 2.62, 0.44]}>
        <boxGeometry args={[0.14, 0.14, 0.04]} />
      </mesh>
      {/* Smile */}
      <mesh material={smileMat} position={[0, 2.38, 0.44]}>
        <boxGeometry args={[0.3, 0.07, 0.04]} />
      </mesh>

      {/* Hat */}
      {avatarState.hatId !== "none" && hatMat && (
        <group position={[0, 3.05, 0]}>
          {avatarState.hatId === "top-hat" && (
            <>
              <mesh material={hatMat} position={[0, 0.15, 0]}>
                <boxGeometry args={[0.6, 0.4, 0.6]} />
              </mesh>
              <mesh material={hatMat} position={[0, -0.05, 0]}>
                <boxGeometry args={[0.95, 0.1, 0.95]} />
              </mesh>
            </>
          )}
          {(avatarState.hatId === "red-cap" ||
            avatarState.hatId === "blue-cap") && (
            <>
              <mesh material={hatMat} position={[0, 0.12, 0]}>
                <boxGeometry args={[0.88, 0.28, 0.88]} />
              </mesh>
              <mesh material={hatMat} position={[0, -0.04, 0.52]}>
                <boxGeometry args={[0.5, 0.1, 0.3]} />
              </mesh>
            </>
          )}
          {avatarState.hatId === "crown" && (
            <>
              <mesh material={hatMat} position={[0, 0.12, 0]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
              </mesh>
              {[-0.28, 0, 0.28].map((x) => (
                <mesh key={x} material={hatMat} position={[x, 0.26, 0]}>
                  <boxGeometry args={[0.16, 0.22, 0.18]} />
                </mesh>
              ))}
            </>
          )}
        </group>
      )}

      {/* Neck */}
      <mesh material={body} position={[0, 2.1, 0]}>
        <boxGeometry args={[0.28, 0.22, 0.28]} />
      </mesh>

      {/* Torso */}
      <mesh material={shirt} position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[1.0, 0.9, 0.55]} />
      </mesh>

      {/* Left upper arm */}
      <mesh material={shirt} position={[-0.72, 1.65, 0]} castShadow>
        <boxGeometry args={[0.35, 0.55, 0.38]} />
      </mesh>
      {/* Left forearm */}
      <mesh material={body} position={[-0.72, 1.16, 0]}>
        <boxGeometry args={[0.32, 0.45, 0.34]} />
      </mesh>

      {/* Right upper arm */}
      <mesh material={shirt} position={[0.72, 1.65, 0]} castShadow>
        <boxGeometry args={[0.35, 0.55, 0.38]} />
      </mesh>
      {/* Right forearm */}
      <mesh material={body} position={[0.72, 1.16, 0]}>
        <boxGeometry args={[0.32, 0.45, 0.34]} />
      </mesh>

      {/* Left thigh */}
      <mesh material={pants} position={[-0.27, 0.7, 0]} castShadow>
        <boxGeometry args={[0.4, 0.55, 0.42]} />
      </mesh>
      {/* Left shin */}
      <mesh material={pants} position={[-0.27, 0.18, 0]}>
        <boxGeometry args={[0.36, 0.5, 0.38]} />
      </mesh>
      {/* Left foot */}
      <mesh material={pants} position={[-0.27, -0.12, 0.06]}>
        <boxGeometry args={[0.34, 0.16, 0.5]} />
      </mesh>

      {/* Right thigh */}
      <mesh material={pants} position={[0.27, 0.7, 0]} castShadow>
        <boxGeometry args={[0.4, 0.55, 0.42]} />
      </mesh>
      {/* Right shin */}
      <mesh material={pants} position={[0.27, 0.18, 0]}>
        <boxGeometry args={[0.36, 0.5, 0.38]} />
      </mesh>
      {/* Right foot */}
      <mesh material={pants} position={[0.27, -0.12, 0.06]}>
        <boxGeometry args={[0.34, 0.16, 0.5]} />
      </mesh>
    </group>
  );
}

export default function AvatarPage() {
  const [bodyColor, setBodyColor] = useState(BODY_COLORS[0]);
  const [shirt, setShirt] = useState(SHIRTS[0]);
  const [pants, setPants] = useState(PANTS[0]);
  const [hat, setHat] = useState(HATS[0]);

  const avatarState: AvatarState = {
    bodyColor: bodyColor.value,
    shirtColor: shirt.color,
    pantsColor: pants.color,
    hatColor: hat.color,
    hatId: hat.id,
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-bold mb-1">Avatar Editor</h1>
        <p className="text-muted-foreground mb-8">
          Customize your Robiox character in 3D. Drag to rotate.
        </p>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          {/* 3D Viewer */}
          <div
            className="bg-card border border-border rounded-2xl overflow-hidden"
            style={{ height: 480 }}
          >
            <Canvas
              camera={{ position: [0, 0.5, 5], fov: 45 }}
              shadows
              gl={{ antialias: true }}
            >
              <color attach="background" args={["#0f1118"]} />
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 8, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight
                position={[-5, 2, -3]}
                intensity={0.4}
                color="#4499ff"
              />
              <pointLight
                position={[0, 4, 3]}
                intensity={0.8}
                color="#00a2ff"
              />

              <RobloxAvatar avatarState={avatarState} />

              {/* Ground shadow plane */}
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.35, 0]}
                receiveShadow
              >
                <planeGeometry args={[10, 10]} />
                <shadowMaterial opacity={0.3} />
              </mesh>

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={8}
                maxPolarAngle={Math.PI * 0.75}
                minPolarAngle={Math.PI * 0.1}
                autoRotate={false}
              />
            </Canvas>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6 overflow-y-auto" style={{ maxHeight: 480 }}>
            {/* Body Color */}
            <div>
              <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                Skin Tone
              </h3>
              <div className="flex flex-wrap gap-2">
                {BODY_COLORS.map((color) => (
                  <button
                    type="button"
                    key={color.id}
                    onClick={() => setBodyColor(color)}
                    title={color.label}
                    data-ocid="avatar.body_color.toggle"
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      bodyColor.id === color.id
                        ? "border-primary scale-110 shadow-glow-sm"
                        : "border-transparent hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Shirts */}
            <div>
              <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                Shirt
              </h3>
              <div className="flex flex-wrap gap-2">
                {SHIRTS.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setShirt(s)}
                    data-ocid="avatar.shirt.toggle"
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                      shirt.id === s.id
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1.5 align-middle"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pants */}
            <div>
              <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                Pants
              </h3>
              <div className="flex flex-wrap gap-2">
                {PANTS.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPants(p)}
                    data-ocid="avatar.pants.toggle"
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                      pants.id === p.id
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1.5 align-middle"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hats */}
            <div>
              <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                Hat
              </h3>
              <div className="flex flex-wrap gap-2">
                {HATS.map((h) => (
                  <button
                    type="button"
                    key={h.id}
                    onClick={() => setHat(h)}
                    data-ocid="avatar.hat.toggle"
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                      hat.id === h.id
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                    style={
                      h.color
                        ? {
                            borderColor:
                              hat.id === h.id ? undefined : `${h.color}40`,
                          }
                        : {}
                    }
                  >
                    {h.color && (
                      <span
                        className="inline-block w-3 h-3 rounded-sm mr-1.5 align-middle"
                        style={{ backgroundColor: h.color }}
                      />
                    )}
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => toast.success("Avatar saved!")}
              data-ocid="avatar.save.button"
            >
              <Save className="h-4 w-4 mr-2" /> Save Avatar
            </Button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
