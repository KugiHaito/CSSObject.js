import CSSObject from "./CSSObject/CSSObject.js"


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

// get local stylesheets
cssobj.local(style => printJSON(style))

// get external stylesheets
cssobj.options({ load_min: false })
	.external(style => printJSON(style))
