import { Canvas } from '@react-three/fiber'
import type { NextPage } from 'next'
import { Suspense } from 'react'
import DanceStageScene from '../components/scenes/DanceStageScene'

const Home: NextPage = () => {
    return (
        <>
            <Canvas className="min-h-screen bg-black" shadows>
                <Suspense fallback={null}>
                    <DanceStageScene />
                </Suspense>
            </Canvas>
        </>
    )
}

export default Home
