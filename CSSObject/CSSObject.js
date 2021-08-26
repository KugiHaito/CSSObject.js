import CSSParser from "./CSSParser.js"


/**
 * CSSObject Main Class
 * parse yours css files and local stylesheets
 */
 class CSSObject extends CSSParser {

	/**
	 * CSSObject constructor
	 * @param {object} options
	 * @returns CSSObject
	 */
	constructor(options = {}) {
		super()
		
		this.options = options

		this.stylesheets = Object.values(document.styleSheets)
			.map(sheet => sheet.ownerNode.innerText)
			.filter(str => str != "")
		
		this.stylesheets.map(css => this.parse(css))

		return this
	}
}


export default CSSObject
