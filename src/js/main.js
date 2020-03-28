import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

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
hljs.initHighlightingOnLoad();