import CSSObject from "./CSSObject/CSSObject.js"


// get css object
let cssobj = new CSSObject()

// print on page
let tag = document.querySelector('.cssobject code')
tag.innerText = JSON.stringify(cssobj, null, '    ')

// too shows on console
console.log(cssobj)
