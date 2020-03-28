<center><a href="https://z-web-components.netlify.com/"><img src="./logo.png" alt="Z Web Components" title="Z Web Components"></a></center>

> An opinionated set of web components for building strong and fast applications.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6df436a-46b8-4461-84f7-ff6c037e2634/deploy-status)](https://app.netlify.com/sites/z-web-components/deploys)
[![npm version](https://badge.fury.io/js/z-web-components.svg)](https://badge.fury.io/js/z-web-components)

[DEMO & DOCS](https://z-web-components.netlify.com/)

---

## Getting Started

First install the lib in your project

```bash
npm i z-web-components
```

Then import what you need

```js
// main.js
import { ZInput, ZTextArea, ZCheckbox, ZToggle, ZRadioGroup, ZRadio, ZTabGroup, ZTab } from "./z-web-components"

customElements.define('z-input', ZInput)
customElements.define('z-textarea', ZTextArea)
customElements.define('z-checkbox', ZCheckbox)
customElements.define('z-toggle', ZToggle)
customElements.define('z-radio-group', ZRadioGroup)
customElements.define('z-radio', ZRadio)
customElements.define('z-tab-group', ZTabGroup)
customElements.define('z-tab', ZTab)
```

And use it in your html

```html
<!-- index.html -->
<z-input label="Text input with default value" value="default value"></z-input>

<z-textarea label="Textarea input with default value" value="default value"></z-textarea>

<z-checkbox label="checkbox input checked" checked></z-checkbox>

<z-toggle label="toggle input active" active></z-toggle>

<z-radio-group name="radio-demo" value="2">
    <z-radio label="radio input" value="1"></z-radio>
    <z-radio label="radio input" value="2"></z-radio>
</z-radio-group>

<z-tab-group>
    <z-tab label="tab-1">This is tab 1.</z-tab>
    <z-tab label="tab-2">This is tab 2.</z-tab>
    <z-tab label="tab-3">This is tab 3.</z-tab>
</z-tab-group>
```

### Prerequisites

The Z Web Components should work on these browsers:

```json
"browserslist": [
    ">2%",
    "Edge > 14",
    "Firefox > 63",
    "Chrome > 67"
]
```

## Built With

* [ParcelJs](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
* [LitElement](https://lit-element.polymer-project.org/) - A simple base class for creating fast, lightweight web components

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Development

Clone the repository

```bash
# ssh
git clone git@github.com:benavern/z-components.git z-web-components

# https
git clone https://github.com/benavern/z-components.git z-web-components
```

Install dependancies

```bash
cd z-web-components
npm i
```

Serve with hot reload and stuff

```bash
npm run dev
```

Build the lib

```bash
npm run build:lib
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

We use gitflow for development workflow.

## Authors

* **Benjamin Caradeuc** - *Initial work* - [benavern](https://github.com/benavern)

See also the list of [contributors](https://github.com/benavern/z-components/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
