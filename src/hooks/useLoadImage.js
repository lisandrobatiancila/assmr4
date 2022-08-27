export const useLoadImage = (image) =>{
    const IMG = (image) =>{
        return <img src={ image } style={{width: "100%", height: "220px"}} />
    }
    const memoize = (func) => {
        const cache = {}
        return (...args) => {
            const argskey = JSON.stringify(args)
            if(!cache[argskey])
                cache[argskey] = func(...args)
            return cache[argskey]
        }
    }

    const loadImage = memoize(IMG)

    return loadImage(image)
}
