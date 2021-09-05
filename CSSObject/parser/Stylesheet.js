import CSSParser from "../CSSParser.js"


/**
 * Class Stylesheet
 * @class Stylesheet
 */
class Stylesheet extends CSSParser {

	/**
	 * Initialize Stylesheet
	 * @param {string} stylesheet
	 */
	constructor(stylesheet, filename = null) {
		super()

		this.cssText = stylesheet
		this.filename = filename
		this.parse(this.cssText)
		return this
	}

}


export default Stylesheet
