import { LitElement, html, css } from 'lit-element';

export class ZOption extends LitElement {
    static get styles() {
        return css`
            :host {
                --focus: var(--z-primary-color, #0088c5);
                --background: var(--z-background-color, #eee);
                --hover: var(--z-background-alt-color, #ddd);

                display: block;
            }

            * {
                box-sizing: border-box;
            }

            .z-option {
                background: var(--background);
                padding: .5em 1em;
                border-left: .1em solid transparent;
            }

            .z-option:hover {
                background: var(--hover);
                cursor: pointer;
            }

            .z-option.selected {
                border-color: var(--focus);
                color: var(--focus);
            }

            .z-option__checkbox {
                margin: 0;
            }
        `
    }

    static get properties() {
        return {
            value: { type: String },
            selected: { type: Boolean, reflect: true },
            multiple: { type: Boolean }
        };
    }

    get checkboxEl() {
        return html`
            <z-checkbox 
                class="z-option__checkbox"
                label="${this.textContent}" 
                ?checked="${this.selected}"></z-checkbox>`
    }

    render () {
        return html`
            <div class="z-option ${this.selected ? 'selected' : ''}">
                ${this.multiple ? this.checkboxEl : html`<slot></slot>`}
            </div>
        `
    }

    firstUpdated() {
        this.addEventListener('click', this.toggleSelected)
    }

    toggleSelected() {
        this.selected = !this.selected
        this.dispatchChangeEvent()
    }

    dispatchChangeEvent() {
        const changeEvent = new CustomEvent('z-change', {
            detail: {
                value: this.selected
            }
        })

        this.dispatchEvent(changeEvent)
    }
}