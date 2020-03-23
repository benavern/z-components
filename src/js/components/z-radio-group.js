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
        const radios = [...this.querySelectorAll('z-radio')]
        
        radios.forEach(radio => {
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

        this.shadowRoot.addEventListener('keydown', e => {
            let index = null
            const activableRadios = radios.filter(radio => !radio.hasAttribute('disabled'))
            const currentIndex = activableRadios.findIndex(radio => radio.getAttribute('value') === this.value)

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                index = currentIndex === activableRadios.length - 1 ? 0 : currentIndex + 1
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                index = currentIndex === 0 ? activableRadios.length - 1 : currentIndex - 1
            } else if (e.key === 'Home') {
                index = 0
            } else if (e.key === 'End') {
                index = activableRadios.length - 1
            }

            if (index !== null) {
                e.preventDefault()
                this.value = activableRadios[index].getAttribute('value')
            }
        })
    }

    updated(changedProperties) {
        if (changedProperties.has('value')) {
            this.updateChildren()
        }
    }

    updateChildren() {
        this.querySelectorAll('z-radio').forEach(radio => { 
            if (radio.getAttribute('value') === this.value) {
                radio.check()
            } else {
                radio.removeAttribute('checked')
            }
        })
    }
}