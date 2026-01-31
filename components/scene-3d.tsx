"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create organic sphere geometry with noise
    const geometry = new THREE.IcosahedronGeometry(1.8, 64)
    const positionAttribute = geometry.getAttribute("position")
    const vertex = new THREE.Vector3()

    // Store original positions for animation
    const originalPositions = new Float32Array(positionAttribute.count * 3)
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)
      originalPositions[i * 3] = vertex.x
      originalPositions[i * 3 + 1] = vertex.y
      originalPositions[i * 3 + 2] = vertex.z
    }

    // Custom shader material for dual-tone energy sphere (cyan + violet)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        uniform float time;
        
        // Simple noise function
        float noise(vec3 p) {
          return sin(p.x * 2.0 + time * 0.3) * 
                 sin(p.y * 2.0 + time * 0.2) * 
                 sin(p.z * 2.0 + time * 0.4) * 0.08;
        }
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          
          // Add subtle organic deformation
          vec3 pos = position;
          float displacement = noise(position);
          pos += normal * displacement;
          
          vPosition = pos;
          vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        uniform float time;
        
        void main() {
          // View direction for rim lighting
          vec3 viewDir = normalize(cameraPosition - vPosition);
          
          // Rim light calculation (edges glow more)
          float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
          rim = pow(rim, 2.2);
          
          // Soft cyan/aqua color
          vec3 cyanColor = vec3(0.35, 0.75, 0.82);
          
          // Soft violet/magenta color
          vec3 violetColor = vec3(0.60, 0.40, 0.72);
          
          // Dark semi-transparent center
          vec3 baseColor = vec3(0.04, 0.04, 0.06);
          
          // Use world position for dual-tone gradient (left vs right)
          float gradientFactor = smoothstep(-1.5, 1.5, vWorldPosition.x);
          
          // Add subtle vertical variation for more organic feel
          float verticalShift = sin(vWorldPosition.y * 0.5 + time * 0.15) * 0.15;
          gradientFactor = clamp(gradientFactor + verticalShift, 0.0, 1.0);
          
          // Blend between cyan and violet based on position
          vec3 rimColor = mix(cyanColor, violetColor, gradientFactor);
          
          // Combine base with rim light
          vec3 finalColor = baseColor + rimColor * rim * 0.55;
          
          // Subtle inner glow with color variation
          float innerGlow = 0.06 + 0.03 * sin(time * 0.4);
          vec3 innerGlowColor = mix(cyanColor, violetColor, gradientFactor + 0.3);
          finalColor += innerGlowColor * innerGlow * (1.0 - rim * 0.5);
          
          // Soft fresnel bloom effect
          float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.5);
          vec3 fresnelColor = mix(cyanColor * 0.8, violetColor * 0.8, gradientFactor);
          finalColor += fresnelColor * fresnel * 0.25;
          
          // Subtle energy pulse
          float pulse = 0.02 * sin(time * 0.6 + vWorldPosition.y * 2.0);
          finalColor += rimColor * pulse * rim;
          
          gl_FragColor = vec4(finalColor, 0.75);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Ambient particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200
    const particlesPositions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      particlesPositions[i * 3] = (Math.random() - 0.5) * 20
      particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlesPositions, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x7ec8cf, // Soft cyan tint
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Update shader uniforms
      material.uniforms.time.value = elapsedTime
      material.uniforms.mouseX.value = mouseRef.current.x
      material.uniforms.mouseY.value = mouseRef.current.y

      // Very slow sphere rotation
      sphere.rotation.x = elapsedTime * 0.03
      sphere.rotation.y = elapsedTime * 0.05

      // Subtle depth movement based on mouse
      sphere.position.x += (mouseRef.current.x * 0.3 - sphere.position.x) * 0.02
      sphere.position.y += (mouseRef.current.y * 0.3 - sphere.position.y) * 0.02

      // Slow particle rotation
      particles.rotation.y = elapsedTime * 0.02

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
