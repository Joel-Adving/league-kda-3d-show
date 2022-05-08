import { MeshReflectorMaterial } from '@react-three/drei'

import React from 'react'
import { usePlane } from 'use-cannon'

const Ground = () => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, -1] })) as any
    return (
        <mesh ref={ref}>
            <planeBufferGeometry args={[200, 300]} />
            <MeshReflectorMaterial
                envMapIntensity={0}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
                mixBlur={1} // How much blur mixes with surface roughness (default = 1)
                mixStrength={80} // Strength of the reflections
                mixContrast={1} // Contrast of the reflections
                resolution={2024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
                minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                depthToBlurRatioBias={1} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
            />
        </mesh>
    )
}

export default Ground
