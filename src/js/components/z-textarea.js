import { LitElement, html, css } from 'lit-element';

import { debounce } from '../utils'

export class ZTextArea extends LitElement {

    static get styles() {
        return css`
            :host {
                --focus: var(--z-primary-color, #0088c5);
                --blur: var(--z-secondary-color, #889);
                --invalid: var(--z-danger-color, #f33);
            }

            * {
                box-sizing: border-box;
            }

            .z-textarea {
                position: relative;
                margin: 1em 0;
            }

            .z-textarea.disabled {
                opacity: .5;
            }

            .z-textarea .z-textarea__label {
                position: absolute;
                top: 1em;
                left: 0;
                transform: translate(0, 0) scale(1);
                transform-origin: left;
                transition: transform .3s;
                color: var(--blur);
            }

            .z-textarea .z-textarea__field {
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

            .z-textarea.autoresize .z-textarea__field {
                overflow: hidden;
                resize: none;
            }

            .z-textarea .z-textarea__field:focus,
            .z-textarea .z-textarea__field:not(:placeholder-shown) {
                outline: none;
                border-bottom-color: var(--focus);
            }

            .z-textarea .z-textarea__field:focus + .z-textarea__label,
            .z-textarea .z-textarea__field:not(:placeholder-shown) + .z-textarea__label {
                transform: translate(0, -1.5em) scale(.75);
                color: var(--focus);
            }

            .z-textarea .z-textarea__field:invalid,
            .z-textarea .z-textarea__field:invalid:not(:placeholder-shown) {
                border-bottom-color: var(--invalid);
            }

            .z-textarea .z-textarea__field:invalid + .z-textarea__label,
            .z-textarea .z-textarea__field:invalid:not(:placeholder-shown) + .z-textarea__label {
                color: var(--invalid);
            }
        `
    }

    static get properties() {
        return {
            label: { type: String },
            value: { type: String, reflect: true },
            disabled: { type: Boolean },
            required: { type: Boolean },
            readonly: { type: Boolean },
            autoresize: { type: Boolean }
        };
    }

    constructor() {
        super()
        this.onResize = debounce(this.onResize.bind(this), 200)
    }

    render() {
        return html`
            <div class="z-textarea ${this.disabled ? 'disabled' :''} ${this.autoresize ? 'autoresize' : ''}">
                <textarea 
                    class="z-textarea__field"
                    placeholder=" "
                    @input="${this.inputAction}" 
                    .value="${this.value || ''}"
                    ?disabled="${this.disabled}"
                    ?required="${this.required}"
                    ?readonly="${this.readonly}"> 
                </textarea>
                ${ this.label ? html`<label class="z-textarea__label">${this.label}</label>`: '' }
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
            window.addEventListener('resize', this.onResize)
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        window.removeEventListener('resize', this.onResize)
    }

    inputAction(e) {
        this.value = e.target.value

        if (this.autoresize) {
            this.resizeField()
        }
    }

    onResize(e) {
        // debounced resizedField (see constructor)
        this.resizeField()
    }

    resizeField() {
        const $input = this.shadowRoot.querySelector('.z-textarea__field')
        $input.style.height = 'auto'
        $input.style.height = $input.scrollHeight + 'px'
    }
}