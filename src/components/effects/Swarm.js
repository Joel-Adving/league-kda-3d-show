import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const PARTICLE_SPEED = 0.001

export function Swarm({ count }) {
    const mesh = useRef()
    // const light = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width

    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = PARTICLE_SPEED + Math.random() * 0.00001
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])
    // The innards of this hook will run every frame
    useFrame(state => {
        // Makes the light follow the mouse
        // light.current.position.set(-state.mouse.x * aspect, -state.mouse.y * aspect, 0)
        // Run through the randomized data to calculate some movement
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            // particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01
            // particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01
            // Update the dummy object
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            // And apply the matrix to the instanced item
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            {/* <pointLight ref={light} distance={40} intensity={8} color="purple">
                <mesh scale={[1, 1, 6]}>
                    <dodecahedronBufferGeometry args={[4, 0]} />
                    <meshBasicMaterial color="purple" transparent />
                </mesh>
            </pointLight> */}
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <sphereBufferGeometry args={[0.04, 10, 10]} />
                <meshStandardMaterial color="white" />
            </instancedMesh>
        </>
    )
}
