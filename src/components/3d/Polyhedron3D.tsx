import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Polyhedron3DProps {
  className?: string;
}

export const Polyhedron3D: React.FC<Polyhedron3DProps> = ({
  className = 'w-64 h-64 md:w-80 md:h-80 mx-auto',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Inner glowing geometry
    const coreGeo = new THREE.DodecahedronGeometry(2.4, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x102a43,
      emissive: 0x1b873f,
      roughness: 0.3,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x24a14d,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Floating particles
    const partGeo = new THREE.BufferGeometry();
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0xcee5ff,
      size: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // Lights
    const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x1b873f, 3, 20);
    light2.position.set(-3, -3, 2);
    scene.add(light2);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        coreMesh.rotation.x = elapsed * 0.4;
        coreMesh.rotation.y = elapsed * 0.6;

        wireMesh.rotation.x = -elapsed * 0.25;
        wireMesh.rotation.y = -elapsed * 0.35;

        particles.rotation.y = elapsed * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      partGeo.dispose();
      partMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`relative ${className}`} aria-hidden="true" />;
};
