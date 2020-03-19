# Z Components

A set of web components I'd like to use more often...

## Getting Started

First install the lib in your project

```bash
npm i z-components
```

Then import what you need and use it

```js
// main.js
import { ZInput, ZTextArea, ZCheckbox } from "./z-components"

customElements.define('z-input', ZInput)
customElements.define('z-textarea', ZTextArea)
customElements.define('z-checkbox', ZCheckbox)

```

### Prerequisites

These web components are guarented to work on these browsers:

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

## Versioning

We use [SemVer](http://semver.org/) for versioning.

We use gitflow for development workflow.

## Authors

* **Benjamin Caradeuc** - *Initial work* - [benavern](https://github.com/benavern)

See also the list of [contributors](https://github.com/benavern/z-components/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
