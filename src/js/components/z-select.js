import { LitElement, html, css } from 'lit-element';
import { optionsGroupInit, optionsGroupUpdate } from '../utils'


export class ZSelect extends LitElement {
    static get styles() {
        return css`
            :host {
                --focus: var(--z-primary-color, #0088c5);
                --blur: var(--z-secondary-color, #889);
                --background: var(--z-background-color, #e2e2e4);
                --invalid: var(--z-danger-color, #f33);
                
                display: block;
            }

            * {
                box-sizing: border-box;
            }

            .z-select {
                position: relative;
            }

            .z-select__indicator {
                position: absolute;
                right: 1em;
                top: 1.5em;
                width: 0;
                height: 0;
                border: .25em solid transparent;
                border-top-color: var(--blur);
                border-bottom-width: 0;
                pointer-events: none;
                transform: rotate(0);
                transition: .3s;
            }
            .z-select__indicator.open {
                border-top-color: var(--focus);
                transform: rotate(180deg);
            }

            .z-select .z-select__options {
                position: absolute;
                z-index: 1;
                top: 100%;
                left: 0;
                width: 100%;
                overflow-y: auto;
                max-height: 15em;
                box-shadow: 0 0 1em var(--blur);
            }
        `
    }

    static get properties() {
        return {
            label: { type: String },
            value: { type: Array, reflect: true },
            disabled: { type: Boolean },
            required: { type: Boolean },
            readonly: { type: Boolean },
            multiple: { type: Boolean },
            optionsVisible: { type: Boolean, attribute: false }
        };
    }

    get formatedValue() {
        const options = [...this.querySelectorAll('z-option')]

        return this.value
            ? this.value.map(val => options.find(opt => opt.getAttribute('value') === val).textContent).join(', ')
            : ''
    }

    constructor() {
        super()
        this.optionsVisible = false
        this.value = []

        this.outsideClickListener = event => {
            if (!this.contains(event.target)) {
                this.optionsVisible = false
            }
        }
    }

    render () {
        return html`
            <div class="z-select">
                <z-input 
                    class="z-select__input"
                    type="text" 
                    .label="${this.label}"
                    .value="${this.formatedValue}"
                    ?disabled="${this.disabled}"
                    ?required="${this.required}"
                    @click="${this.focus}"
                    @focus="${this.focus}"
                    readonly></z-input>
                
                <div class="z-select__indicator ${this.optionsVisible ? 'open' : ''}"></div>
                
                <!-- <select name="" id=""></select> -->

                <div 
                    class="z-select__options"
                    ?hidden="${!this.optionsVisible}">
                    <slot></slot>
                </div>
            </div>
        `
    }

    firstUpdated() {
        document.addEventListener('click', this.outsideClickListener.bind(this))
        this.addEventListener('keyup', e => e.keyCode === 27 && this.outsideClickListener.call(this, {target: document}))
        optionsGroupInit.call(this)
    }

    updated(changedProperties) {
        if (changedProperties.has('value')) {
            this.updateChildren()
            this.dispatchChangeEvent()
        }
    }

    focus() {
        this.optionsVisible = true
        requestAnimationFrame(() => {
            const options = [...this.querySelectorAll('z-option')]
            if (options.length) options[0].focus()
        })
    }

    updateChildren() {
        optionsGroupUpdate.call(this)
    }

    disconnectedCallback() {
        document.removeEventListener(this.outsideClickListener.bind(this))
    }

    onChange({ detail }) {
        this.value = detail.value
        this.dispatchChangeEvent()
    }

    dispatchChangeEvent() {
        const changeEvent = new CustomEvent('z-change', {
            detail: {
                value: this.value
            }
        })

        this.dispatchEvent(changeEvent)
    }
}