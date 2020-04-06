import { LitElement, html, css } from 'lit-element';

export class ZRadio extends LitElement {

    static get styles() {
        return css`
            :host {
                /* variable */
                --checked: var(--z-primary-color, #0088c5);
                --blur: var(--z-secondary-color, #889);
                --hover: var(--z-secondary-alt-color, #445);
                --tick: var(--z-tick-color, #fff);

                /* wrapping style */
                display: block;
                margin: 1em 0;
            }

            * {
                box-sizing: border-box;
            }

            .z-radio {
                display: inline-block;
                user-select: none;
                position: relative;
            }

            .z-radio:hover {
                cursor: pointer;
            }

            .z-radio.disabled {
                opacity: .5;
            }

            .z-radio.disabled:hover {
                cursor: not-allowed;
            }

            .z-radio .z-radio__label { 
                cursor: inherit;
            }

            .z-radio .z-radio__item {
                position: relative;
                display: inline-block;
                height: 1em;
                width: 1em;
                background-color: var(--blur);
                margin-right: .25em;
                border-radius: 50%;
                bottom: -.15em;
            }

            .z-radio .z-radio__item.right {
                margin-right: 0;
                margin-left: .25em;
            }
            
            .z-radio:hover:not(.disabled) .z-radio__item {
                background-color: var(--hover);
            } 
            
            .z-radio input[type="radio"] {
                border: 0;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }
            
            .z-radio input[type="radio"]:checked + .z-radio__item {
                background-color: var(--checked);
            }
            
            .z-radio input[type="radio"]:checked + .z-radio__item:after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: .5em;
                height: .5em;
                border-radius: 50%;
                background-color: var(--tick);
            }

            .z-radio input[type="radio"]:focus + .z-radio__item {
                outline-style: auto;
                outline-color: var(--checked);
            }

        `
    }

    static get properties() {
        return {
            label: { type: String },
            checked: { type: Boolean, reflect: true },
            disabled: { type: Boolean },
            right: { type: Boolean },
            name: { type: String },
            value: { type: String }
        };
    }

    constructor() {
        super()

        if (this.parentElement.tagName.toLocaleLowerCase() !== 'z-radio-group') {
            throw new Error('A ZRadio custom element must be a direct child of a ZRadioGroup custom element.')
        }
    }

    render() {
        return html`
            <div class="z-radio ${this.disabled ? 'disabled' : ''}" @click="${this.check}">
                ${ this.right ? html`<label class="z-radio__label">${this.label}</label>` : '' }
                
                <input type="radio" ?disabled="${this.disabled}" .name="${this.name}"/>
                <span class="z-radio__item ${this.right ? 'right' : ''}"></span>

                ${ !this.right ? html`<label class="z-radio__label">${this.label}</label>` : '' }
            </div>
        `
    }

    check() {
        if (!this.disabled && !this.checked) {
            this.checked = true

            const radioInput = this.shadowRoot.querySelector('input[type="radio"]')
            if (radioInput) radioInput.focus()
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('checked')) {
            const event = new CustomEvent('z-radio-change', {
                detail: {
                    value: this.value,
                    checked: this.checked
                }
            })
            this.dispatchEvent(event)

            if (this.checked) {
                this.shadowRoot.querySelector('input[type="radio"]').checked = true
            } else {
                this.shadowRoot.querySelector('input[type="radio"]').checked = false
            }
        }
    }
}