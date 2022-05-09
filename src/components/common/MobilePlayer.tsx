import { MeshProps, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { SphereProps, useSphere } from 'use-cannon'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'
import { FPSControls } from 'react-three-fpscontrols'

export const MobilePlayer = (props: SphereProps) => {
    const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', ...props })) as any

    return (
        <mesh ref={ref}>
            <FPSControls
                camProps={{
                    makeDefault: true,
                    fov: 80,
                    position: [0, 2.537, 0.7],
                }}
                orbitProps={{
                    target: [0, 2.537, 0],
                }}
                enableJoystick
                enableKeyboard
            />
        </mesh>
    )
}
