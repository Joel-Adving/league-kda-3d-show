export const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg

export const wait = (milSecons: number) =>
    new Promise(resolve => {
        setTimeout(resolve, milSecons)
    })

export const reloadScheduler = async (seconds: number) => {
    await wait(seconds * 1000)
    window.location.reload()
}
