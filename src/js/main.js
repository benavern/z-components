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