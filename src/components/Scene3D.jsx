import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'

function FloatingShape(){
    const mesh = useRef(null)
    useFrame((state, delta)=> {
        if(!mesh.current) return;

        mesh.current.rotation.x += delta * 0.15;
        mesh.current.rotation.y += delta * 0.25;
        mesh.current.position.y=
        Math.sin(state.clock.elapsedTime * 0.7) * 0.12
    })
    return(
        <Float speed={1.5} rotationIntensity={0.35} floatingIntensity={0.8}>
            <mesh ref={mesh}>
                <icosahedronGeometry args={[1.35, 5]} />
                <MeshDistortMaterial
                color='#4385ff'
                emissive='#102d80'
                emmissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.7}
                distort={0.2}
                speed={1.5}
                />
            </mesh>
        </Float>
    )
}



const Scene3D = () => {
  return (
    <div className='h-[360px] w-full md:h-[500px]'>
        <Canvas
        camera={{position: [0,0,5], fov: 45}}
        dpr={[1, 1.5]}
        gl={{alpha: true, antialias: true}}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 4, 5]} intensity={2.5} />
            <pointLight position={[-3, -2, 2]} color="7c3aed" intensity={30} />

            <FloatingShape />

            <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={false}
            />

        </Canvas>
    </div>
  )
}

export default Scene3D