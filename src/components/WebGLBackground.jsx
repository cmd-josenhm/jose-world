import { useEffect, useRef } from "react";
import * as THREE from "three";

function WebGLBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // ==========================================
    // SCÈNE
    // ==========================================

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 8;

    // ==========================================
    // RENDERER
    // ==========================================

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);

    // ==========================================
    // PARTICULES
    // ==========================================

    const isMobile = window.innerWidth < 768;

    const particleCount = isMobile ? 450 : 1100;

    const positions = new Float32Array(
      particleCount * 3
    );

    const velocities = new Float32Array(
      particleCount * 3
    );

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;

      positions[index] =
        (Math.random() - 0.5) * 22;

      positions[index + 1] =
        (Math.random() - 0.5) * 14;

      positions[index + 2] =
        (Math.random() - 0.5) * 14;

      velocities[index] =
        (Math.random() - 0.5) * 0.0008;

      velocities[index + 1] =
        Math.random() * 0.001;

      velocities[index + 2] =
        (Math.random() - 0.5) * 0.0005;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    const material = new THREE.PointsMaterial({
      color: 0x1e88e5,
      size: isMobile ? 0.035 : 0.055,
      transparent: true,
      opacity: isMobile ? 0.5 : 0.65,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(
      geometry,
      material
    );

    scene.add(particles);

    // ==========================================
    // SOURIS
    // ==========================================

    const mouse = {
      x: 0,
      y: 0,
    };

    const targetMouse = {
      x: 0,
      y: 0,
    };

    const handleMouseMove = (event) => {
      targetMouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      targetMouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    // ==========================================
    // RESIZE
    // ==========================================

    const handleResize = () => {
      camera.aspect =
        window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // ==========================================
    // ANIMATION
    // ==========================================

    let animationFrame;
    let time = 0;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      time += 0.001;

      // Suivi fluide de la souris
      mouse.x +=
        (targetMouse.x - mouse.x) * 0.025;

      mouse.y +=
        (targetMouse.y - mouse.y) * 0.025;

      // Rotation générale
      particles.rotation.y += 0.00045;
      particles.rotation.x += 0.00012;

      // Mouvement global lié à la souris
      particles.position.x =
        mouse.x * 0.35;

      particles.position.y =
        mouse.y * 0.25;

      // Mouvement organique très léger
      particles.position.z =
        Math.sin(time) * 0.15;

      // Animation individuelle des particules
      const particlePositions =
        geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;

        particlePositions[index] +=
          velocities[index];

        particlePositions[index + 1] +=
          velocities[index + 1];

        particlePositions[index + 2] +=
          velocities[index + 2];

        // Replacer les particules lorsqu'elles sortent
        if (particlePositions[index + 1] > 7) {
          particlePositions[index + 1] = -7;
        }

        if (particlePositions[index] > 11) {
          particlePositions[index] = -11;
        }

        if (particlePositions[index] < -11) {
          particlePositions[index] = 11;
        }
      }

      geometry.attributes.position.needsUpdate =
        true;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // NETTOYAGE
    // ==========================================

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0
        z-0
        overflow-hidden
      "
    />
  );
}

export default WebGLBackground;