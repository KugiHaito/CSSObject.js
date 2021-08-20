import CSSObject from './CSSObject/CSSObject.js'

// get stylesheets (not link)
let sheets = Object.values(document.styleSheets)
	.map(sheet => sheet.ownerNode.innerText)
	.filter(s => s != "")

sheets.forEach(sheet => {

	// get and show css object
	let cssobj = new CSSObject(sheet)

	// display css object
	console.log(cssobj)

})
