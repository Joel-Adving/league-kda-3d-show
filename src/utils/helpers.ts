export const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg

export const wait = (milSecons: number) =>
    new Promise(resolve => {
        setTimeout(resolve, milSecons)
    })
