import CSSParser from "./CSSParser.js"
import Stylesheet from "./parser/Stylesheet.js"


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
			.map((sheet) => new Stylesheet(sheet))
		
		this.stylesheets
			.map(sheet => this.parse(sheet.css))

		return this
	}
}


export default CSSObject
