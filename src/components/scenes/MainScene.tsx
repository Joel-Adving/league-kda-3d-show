import { Suspense, useState } from 'react'
import Ahri from '../models/Ahri'
import { Physics } from 'use-cannon'
import Ground from '../common/Ground'
import { CameraShake, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Sound } from '../common/Sound'
import { Video } from '../common/Video'
import { Particles } from '../effects/Particles'
import { Player } from '../common/Player'
import DanceStage from '../models/DanceStage'
import CollisionWall from '../common/CollisionWall'
import { Bloom, DepthOfField, EffectComposer, Noise } from '@react-three/postprocessing'
import { wait } from '../../utils/helpers'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

const MainScene = () => {
    const { width } = useWindowDimensions()
    const [show, setShow] = useState(false)

    return (
        <>
            <color attach="background" args={[0, 0, 0]} />
            <Html center className="z-40 grid w-screen h-screen place-content-center ">
                {!show && (
                    <>
                        <button
                            onClick={() => setShow(true)}
                            className=" p-4 lg:pt-2 lg:text-5xl text-3xl  text-white border-[1px] font-thin border-white rounded-sm hover:scale-105 transition-all ease-out"
                        >
                            BEGIN SHOW
                        </button>
                        {width > 768 && (
                            <>
                                <p className="mt-2 text-xs text-center text-white lg:mt-4">controls: </p>
                                <p className="mt-1 text-xs text-center text-white ">w, a, s, d, shift and space</p>
                            </>
                        )}
                    </>
                )}
            </Html>
            <EffectComposer multisampling={0} disableNormalPass={true}>
                <DepthOfField focusDistance={0} focalLength={0.1} bokehScale={2} height={480} />
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />
                <Noise opacity={0.01} />
            </EffectComposer>
            <Particles count={10000} />
            <ambientLight intensity={0.1} />
            <spotLight position={[0, 0.7, 1.4]} intensity={2} penumbra={1} castShadow />
            <spotLight position={[0, 3, 1.2]} intensity={1} penumbra={0.4} castShadow />
            <hemisphereLight args={['#6608ff', '#ff03b3']} />

            {show && (
                <Suspense fallback={null}>
                    <Video url="/kda-video-compressed.mp4" />
                    <DanceStage position={[0, -15.14, 2]} rotation={[0, -Math.PI * 0.5, 0]} />
                    <Ahri scale={0.03} />
                    {width <= 768 && (
                        <>
                            <OrbitControls
                                maxPolarAngle={Math.PI / 1.86}
                                maxDistance={8.5}
                                minDistance={2.5}
                                target={[0, 1.1, 0.3]}
                                enablePan={false}
                            />
                        </>
                    )}
                    <Physics gravity={[0, -3, 0]}>
                        <Ground />
                        {width > 768 && <Player position={[0, 1, 40]} />}
                        <CollisionWall args={[0, 0]} position={[0, 0, 3]} />
                        <CollisionWall args={[0, 0]} position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]} />
                        <CollisionWall args={[0, 0]} position={[0, 0, 50]} rotation={[-Math.PI * 1, 0, 0]} />
                        <CollisionWall args={[0, 0]} position={[30, 0, 10]} rotation={[0, -Math.PI * 0.5, 0]} />
                        <CollisionWall args={[0, 0]} position={[-30, 0, 10]} rotation={[0, -Math.PI * 1.5, 0]} />
                    </Physics>
                </Suspense>
            )}
        </>
    )
}

export default MainScene
