import { LitElement, html, css } from 'lit-element';

export class ZInput extends LitElement {
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
                resize: none;
            }

            .z-input .z-input__field[type="color"] {
                border-bottom: none;
                padding: .5em 0 0;
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

            .z-input .z-input__field:invalid,
            .z-input .z-input__field:invalid:not(:placeholder-shown) {
                border-bottom-color: var(--invalid);
                box-shadow: none;
            }

            .z-input .z-input__field:invalid + .z-input__label,
            .z-input .z-input__field:invalid:not(:placeholder-shown) + .z-input__label {
                color: var(--invalid);
            }
        `
    }

    static get properties() {
        return {
            type: { type: String },
            label: { type: String },
            value: { type: String, reflect: true },
            disabled: { type: Boolean },
            required: { type: Boolean },
            readonly: { type: Boolean }
        };
    }

    constructor() {
        super()
        this._type = 'text'
    }

    set type(value) {
        const oldValue = this.type

        const validInputTypes = ['color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week']
        if (validInputTypes.includes(value)) {
            this._type = value
        } else {
            this._type = 'text'
        }

        this.requestUpdate('type', oldValue)
    }

    get type() {
        return this._type
    }

    render () {
        return html`
            <div class="z-input ${this.disabled ? 'disabled' : ''}">
                <input 
                    class="z-input__field" 
                    placeholder=" " 
                    .type="${this.type}" 
                    .value="${this.value || ''}" 
                    @input="${this.inputAction}"
                    ?disabled="${this.disabled}"
                    ?required="${this.required}"
                    ?readonly="${this.readonly}" /> 
                ${ this.label ? html`<label class="z-input__label">${this.label}</label>`: '' }
            </div>
        `
    }

    inputAction(e) {
        this.value = e.target.value
    }
}