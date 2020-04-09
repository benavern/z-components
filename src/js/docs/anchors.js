// create anchor links on headings with an ID

const $headings = document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id]')

$headings.forEach($el => {
    const $link = document.createElement('a');
    $link.className = 'heading-link'
    $link.href = `#${$el.id}`
    $link.text = '#'
    $link.title = 'eheh'

    $el.prepend($link)
})