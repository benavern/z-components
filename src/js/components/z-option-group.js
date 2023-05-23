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
        this.options = []
    }
    
    render () {
        return html`
            <div class="z-option-group">
                <slot></slot>
            </div>
        `
    }
    
    firstUpdated() {
        // we have to wait for the slot to be filled with its content weither it is used directly or with an other component
        this.shadowRoot.addEventListener('slotchange', e => {
            this.options = e.target.assignedNodes({ flatten: true }).filter(el => el.tagName === 'Z-OPTION')
            
            //  get dom default selected options
            const domSelected = this.options.filter(option => option.hasAttribute('selected'))
            this.value = domSelected.map(selected => selected.value)
            
            this.options.forEach(option => {
                // add multiple attribute to all options if needed
                if (this.multiple) {
                    option.setAttribute('multiple', '')
                }
                
                // listen for option change
                if (!option.zinit) {
                    option.addEventListener('z-change', this.onOptionChange(option).bind(this))
                    option.zinit = true // little hack so that I don't add too much listeners
                }
            })
        })
    }

    onOptionChange(option){
        return ({ detail }) => {
            if (this.multiple) {
                if (detail.value) {
                    this.value = [...this.value.filter(val => val !== option.value), option.value]
                } else {
                    this.value = this.value.filter(val => val !== option.value)
                }
            } else {
                this.value = [option.value]
            }
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('value') && changedProperties.get('value')) {
            this.updateChildren()
            this.dispatchChangeEvent()
        }
    }

    updateChildren() {
        this.options.forEach(option => { 
            if (this.value.includes(option.value)) {
                option.selected = true
            } else {
                option.selected = false
            }
        })
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