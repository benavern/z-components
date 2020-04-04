import hljs from 'highlight.js/lib/highlight'
import html from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'

import { ZInput, ZTextArea, ZCheckbox, ZToggle, ZRadioGroup, ZRadio, ZTabGroup, ZTab } from "./z-web-components"

customElements.define('z-input', ZInput)
customElements.define('z-textarea', ZTextArea)
customElements.define('z-checkbox', ZCheckbox)
customElements.define('z-toggle', ZToggle)
customElements.define('z-radio-group', ZRadioGroup)
customElements.define('z-radio', ZRadio)
customElements.define('z-tab-group', ZTabGroup)
customElements.define('z-tab', ZTab)

// syntax highlighting
hljs.registerLanguage('html', html)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.initHighlightingOnLoad();

// handle menu toggle
const $menuBtn = document.querySelector('aside .toggle-menu')
const $menuEl = document.querySelector('aside nav')

$menuBtn.addEventListener('click', e => {
    e.preventDefault()
    $menuEl.classList.toggle('visible')
})

// handle theme switcher
const $themeSwitcher = document.querySelector('aside .theme-switcher')
const $themeBtns = $themeSwitcher.querySelectorAll('.theme-item')
let currentTheme = localStorage.getItem('theme')

$themeBtns.forEach($btn => {
    const color = $btn.getAttribute('data-color')

    // onClick
    $btn.addEventListener('click', e => {
        e.preventDefault()
        switchTheme(color)
    })

    // onmouseover
    $btn.addEventListener('mouseover', e => {
        switchTheme(color, false)
    })
})

$themeSwitcher.addEventListener('mouseleave', e => {
    switchTheme(currentTheme)
})

if (currentTheme) switchTheme(currentTheme)

function switchTheme(color, save = true) {
    document.documentElement.style.setProperty("--z-primary-color", color)
    
    if (save) {
        currentTheme = color
        localStorage.setItem('theme', color)
        $themeBtns.forEach($btn => {
            $btn.classList.toggle('selected', $btn.getAttribute('data-color') === color)
        })
    }
}
