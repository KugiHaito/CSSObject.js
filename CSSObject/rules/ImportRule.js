/**
 * Class ImportRule
 * @class ImportRule
 */
class ImportRule {

	/**
	 * Initialize ImportRule
	 * @param {string} url
	 * @param {string} where
	 * @returns {ImportRule}
	 */
	constructor(url, where = null) {
		[ this.url, this.where ] = [ url, where ]

		return this
	}

}


export default ImportRule
