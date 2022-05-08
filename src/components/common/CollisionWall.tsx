import { MaterialProps, MeshProps, MeshStandardMaterialProps } from '@react-three/fiber'
import React from 'react'
import { PlaneProps, usePlane } from 'use-cannon'

const CollisionWall = (planeProps: PlaneProps, meshProps: MeshProps) => {
    const [ref] = usePlane(() => ({ ...planeProps })) as any
    return (
        <mesh ref={ref} {...meshProps}>
            <planeBufferGeometry {...planeProps} />
            <meshStandardMaterial />
        </mesh>
    )
}

export default CollisionWall
