import { LitElement, html, css } from 'lit-element';

export class ZTabGroup extends LitElement {

    static get styles() {
        return css`
            :host {
                --active: var(--z-primary-color, #0088c5);
                --blur: var(--z-secondary-color, #889);

                display: block;
            }

            * {
                box-sizing: border-box;
            }

            .z-tab-group {
                margin: 1em 0;
                display: flex;
                flex-direction: column;
            }

            .z-tab-group.vertical {
                flex-direction: row;
            }

            .z-tab-group .z-tab-group__header {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
            }

            .z-tab-group.vertical .z-tab-group__header {
                flex-direction: column;
            }

            .z-tab-group .z-tab-group__header .z-tab-group__header-item {
                border: none;
                border-bottom: .1em solid transparent;
                background: none;
                padding: 1em 3em;
                font-family: inherit;
                font-size: inherit;
                font-weight: bold;
                white-space: nowrap;
            }

            .z-tab-group.vertical .z-tab-group__header .z-tab-group__header-item {
                border-bottom: none; 
                border-right: .1em solid transparent;
            }
            
            .z-tab-group .z-tab-group__header .z-tab-group__header-item.active {
                border-color: var(--active);
            }

            .z-tab-group .z-tab-group__header .z-tab-group__header-item:hover {
                background-color: rgba(0, 0, 0, .1);
                cursor: pointer;
            }
            
            .z-tab-group .z-tab-group__header .z-tab-group__header-item:focus {
                outline-style: auto;
                outline-color: var(--active);
            }

            .z-tab-group .z-tab-group__content {
                border-top: 1px solid var(--blur);
                flex: 1;
            }

            .z-tab-group.vertical .z-tab-group__content {
                border-top: none;
                border-left: 1px solid var(--blur);
                padding-left: .5em;
            }
        `
    }

    static get properties() {
        return {
            vertical: { type: Boolean },
            active: { type: String, reflect: true },
            labels: { type: Array, attribute: false }
        };
    }

    constructor() {
        super()
        this._labels = []
    }

    get labels() {
        return html`
            ${this._labels.map(label => html`
                <button 
                    class="z-tab-group__header-item ${this.active === label ? 'active' : ''}" 
                    @click="${e => this.activateTab(e, label)}"
                    tabindex="${this.active === label ? '0' : '-1'}">
                    ${label}
                </button>
            `)}
        `
    }

    set labels(value) {
        const oldValue = this._labels
        this._labels = value
        this.requestUpdate('labels', oldValue)
    }

    render() {
        return html`
            <div class="z-tab-group ${this.vertical ? 'vertical' : ''}">
                <div class="z-tab-group__header">
                    ${this.labels}
                </div>

                <div class="z-tab-group__content">
                    <slot></slot>
                </div>
            </div>
        `
    }

    firstUpdated() {
        const tabs = [...this.children].filter(child => child.tagName === 'Z-TAB')

        this.labels = tabs.map((tab, i) => {
            return tab.getAttribute('label')
        })

        // if no default active value and a z-tab has 'active' attribute
        // make it the one active
        const domActive = tabs.find(tab => tab.hasAttribute('active'))
        if (!this.active && domActive) {
            this.active = domActive.getAttribute('label')

        // else if no default active value and no z-tab has 'active' attribute
        // make the first one active
        } else if (!this.active && tabs.length) {
            this.active = tabs[0].getAttribute('label')
        }
        
        this.shadowRoot.addEventListener('keydown', e => {
            let index = null
            const currentIndex = this._labels.indexOf(this.active)
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                index = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                index = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
            } else if (e.key === 'Home') {
                index = 0
            } else if (e.key === 'End') {
                index = tabs.length - 1
            }

            if (index !== null) {
                e.preventDefault()
                e.stopPropagation()
                this.active = tabs[index].getAttribute('label')

                // wait for the dom to be updated and then focus the newly active tab header button
                window.requestAnimationFrame(() => {
                    const tabHeaderBtn = this.shadowRoot.querySelector('.z-tab-group__header .z-tab-group__header-item.active')
                    if (tabHeaderBtn) tabHeaderBtn.focus()
                })
            }
        })
    }

    updated(changedProperties) {
        if (changedProperties.has('active')) {
            this.updateChildren()
        }
    }

    updateChildren() {
        const tabs = this.querySelectorAll('z-tab')

        tabs.forEach(tab => {
            if (tab.getAttribute('label') === this.active) {
                tab.setAttribute('active', '')
            } else {
                tab.removeAttribute('active')
            }
        })
    }

    activateTab(e, label) {
        e.preventDefault()
        this.active = label
        this.updateChildren()
    }
}
