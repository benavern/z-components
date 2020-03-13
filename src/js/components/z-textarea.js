function debounce(cb, delay) {
    let timeout

    return function () {
        const ctx = this
        const args = arguments

        clearTimeout(timeout)
        
        timeout = setTimeout(function () {
            cb.apply(ctx, args)
        }, delay)
    }
}

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            --blur: #889;
            --focus: #0088c5;
            display: block;
        }

        * {
            box-sizing: border-box;
        }

        .z-input {
            position: relative;
            margin: 1em 0;
        }

        .z-input .z-input__label {
            position: absolute;
            top: 1em;
            left: 0;
            transform: translate(0, 0) scale(1);
            transform-origin: left;
            transition: transform .3s;
            color: var(--blur);
        }

        .z-input .z-input__field {
            display: block;
            width: 100%;
            border: none;
            border-bottom: .1em solid var(--blur);
            background: transparent;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            resize: vertical;
            padding: 1em 0 .5em;
            min-height: 2.5em;
        }

        .z-input .z-input__field:focus,
        .z-input .z-input__field:not(:placeholder-shown) {
            outline: none;
            border-bottom-color: var(--focus);
        }

        .z-input .z-input__field:focus + .z-input__label,
        .z-input .z-input__field:not(:placeholder-shown) + .z-input__label {
            transform: translate(0, -1.5em) scale(.75);
            color: var(--focus);
        }
    </style>

    <div class="z-input">
        <textarea type="text" class="z-input__field" placeholder=" "></textarea>
        <label class="z-input__label"></label>
    </div>
`

export class ZTextArea extends HTMLElement {

    constructor () {
        super()
        // give context to the methods used in event listeners
        this.inputAction = this.inputAction.bind(this)
        this.resizeField = this.resizeField.bind(this)

        // create a shadowDom
        this.root = this.attachShadow({ mode: 'open' })
        this.root.appendChild(template.content.cloneNode(true))

        // expose the usefull shadowDom parts through all the class
        this.fieldEl = this.root.querySelector('.z-input__field')
        this.labelEl = this.root.querySelector('.z-input__label')

        this.label = this.getAttribute('label')
        this.autoresize = this.hasAttribute('autoresize')
    }

    connectedCallback() {
        // set the default values
        this.fieldEl.value = this.value;
        this.labelEl.textContent = this.label

        // connect the event listeners
        this.fieldEl.addEventListener('input', this.inputAction)

        if (this.autoresize) {
            this.resizeField()
            window.addEventListener('resize', debounce(this.resizeField, 200))
        }
    }

    disconnectedCallback() {
        // remove the listeners
        this.fieldEl.removeEventListener('input', this.inputAction)
        window.removeEventListener('resize', this.resizeField)
    }

    inputAction(e) {
        this.value = e.target.value

        if (this.autoresize) {
            this.resizeField()
        }
    }

    resizeField(e) {
        this.fieldEl.style.height = 'auto'
        this.fieldEl.style.height = this.fieldEl.scrollHeight + 'px'
    }

    static get observedAttributes() {
        return ['value']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(newValue !== oldValue) this.value = newValue
    }

    get value() {
        return this.getAttribute('value')
    }
      
    set value(newValue) {
        // set value or remove the attribute if no value exists inside the field
        if (newValue) this.setAttribute('value', newValue)
        else this.removeAttribute('value')
    }
}