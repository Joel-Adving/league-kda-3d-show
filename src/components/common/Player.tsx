import { MeshProps, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { SphereProps, useSphere } from 'use-cannon'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'
import { FPVControls } from '../../utils/FPVControls'

const WALK_SPEED = 2
const RUN_SPEED = 4
const SLOW_WALK_SPEED = 0.5
const JUMP_VELOCITY = 7

export const Player = (props: SphereProps) => {
    const { jump, moveBackward, moveForward, moveLeft, moveRight, run, walkSlow } = useKeyboardControls()
    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', ...props })) as any
    const velocity = useRef<number[]>([0, 0, 0])
    const [speed, setspeed] = useState(WALK_SPEED)

    useEffect(() => {
        api.velocity.subscribe((v: number[]) => (velocity.current = v))
    }, [api.velocity])

    useFrame(() => {
        camera.position.copy(ref.current?.position)
        const direction = new Vector3()
        const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0))
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(camera.rotation)
        api.velocity.set(direction.x, velocity?.current[1], direction.z)
        if (jump && Math.abs(+velocity.current[1].toFixed(2)) < 0.01) {
            api.velocity.set(velocity.current[0], JUMP_VELOCITY, velocity.current[2])
        }
        if (run) setspeed(RUN_SPEED)
        else if (walkSlow) setspeed(SLOW_WALK_SPEED)
        else setspeed(WALK_SPEED)
    })

    return (
        <>
            <FPVControls />
            <mesh ref={ref} />
        </>
    )
}
