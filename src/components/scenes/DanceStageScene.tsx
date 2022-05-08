import React, { useState } from 'react'
import { Physics } from 'use-cannon'
import Ground from '../common/Ground'
import { Player } from '../common/Player'
import DanceStage from '../models/DanceStage'
import { Swarm } from '../effects/Swarm'
import CollisionWall from '../common/CollisionWall'
import Ahri from '../models/Ahri'
import { useAudio } from '../../hooks/useAudo'
import { Environment, Html, PerspectiveCamera, PositionalAudio } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise } from '@react-three/postprocessing'
import * as THREE from 'THREE'
import { Sound } from '../common/Sound'
import { Video } from '../common/Video'

const DanceStageScene = () => {
    const [show, setShow] = useState(false)

    return (
        <>
            <color attach="background" args={[0, 0, 0]} />
            <Html center className="z-40 grid w-screen h-screen place-content-center ">
                {!show && (
                    <>
                        <button
                            className="px-10 py-2 pb-4 lg:text-6xl text-3xl  text-white border-[1px] font-thin border-white rounded-sm hover:scale-105 transition-all ease-out"
                            onClick={() => setShow(true)}
                        >
                            Enter Show
                        </button>
                        <p className="mt-2 text-xs text-center text-white lg:mt-4">controls: </p>
                        <p className="mt-1 text-xs text-center text-white ">w, a, s, d, shift and space</p>
                    </>
                )}
            </Html>
            <EffectComposer multisampling={0} disableNormalPass={true}>
                <DepthOfField focusDistance={0} focalLength={0.05} bokehScale={2} height={480} />
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />
                <Noise opacity={0.01} />
            </EffectComposer>
            <Swarm count={10000} />
            <ambientLight intensity={0.1} />
            <spotLight position={[0, 0.7, 1.4]} intensity={2} penumbra={1} castShadow />
            <spotLight position={[0, 3, 1.2]} intensity={1} penumbra={0.4} castShadow />
            <hemisphereLight args={['#6608ff', '#ff03b3']} />

            {show && (
                <>
                    <Video url="/compressed-kda-video.mp4" />
                    <Sound url="/kda-bass-boosted.mp3" />
                    <DanceStage position={[0, -15.14, 2]} rotation={[0, -Math.PI * 0.5, 0]} />
                    <Ahri scale={0.03} />
                    <Physics gravity={[0, -3, 0]}>
                        <Ground />
                        <Player position={[0, 1, 40]} />
                        <CollisionWall args={[0, 0]} position={[0, 0, 3]} />
                        <CollisionWall args={[0, 0]} position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]} />
                        <CollisionWall args={[0, 0]} position={[0, 0, 50]} rotation={[-Math.PI * 1, 0, 0]} />
                        <CollisionWall args={[0, 0]} position={[30, 0, 10]} rotation={[0, -Math.PI * 0.5, 0]} />
                        <CollisionWall args={[0, 0]} position={[-30, 0, 10]} rotation={[0, -Math.PI * 1.5, 0]} />
                    </Physics>
                </>
            )}
        </>
    )
}

export default DanceStageScene
