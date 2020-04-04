import { LitElement, html, css } from 'lit-element';

export class ZToggle extends LitElement {
    static get styles() {
        return css`
            :host {
                /* variables */
                --on: var(--z-primary-color, #0088c5);
                --off: var(--z-secondary-color, #889);
                --hover: var(--z-secondary-alt-color, #445);
                --tick: var(--z-tick-color, #fff);

                /* wrapping style */
                display: block;
                margin: 1em 0;
            }

            * {
                box-sizing: border-box;
            }

            .z-toggle {
                display: inline-block;
                user-select: none;
                position: relative;
            }

            .z-toggle:hover {
                cursor: pointer;
            }

            .z-toggle.disabled {
                opacity: .5;
            }

            .z-toggle.disabled:hover {
                cursor: not-allowed;
            }

            .z-toggle .z-toggle__label { 
                cursor: inherit;
            }

            .z-toggle .z-toggle__item {
                position: relative;
                display: inline-block;
                height: 1em;
                width: 2em;
                background-color: var(--off);
                margin: 0 .25em;
                border-radius: .5em;
                overflow: hidden;
                bottom: -.15em;
                transition: .2s background-color;
            }

            .z-toggle:hover:not(.disabled) .z-toggle__item {
                background-color: var(--hover);
            }

            .z-toggle .z-toggle__item .z-toggle__slider {
                position: absolute;
                top: 5%;
                left: 2.5%;
                width: 45%;
                height: 90%;
                border-radius: .5em;
                background-color: var(--tick);
                transform: translateX(0);
                transition: .2s transform;
            }

            .z-toggle .z-toggle__item .z-toggle__slider .z-toggle__slider-on-label,
            .z-toggle .z-toggle__item .z-toggle__slider .z-toggle__slider-off-label {
                content: attr(data-on);
                color: var(--tick);
                display: block;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: .45em;
                width: 100%;
                right: 105%;
                text-align: center;
            }
                
            .z-toggle .z-toggle__item .z-toggle__slider .z-toggle__slider-off-label {
                content: attr(data-off);
                right: auto;
                left: 105%;
            }

            .z-toggle input[type="checkbox"] {
                border: 0;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            .z-toggle input[type="checkbox"]:checked + .z-toggle__item {
                background-color: var(--on);
            }

            .z-toggle input[type="checkbox"]:checked + .z-toggle__item .z-toggle__slider {
                transform: translateX(1em)
            }

            .z-toggle input[type="checkbox"]:focus + .z-toggle__item {
                outline-style: auto;
                outline-color: var(--on);
            }
        `
    }

    static get properties() {
        return {
            label: { type: String },
            active: { type: Boolean, reflect: true },
            disabled: { type: Boolean },
            right: { type: Boolean },
            onlabel: { type: String },
            offlabel: { type: String }
        };
    }

    render () {
        return html`
            <div class="z-toggle ${this.disabled ? 'disabled' : ''}" @click="${this.toggleChecked}">
                ${ this.right ? html`<label class="z-toggle__label">${this.label}</label>` : '' }


                <input type="checkbox" ?disabled="${this.disabled}" ?checked="${this.active}" />
                <div class="z-toggle__item">
                    <div class="z-toggle__slider">
                        ${ this.onlabel ? html`<span class="z-toggle__slider-on-label">${this.onlabel}</span>`: ''}
                        ${ this.offlabel ? html`<span class="z-toggle__slider-off-label">${this.offlabel}</span>`: ''}
                    </div>
                </div>

                ${ !this.right ? html`<label class="z-toggle__label">${this.label}</label>` : '' }

            </div>
        `
    }

    toggleChecked(e) {
        if (!this.disabled) {
            this.active = !this.active
            this.shadowRoot.querySelector('input[type="checkbox"]').focus()
        }
    }
}