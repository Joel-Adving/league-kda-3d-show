import { useState, useEffect } from 'react'

export const useAudio = (url: string) => {
    const [audio] = useState(typeof Audio !== 'undefined' && new Audio(url))
    const [playing, setPlaying] = useState(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
        if (audio) {
            playing ? audio.play() : audio.pause()
            audio.volume = 0.1
        }
    }, [playing])

    useEffect(() => {
        if (!audio) return
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [])

    return { playing, toggle }
}
