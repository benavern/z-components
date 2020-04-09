// handle menu toggle
const $menuBtn = document.querySelector('aside .toggle-menu')
const $menuEl = document.querySelector('aside nav')

// on click
$menuBtn.addEventListener('click', e => {
    e.preventDefault()
    $menuEl.classList.toggle('visible')
})