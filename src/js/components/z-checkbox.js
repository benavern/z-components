import { LitElement, html, css } from 'lit-element';

export class ZCheckbox extends LitElement {
    static get styles() {
        return css`
            :host {
                --checked: var(--z-primary-color, #0088c5);
                --blur: var(--z-secondary-color, #889);
                --hover: #445;
                --tick: #fff;
            }

            * {
                box-sizing: border-box;
            }

            .z-checkbox {
                display: inline-block;
                user-select: none;
                position: relative;
                margin: 1em 0;
            }

            .z-checkbox:hover {
                cursor: pointer;
            }

            .z-checkbox.disabled {
                opacity: .5;
            }

            .z-checkbox.disabled:hover {
                cursor: not-allowed;
            }

            .z-checkbox .z-checkbox__label { 
                cursor: inherit;
            }

            .z-checkbox .z-checkbox__item {
                position: relative;
                display: inline-block;
                height: 1em;
                width: 1em;
                background-color: var(--blur);
                margin: 0 .25em;
                border-radius: .15em;
                bottom: -.15em;
            }

            .z-checkbox:hover:not(.disabled) .z-checkbox__item {
                background-color: var(--hover);
            } 

            .z-checkbox input[type="checkbox"] {
                border: 0;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            .z-checkbox input[type="checkbox"]:checked + .z-checkbox__item {
                background-color: var(--checked);
            }

            .z-checkbox input[type="checkbox"]:checked + .z-checkbox__item:after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -75%) rotate(-45deg);
                width: .5em;
                height: .25em;
                border-bottom: .15em solid var(--tick);
                border-left: .15em solid var(--tick);
            }

            .z-checkbox input[type="checkbox"]:focus + .z-checkbox__item {
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
            right: { type: Boolean }
        };
    }

    render () {
        return html`
            <div class="z-checkbox ${this.disabled ? 'disabled' : ''}" @click="${this.toggleChecked}">
                ${ this.right ? html`<label class="z-checkbox__label">${this.label}</label>` : '' }
        
                <input type="checkbox" ?disabled="${this.disabled}" ?checked="${this.checked}" />
                <span class="z-checkbox__item"></span>

                ${ !this.right ? html`<label class="z-checkbox__label">${this.label}</label>` : '' }
            </div>
        `
    }

    toggleChecked(e) {
        if (!this.disabled) {
            this.checked = !this.checked
            this.shadowRoot.querySelector('input[type="checkbox"]').focus()
        }
    }
}