import CSSObject from './CSSObject/CSSObject.js'

// get stylesheets (not link)
let sheets = Object.values(document.styleSheets)
	.map(sheet => sheet.ownerNode.innerText)
	.filter(s => s != "")

sheets.forEach(sheet => {

	// get css object
	let cssobj = new CSSObject(sheet)

	// convert to json
	let cssjson = JSON.stringify(cssobj, null, '    ')

	// print on page
	let tag = document.querySelector('.cssobject code')
	tag.innerText = cssjson.trim()

	console.log(cssobj) // too shows on console :p
})
