import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { useAspect } from '@react-three/drei'
import { useAudio } from '../../hooks/useAudio'
import { reloadScheduler } from '../../utils/helpers'

interface Props {
    url: string
}

export function Video({ url }: Props) {
    const size = useAspect(2000, 800)
    const { toggle: toggleAudio } = useAudio('/kda-song.mp3')

    const [video] = useState(() =>
        Object.assign(document.createElement('video'), {
            src: url,
            crossOrigin: 'Anonymous',
            // loop: true,
            muted: true,
            preload: 'metadata',
        })
    )

    useEffect(() => {
        video.play()
        video.onplaying = async () => {
            toggleAudio()
            await reloadScheduler(154)
        }
    }, [video])

    return (
        <mesh scale={size} position={[0, 24, -35]} rotation={[-Math.PI * 2, 0, 0]}>
            <planeBufferGeometry args={[6, 6]} />
            <meshBasicMaterial toneMapped={false}>
                <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
            </meshBasicMaterial>
        </mesh>
    )
}
