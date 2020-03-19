import { LitElement, html, css } from 'lit-element';

import { debounce } from '../utils'

export class ZTextArea extends LitElement {

    static get styles() {
        return css`
            :host {
                --focus: var(--z-primary-color, #0088c5);
                --blur: var(--z-secondary-color, #889);
            }

            * {
                box-sizing: border-box;
            }

            .z-input {
                position: relative;
                margin: 1em 0;
            }

            .z-input.disabled {
                opacity: .5;
            }

            .z-input .z-input__label {
                position: absolute;
                top: 1em;
                left: 0;
                transform: translate(0, 0) scale(1);
                transform-origin: left;
                transition: transform .3s;
                color: var(--blur);
            }

            .z-input .z-input__field {
                display: block;
                width: 100%;
                border: none;
                border-bottom: .1em solid var(--blur);
                background: transparent;
                color: inherit;
                font-family: inherit;
                font-size: inherit;
                resize: vertical;
                padding: 1em 0 .5em;
                min-height: 2.5em;
            }

            .z-input .z-input__field:focus,
            .z-input .z-input__field:not(:placeholder-shown) {
                outline: none;
                border-bottom-color: var(--focus);
            }

            .z-input .z-input__field:focus + .z-input__label,
            .z-input .z-input__field:not(:placeholder-shown) + .z-input__label {
                transform: translate(0, -1.5em) scale(.75);
                color: var(--focus);
            }
        `
    }

    static get properties() {
        return {
            label: { type: String },
            value: { type: String, reflect: true },
            disabled: { type: Boolean },
            autoresize: { type: Boolean }
        };
    }

    render() {
        return html`
            <div class="z-input ${this.disabled ? 'disabled' :''}">
                <textarea type="text" class="z-input__field" placeholder=" " ?disabled="${this.disabled}" @input="${this.inputAction}" .value="${this.value || ''}"></textarea>
                ${ this.label ? html`<label class="z-input__label">${this.label}</label>`: '' }
            </div>
        `
    }

    firstUpdated() {
        if (this.autoresize) {
            this.resizeField()
        }
    }

    connectedCallback() {
        super.connectedCallback()

        if (this.autoresize) {
            window.addEventListener('resize', debounce(this.resizeField, 200))
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        window.removeEventListener('resize', this.resizeField)
    }

    inputAction(e) {
        this.value = e.target.value

        if (this.autoresize) {
            this.resizeField()
        }
    }

    resizeField(e) {
        const $input = this.shadowRoot.querySelector('.z-input__field')

        $input.style.height = 'auto'
        $input.style.height = $input.scrollHeight + 'px'
    }
}