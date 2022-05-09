import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useIsSSR } from '../hooks/useIsSSR'
import { Loader } from '@react-three/drei'
import MainScene from '../components/scenes/MainScene'

const Home: NextPage = () => {
    const [isSSR] = useIsSSR()

    return (
        <div className="max-h-screen overflow-y-hidden bg-black">
            <Canvas className="min-h-screen" shadows>
                <Suspense fallback={null}>
                    <MainScene />
                </Suspense>
            </Canvas>
            {!isSSR && <Loader />}
        </div>
    )
}

export default Home
