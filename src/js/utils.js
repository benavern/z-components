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

export function optionsGroupInit() {
    const options = [...this.querySelectorAll('z-option')]
    
    //  get dom default selected options
    const domSelected = options.filter(option => option.hasAttribute('selected'))
    this.value = domSelected.map(selected => selected.getAttribute('value'))

    options.forEach(option => {
        // options focusable
        option.setAttribute('tabindex', 0)

        // add multiple attribute to all options
        if (this.multiple) {
            option.setAttribute('multiple', '')
        }
        
        // listen for option change
        option.addEventListener('z-change', ({ detail }) => {
            if (this.multiple) {
                if (detail.value) {
                    this.value = [...this.value.filter(val => val !== option.value), option.value]
                } else {
                    this.value = this.value.filter(val => val !== option.value)
                }
            } else {
                this.value = [option.value]
            }
        })
    })

    // this.addEventListener('keydown', e => {
    //     if (!options.includes(e.target)) return
        
    //     let index = null
    //     const currentIndex = options.indexOf(e.target)
        
    //     if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    //         index = currentIndex === options.length - 1 ? 0 : currentIndex + 1
    //     } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    //         index = currentIndex === 0 ? options.length - 1 : currentIndex - 1
    //     } else if (e.key === 'Home') {
    //         index = 0
    //     } else if (e.key === 'End') {
    //         index = options.length - 1
    //     }

    //     if (index !== null) {
    //         e.preventDefault()
    //         e.stopPropagation()
    //         options[index].focus()
    //     }
    // })
}

export function optionsGroupUpdate() {
    this.querySelectorAll('z-option').forEach(option => { 
        if (this.value.includes(option.value)) {
            option.selected = true
        } else {
            option.selected = false
        }
    })
}