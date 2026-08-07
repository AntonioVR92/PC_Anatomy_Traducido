"use client";

// Lights.tsx: Adds all the lights that illuminate the 3D scene. A mix
// of soft ambient light, a general sky light, some directional spotlights,
// and small local point lights to give the model depth and drama.

export function Lights() {
  return (
    <>
      {/* Even, flat light so nothing is pitch black. */}
      <ambientLight intensity={0.9} />
      {/* Soft sky light from above and darker ground light from below. */}
      <hemisphereLight intensity={1} color="#dce9ff" groundColor="#0e1830" />

      {/* Main key light from the front-top-right. */}
      <directionalLight position={[4, 7, 4]} intensity={3.2} color="#ffffff" />
      {/* Cool blue fill light from the back-left. */}
      <directionalLight position={[-5, 2, 5]} intensity={1.4} color="#7fa8ff" />

      {/* Rim lights from the rear that help outline the shape. */}
      <directionalLight position={[-4, 3, -6]} intensity={2.4} color="#4d8dff" />
      <directionalLight position={[4, 1, -5]} intensity={1.5} color="#2fd4ff" />

      {/* Small colored accent lights near the front and bottom. */}
      <pointLight position={[0, 1.5, 2.6]} intensity={6} distance={7} decay={2} color="#4d8dff" />
      <pointLight position={[-2, -0.9, -2]} intensity={3.5} distance={6} decay={2} color="#2fd4ff" />
    </>
  );
}
