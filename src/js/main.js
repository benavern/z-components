import { ZInput, ZTextArea } from "./z-components"

customElements.define('z-input', ZInput, { extends: 'input' });
customElements.define('z-textarea', ZTextArea, { extends: 'textarea' });
