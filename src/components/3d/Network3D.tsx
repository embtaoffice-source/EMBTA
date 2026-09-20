import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Network3DProps {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
}

export const Network3D: React.FC<Network3DProps> = ({
  className = 'w-full h-full absolute inset-0',
  nodeCount = 45,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xcee5ff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x1b873f, 3.5, 180);
    pointLight.position.set(0, 15, 35);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x244566, 2.5, 200);
    blueLight.position.set(-40, -30, 20);
    scene.add(blueLight);

    // 4. Nodes (Business network vertices)
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodePositions: THREE.Vector3[] = [];
    const sphereGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const primaryNodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b873f,
      emissive: 0x005321,
      roughness: 0.2,
      metalness: 0.8,
    });
    const secondaryNodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcee5ff,
      emissive: 0x102a43,
      roughness: 0.3,
      metalness: 0.6,
    });

    const spread = 70;
    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * spread * 1.5,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * (spread * 0.7)
      );
      nodePositions.push(pos);

      const isKeyNode = i % 4 === 0;
      const mesh = new THREE.Mesh(
        sphereGeometry,
        isKeyNode ? primaryNodeMaterial : secondaryNodeMaterial
      );
      mesh.position.copy(pos);
      mesh.scale.setScalar(isKeyNode ? 1.4 : 0.85);
      nodesGroup.add(mesh);
    }

    // 5. Connection Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x24a14d,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const linePoints: THREE.Vector3[] = [];
    const maxDistance = 26;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance) {
          linePoints.push(nodePositions[i]);
          linePoints.push(nodePositions[j]);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodesGroup.add(lineSegments);

    // 6. Floating Ambient Dust Particles
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 160;
      particlePositions[i + 1] = (Math.random() - 0.5) * 120;
      particlePositions[i + 2] = (Math.random() - 0.5) * 100;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xcee5ff,
      size: 0.6,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 7. Interaction & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };

    if (interactive && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth camera drift towards mouse target
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        nodesGroup.rotation.y = elapsedTime * 0.04 + targetX * 1.5;
        nodesGroup.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1 + targetY * 1.5;

        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);

      sphereGeometry.dispose();
      primaryNodeMaterial.dispose();
      secondaryNodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [nodeCount, interactive]);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
