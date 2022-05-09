import React, { useEffect } from 'react'

import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'

export const FPVControls = props => {
    const { camera, gl } = useThree()
    const controls = useRef()

    useEffect(() => {
        document.addEventListener('click', () => {
            if (!controls.current) return
            controls.current.lock()
        })
    }, [])

    return <PointerLockControls pointerSpeed={0.365} ref={controls} args={[camera, gl.domElement]} {...props} />
}
