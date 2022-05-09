import React, { Suspense, useRef, useEffect, useState } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
    url: string
}

export function Sound({ url }: Props) {
    const sound = useRef(null) as any
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)
    //@ts-ignore
    useEffect(() => {
        sound.current.setBuffer(buffer)
        sound.current.setRefDistance(0.6)
        sound.current.setLoop(true)
        sound.current.setVolume(40)
        setInterval(() => sound.current.play(), 300)
        camera.add(listener)
        return () => camera.remove(listener)
    }, [])
    return (
        <mesh position={[0, 2, -9]}>
            <positionalAudio ref={sound} args={[listener]} />
        </mesh>
    )
}
