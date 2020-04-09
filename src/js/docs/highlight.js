import hljs from 'highlight.js/lib/highlight'
import html from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'

// syntax highlighting
hljs.registerLanguage('html', html)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.initHighlightingOnLoad()