import './polyfills'
import { ZInput } from './components/z-input'
import { ZTextArea } from './components/z-textarea'
import { ZCheckbox } from './components/z-checkbox'
import { ZToggle } from './components/z-toggle'
import { ZRadioGroup } from './components/z-radio-group'
import { ZRadio } from './components/z-radio'
import { ZSelect } from './components/z-select'
import { ZOptionGroup } from './components/z-option-group'
import { ZOption } from './components/z-option'
import { ZTabGroup } from './components/z-tab-group'
import { ZTab } from './components/z-tab'

customElements.define('z-input', ZInput)
customElements.define('z-textarea', ZTextArea)
customElements.define('z-checkbox', ZCheckbox)
customElements.define('z-toggle', ZToggle)
customElements.define('z-radio-group', ZRadioGroup)
customElements.define('z-radio', ZRadio)
customElements.define('z-select', ZSelect)
customElements.define('z-option-group', ZOptionGroup)
customElements.define('z-option', ZOption)
customElements.define('z-tab-group', ZTabGroup)
customElements.define('z-tab', ZTab)
