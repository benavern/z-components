import { LitElement, html, css } from 'lit-element';
import { optionsGroupInit, optionsGroupUpdate } from '../utils'

export class ZOptionGroup extends LitElement {
    static get styles() {
        return css`         
            * {
                box-sizing: border-box;
            }
        `
    }

    static get properties() {
        return {
            multiple: { type: Boolean },
            value: { type: Array, reflect: true }
        };
    }

    constructor() {
        super();
        this.value = []
    }
    
    render () {
        return html`
            <div class="z-option-group">
                <slot></slot>
            </div>
        `
    }
    
    firstUpdated() {
        optionsGroupInit.call(this)
    }

    updated(changedProperties) {
        if (changedProperties.has('value')) {
            this.updateChildren()
            this.dispatchChangeEvent()
        }
    }

    updateChildren() {
        optionsGroupUpdate.call(this)
    }

    dispatchChangeEvent() {
        const changeEvent = new CustomEvent('z-change', {
            detail: {
                value: this.multiple ? this.value : this.value[0]
            }
        })

        this.dispatchEvent(changeEvent)
    }
}