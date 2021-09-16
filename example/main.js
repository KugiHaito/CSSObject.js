import CSSObject from "../CSSObject/CSSObject.js"


// to show cssobj stylesheet on page
let div = document.querySelector('.cssobject')
const printJSON = (style) => {
    console.log(style)
    let cssjson = JSON.stringify(style, null, '    ')
    let pre = document.createElement('pre'),
    code = document.createElement('code')
    code.innerText = cssjson
    pre.appendChild(code)
    div.appendChild(pre)
}

// instance css object
let cssobj = new CSSObject()

// set options
cssobj.options({ load_min: false, ignore_files: ['demo.css'] })
    // get external stylesheets
    .external(style => printJSON(style))
    // get local stylesheets
    .local(style => printJSON(style))
