import { LitElement, html, css } from 'lit-element'

export class ZTab extends LitElement {
    static get styles() {
        return css `            
            * {
                box-sizing: border-box;
            }

            .z-tab {
                position: relative;
                padding: .5em 0;
            }
        `
    }

    static get properties() {
        return {
            label: { type: String },
            active: { type: Boolean, reflect: true },
            disabled: { type: Boolean }
        };
    }

    constructor() {
        super()
        
        if (this.parentElement.tagName.toLocaleLowerCase() !== 'z-tab-group') {
            throw new Error('A ZTab custom element must be a direct child of a ZTagGroup custom element.')
        } else if (!this.getAttribute('label')) {
            throw new Error('A ZTab custom element must have a "label" attribute.')
        }
    }

    render() {
        return html`
            <div class="z-tab" ?hidden="${!this.active}">
                <slot></slot>
            </div>
        `
    }
}