/**
 * Class Stylesheet
 * @class Stylesheet
 */
class Stylesheet {

	/**
	 * Initialize Stylesheet
	 * @param {string} stylesheet
	 */
	constructor(stylesheet, filename = null) {
		this.cssText = stylesheet
		this.filename = filename

		return this
	}

	/**
	 * alias to cssText property
	 * @property {string} css
	 */
	get css() {
		return this.cssText
	}

}


export default Stylesheet
