import { useState, useEffect } from 'react'

export const useAudio = (url: string, autoStart: boolean = false) => {
    const [audio] = useState(typeof Audio !== 'undefined' && new Audio(url))
    const [playing, setPlaying] = useState(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
        if (audio) playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
        if (autoStart && audio) {
            setInterval(() => {
                audio.play()
                audio.volume = 0.05
            }, 2500)
        }
    }, [])

    useEffect(() => {
        if (!audio) return
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [])

    return { playing, toggle }
}
