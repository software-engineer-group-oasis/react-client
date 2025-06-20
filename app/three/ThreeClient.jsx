"use client"

import { Canvas } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { useControls } from "leva"

export default function Three() {
    const {scene} = useGLTF('/models/apartment_plan.glb')
    const { x, y, z, scale, rotX, rotY, rotZ } = useControls({
        x: { value: -0.5, min: -10, max: 10 },
        y: { value: 0, min: -10, max: 10 },
        z: { value: -0.5, min: -10, max: 10 },
        scale: { value: 0.5, min: 0.1, max: 10 },
        rotX: { value: 1.0, min: -10, max: 10 },
        rotY: { value: 0.2, min: -10, max: 10 },
        rotZ: { value: -0.3, min: -10, max: 10 },
    })

    return (
            <Canvas camera={{position:[2,2,5], fov:50}}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[5, 10, 7.5]} intensity={1} castShadow/>
                <primitive object={scene}  position={[x, y, z]} scale={[scale, scale, scale]} 
                    rotation={[rotX, rotY, rotZ]}/>
                <OrbitControls />
            </Canvas>
    )
}