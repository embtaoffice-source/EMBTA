import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Communication3DProps {
  className?: string;
}

export const Communication3D: React.FC<Communication3DProps> = ({
  className = 'w-full h-full absolute inset-0',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 65);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xcee5ff, 0.8);
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x1b873f, 4, 100);
    greenLight.position.set(0, 0, 20);
    scene.add(greenLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 4. Central Beacon (EMBTA Hub)
    const centerGeometry = new THREE.IcosahedronGeometry(3.5, 2);
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: 0x102a43,
      emissive: 0x1b873f,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
    rootGroup.add(centerMesh);

    // Central Wireframe Shell
    const wireframeGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x24a14d,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    rootGroup.add(wireframeMesh);

    // Radiating concentric pulse rings
    const ringGeo = new THREE.RingGeometry(6, 6.2, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1b873f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.5;
    rootGroup.add(ring1);

    const ring2 = ring1.clone();
    ring2.scale.setScalar(1.6);
    ring2.rotation.y = Math.PI / 3;
    rootGroup.add(ring2);

    // 5. 4 Orbiting Satellite Nodes (Message, Business, Community, Connection)
    const satellitesGroup = new THREE.Group();
    rootGroup.add(satellitesGroup);

    const satelliteGeometry = new THREE.SphereGeometry(1.4, 16, 16);
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0xcee5ff,
      emissive: 0x16334a,
      roughness: 0.3,
      metalness: 0.7,
    });

    const satellitePositions = [
      new THREE.Vector3(-22, 10, 5),   // Message
      new THREE.Vector3(22, 12, -4),   // Business
      new THREE.Vector3(18, -14, 8),   // Community
      new THREE.Vector3(-18, -12, -6), // Connection
    ];

    const satellites: THREE.Mesh[] = [];
    satellitePositions.forEach((pos) => {
      const sat = new THREE.Mesh(satelliteGeometry, satelliteMat);
      sat.position.copy(pos);
      satellitesGroup.add(sat);
      satellites.push(sat);

      // Ray lines connecting satellite to center
      const rayPoints = [new THREE.Vector3(0, 0, 0), pos];
      const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
      const rayMat = new THREE.LineBasicMaterial({
        color: 0x24a14d,
        transparent: true,
        opacity: 0.4,
      });
      const rayLine = new THREE.Line(rayGeo, rayMat);
      satellitesGroup.add(rayLine);
    });

    // 6. Signal particles streaming between nodes
    const streamParticleCount = 80;
    const streamGeo = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(streamParticleCount * 3);

    for (let i = 0; i < streamParticleCount * 3; i += 3) {
      const satIdx = (i / 3) % 4;
      const t = Math.random();
      const pos = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(0, 0, 0),
        satellitePositions[satIdx],
        t
      );
      streamPositions[i] = pos.x + (Math.random() - 0.5) * 2;
      streamPositions[i + 1] = pos.y + (Math.random() - 0.5) * 2;
      streamPositions[i + 2] = pos.z + (Math.random() - 0.5) * 2;
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    const streamMat = new THREE.PointsMaterial({
      color: 0xcee5ff,
      size: 0.8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    satellitesGroup.add(streamPoints);

    // 7. Mouse drift and animation loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (event.clientX - halfX) * 0.0006;
      mouseY = (event.clientY - halfY) * 0.0006;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        rootGroup.rotation.y = elapsed * 0.1 + targetX * 1.8;
        rootGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.1 + targetY * 1.8;

        wireframeMesh.rotation.y = -elapsed * 0.15;
        wireframeMesh.rotation.z = elapsed * 0.1;

        ring1.rotation.z = elapsed * 0.12;
        ring2.rotation.z = -elapsed * 0.08;

        satellitesGroup.rotation.y = elapsed * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);

      centerGeometry.dispose();
      centerMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      satelliteGeometry.dispose();
      satelliteMat.dispose();
      streamGeo.dispose();
      streamMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
