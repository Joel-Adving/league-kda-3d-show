import { useEffect, useState } from 'react'

interface Keys {
    KeyW: string
    KeyS: string
    KeyA: string
    KeyD: string
    Space: string
    ShiftLeft: string
}

const actionByKey = (key: string) => {
    const keys = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        ShiftLeft: 'run',
        KeyC: 'walkSlow',
    } as Keys

    return keys[key as keyof Keys]
}

export const useKeyboardControls = () => {
    const [movement, setMovement] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        run: false,
        walkSlow: false,
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (actionByKey(e.code)) {
                setMovement(state => ({ ...state, [actionByKey(e.code)]: true }))
            }
        }
        const handleKeyUp = (e: KeyboardEvent) => {
            if (actionByKey(e.code)) {
                setMovement(state => ({ ...state, [actionByKey(e.code)]: false }))
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return movement
}
