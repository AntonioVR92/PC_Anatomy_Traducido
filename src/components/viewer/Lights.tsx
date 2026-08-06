"use client";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={1} color="#dce9ff" groundColor="#0e1830" />

      <directionalLight position={[4, 7, 4]} intensity={3.2} color="#ffffff" />
      <directionalLight position={[-5, 2, 5]} intensity={1.4} color="#7fa8ff" />

      <directionalLight position={[-4, 3, -6]} intensity={2.4} color="#4d8dff" />
      <directionalLight position={[4, 1, -5]} intensity={1.5} color="#2fd4ff" />

      <pointLight position={[0, 1.5, 2.6]} intensity={6} distance={7} decay={2} color="#4d8dff" />
      <pointLight position={[-2, -0.9, -2]} intensity={3.5} distance={6} decay={2} color="#2fd4ff" />
    </>
  );
}
