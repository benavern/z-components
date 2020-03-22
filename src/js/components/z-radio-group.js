import { LitElement, html, css } from 'lit-element';

export class ZRadioGroup extends LitElement {

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            .z-radio-group {
                margin: 1em 0;
            }
        `
    }

    static get properties() {
        return {
            value: { type: String, reflect: true },
            name: { type: String }
        };
    }

    render() {
        return html`
            <div class="z-radio-group">
                <slot></slot>
            </div>
        `
    }

    firstUpdated() {
        this.querySelectorAll('z-radio').forEach(radio => {
            if (this.name) {
                radio.setAttribute('name', this.name)
            }

            radio.addEventListener('z-radio-change', ({detail}) => {
                if (detail.checked) {
                    this.value = detail.value
                    this.updateChildren()
                }
            })
        })

        if (this.value) {
            this.updateChildren()
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('value')) {
            this.updateChildren()
        }
    }

    updateChildren() {
        this.querySelectorAll('z-radio').forEach(radio => { 
            if (radio.getAttribute('value') === this.value) {
                radio.setAttribute('checked', '')
            } else {
                radio.removeAttribute('checked')
            }
        })
    }
}