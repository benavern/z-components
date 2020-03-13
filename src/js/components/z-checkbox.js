const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            --checked: #0088c5;
            --blur: #889;
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

        .z-checkbox:hover {
            cursor: pointer;
        }

        .z-checkbox:hover .z-checkbox__item {
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

        .z-checkbox input[type="checkbox"]:disabled + .z-checkbox__item {
            opacity: .5;
            cursor: not-allowed;
        }
    </style>

    <div class="z-checkbox">
        <label class="z-checkbox__label-before"></label>

        <input type="checkbox">
        <span class="z-checkbox__item"></span>

        <label class="z-checkbox__label-after"></label>
    </div>
`

export class ZCheckbox extends HTMLElement {

    constructor () {
        super()
        // give context to the methods used in event listeners
        this.checkboxAction = this.checkboxAction.bind(this)

        // create a shadowDom
        this.root = this.attachShadow({ mode: 'open' })
        this.root.appendChild(template.content.cloneNode(true))

        // expose the usefull shadowDom parts through all the class
        this.$el = this.root.querySelector('.z-checkbox')
        this.$checkbox = this.$el.querySelector('input[type="checkbox"]')
        this.$label = this.labelLeft
            ? this.$el.querySelector('.z-checkbox__label-before')
            : this.$el.querySelector('.z-checkbox__label-after')
    }

    connectedCallback() {
        // set the default values
        this.$checkbox.checked = this.value
        this.$checkbox.disabled = this.disabled
        this.$label.textContent = this.label

        // connect the event listeners
        this.$el.addEventListener('click', this.checkboxAction)
    }

    disconnectedCallback() {
        // remove the listeners
        this.$el.addEventListener('click', this.checkboxAction)
    }

    checkboxAction(e) {
        if (!this.disabled) {
            this.value = !this.value
        }
    }

    static get observedAttributes() {
        return ['checked']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(newValue !== oldValue) {
            this.$checkbox.checked = typeof newValue === 'string'
        }
    }

    get value() {
        return this.hasAttribute('checked')
    }
      
    set value(newValue) {
        // set checked or remove the attribute if no value
        if (newValue) this.setAttribute('checked', '')
        else this.removeAttribute('checked')
    }

    get label() {
        return this.getAttribute('label')
    }

    get disabled() {
        return this.hasAttribute('disabled')
    }

    get labelLeft() {
        return this.getAttribute('label-position') === 'left'
    }
}