import { debounce } from '../utils'

// handle theme switcher
const $themeSwitcher = document.querySelector('aside .theme-switcher')
const $themeBtns = $themeSwitcher.querySelectorAll('.theme-item')
const $colorInputs = document.querySelectorAll('z-input[type="color"]')
let currentTheme = localStorage.getItem('theme')

$themeBtns.forEach($btn => {
    const color = $btn.getAttribute('data-color')

    // on click
    $btn.addEventListener('click', e => {
        e.preventDefault()
        switchTheme(color)
    })

    // on mouse over
    $btn.addEventListener('mouseover', () => {
        switchTheme(color, false)
    })
})

// on mouse leave
$themeSwitcher.addEventListener('mouseleave', () => {
    switchTheme(currentTheme)
})

$colorInputs.forEach($input => {
    $input.addEventListener('z-change', debounce(({ detail: { value } }) => {
        switchTheme(value, true)
    }, 200))
})

if (currentTheme) switchTheme(currentTheme)

/**
 * Change the global primary color and save it if asked
 * 
 * @param {string} color - hex color value
 * @param {Boolean} save - should this color be saved or not
 */
export function switchTheme(color, save = true) {
    document.documentElement.style.setProperty("--z-primary-color", color)
    
    if (save) {
        currentTheme = color
        localStorage.setItem('theme', color)
        $themeBtns.forEach($btn => {
            $btn.classList.toggle('selected', $btn.getAttribute('data-color') === color)
        })
        $colorInputs.forEach($input => {
            $input.value = color
        })
    }
}
