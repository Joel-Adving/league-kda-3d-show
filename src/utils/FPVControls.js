import React, { useEffect } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'

import { useRef } from 'react'
import { extend, useThree } from '@react-three/fiber'

extend({ PointerLockControlsImpl })

export const FPVControls = props => {
    const { camera, gl } = useThree()
    const controls = useRef()

    useEffect(() => {
        document.addEventListener('click', () => {
            if (!controls.current) return
            controls.current.lock()
        })
    }, [])

    return <pointerLockControlsImpl ref={controls} args={[camera, gl.domElement]} {...props} />
}
