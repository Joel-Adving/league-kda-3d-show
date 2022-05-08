import { Canvas } from '@react-three/fiber'
import type { NextPage } from 'next'
import { Suspense } from 'react'
import MainScene from '../components/scenes/MainScene'

const Home: NextPage = () => {
    return (
        <div className="max-h-screen overflow-y-hidden ">
            <Canvas className="min-h-screen bg-black " shadows>
                <Suspense fallback={null}>
                    <MainScene />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Home
