export function debounce(cb, delay) {
    let timeout

    return function () {
        const ctx = this
        const args = arguments

        clearTimeout(timeout)
        
        timeout = setTimeout(function () {
            cb.apply(ctx, args)
        }, delay)
    }
}
