import { useEffect, useRef } from "react";
import * as THREE from "three";

function WebGLBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    /* =====================================================
       SCÈNE
       ===================================================== */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 8;

    /* =====================================================
       RENDERER
       ===================================================== */

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setClearColor(
      0x000000,
      0
    );

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";

    container.appendChild(renderer.domElement);

    /* =====================================================
       RESPONSIVE
       ===================================================== */

    const isMobile =
      window.innerWidth < 768;

    const particleCount = isMobile
      ? 350
      : 850;

    /* =====================================================
       PARTICULES
       ===================================================== */

    const positions = new Float32Array(
      particleCount * 3
    );

    const originalPositions = new Float32Array(
      particleCount * 3
    );

    const sizes = new Float32Array(
      particleCount
    );

    const randomOffsets = new Float32Array(
      particleCount
    );

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;

      const radius =
        Math.random() * 8 + 1;

      const angle =
        Math.random() * Math.PI * 2;

      const vertical =
        (Math.random() - 0.5) * 9;

      const x =
        Math.cos(angle) *
        radius *
        (0.9 + Math.random() * 0.5);

      const y = vertical;

      const z =
        (Math.random() - 0.5) * 6;

      positions[index] = x;
      positions[index + 1] = y;
      positions[index + 2] = z;

      originalPositions[index] = x;
      originalPositions[index + 1] = y;
      originalPositions[index + 2] = z;

      sizes[i] =
        0.5 +
        Math.random() * 1.7;

      randomOffsets[i] =
        Math.random() * Math.PI * 2;
    }

    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(
        sizes,
        1
      )
    );

    /* =====================================================
       SHADER
       ===================================================== */

    const material =
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending:
          THREE.AdditiveBlending,

        uniforms: {
          uTime: {
            value: 0,
          },

          uOpacity: {
            value: 0.52,
          },

          uPixelRatio: {
            value: Math.min(
              window.devicePixelRatio,
              2
            ),
          },
        },

        vertexShader: `
          attribute float aSize;

          uniform float uTime;
          uniform float uPixelRatio;

          varying float vAlpha;

          void main() {
            vec3 transformed = position;

            float movement =
              uTime * 0.22;

            transformed.x +=
              sin(
                uTime * 0.35 +
                position.y * 0.25
              ) * 0.16;

            transformed.y +=
              cos(
                uTime * 0.28 +
                position.x * 0.18
              ) * 0.12;

            transformed.z +=
              sin(
                uTime * 0.22 +
                position.x * 0.15 +
                position.y * 0.1
              ) * 0.08;

            vec4 modelPosition =
              modelViewMatrix *
              vec4(
                transformed,
                1.0
              );

            gl_Position =
              projectionMatrix *
              modelPosition;

            gl_PointSize =
              aSize *
              uPixelRatio *
              (85.0 / -modelPosition.z);

            vAlpha =
              smoothstep(
                9.0,
                1.0,
                -modelPosition.z
              );
          }
        `,

        fragmentShader: `
          varying float vAlpha;

          void main() {
            vec2 uv =
              gl_PointCoord -
              vec2(0.5);

            float distanceFromCenter =
              length(uv);

            float circle =
              1.0 -
              smoothstep(
                0.15,
                0.5,
                distanceFromCenter
              );

            vec3 blue =
              vec3(
                0.117,
                0.533,
                0.898
              );

            gl_FragColor =
              vec4(
                blue,
                circle *
                vAlpha *
                0.7
              );
          }
        `,
      });

    const particles =
      new THREE.Points(
        geometry,
        material
      );

    scene.add(particles);

    /* =====================================================
       GROUPE DE PROFONDEUR
       ===================================================== */

    const depthGroup =
      new THREE.Group();

    depthGroup.add(particles);

    scene.add(depthGroup);

    /* =====================================================
       SOURIS
       ===================================================== */

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
        event.clientX /
          window.innerWidth -
        0.5;

      targetMouse.y =
        event.clientY /
          window.innerHeight -
        0.5;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    /* =====================================================
       SCROLL
       ===================================================== */

    let scrollValue = 0;
    let targetScroll = 0;

    const handleScroll = () => {
      targetScroll =
        window.scrollY;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    /* =====================================================
       RESIZE
       ===================================================== */

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      material.uniforms.uPixelRatio.value =
        Math.min(
          window.devicePixelRatio,
          2
        );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /* =====================================================
       ANIMATION
       ===================================================== */

    const clock =
      new THREE.Clock();

    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      const elapsed =
        clock.getElapsedTime();

      /* -------------------------------
         Lissage souris
      -------------------------------- */

      mouse.x +=
        (targetMouse.x -
          mouse.x) *
        0.045;

      mouse.y +=
        (targetMouse.y -
          mouse.y) *
        0.045;

      /* -------------------------------
         Lissage scroll
      -------------------------------- */

      scrollValue +=
        (targetScroll -
          scrollValue) *
        0.04;

      /* -------------------------------
         Souris → profondeur
      -------------------------------- */

      depthGroup.rotation.y =
        mouse.x * 0.12;

      depthGroup.rotation.x =
        mouse.y * 0.08;

      depthGroup.position.x =
        mouse.x * 0.45;

      depthGroup.position.y =
        -mouse.y * 0.3;

      /* -------------------------------
         Rotation lente globale
      -------------------------------- */

      particles.rotation.y =
        elapsed * 0.025;

      particles.rotation.x =
        Math.sin(
          elapsed * 0.12
        ) * 0.025;

      /* -------------------------------
         Réaction au scroll
      -------------------------------- */

      particles.position.y =
        -scrollValue * 0.00045;

      particles.position.z =
        Math.sin(
          elapsed * 0.15
        ) *
        0.08;

      /* -------------------------------
         Respiration de l'opacité
      -------------------------------- */

      material.uniforms.uOpacity.value =
        0.44 +
        Math.sin(
          elapsed * 0.6
        ) *
          0.05;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    /* =====================================================
       CLEANUP
       ===================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (
        renderer.domElement &&
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
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
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    />
  );
}

export default WebGLBackground;