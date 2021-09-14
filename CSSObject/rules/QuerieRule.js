/**
 * Class QuerieRule
 * @class QuerieRule
 */
class QuerieRule {

	/**
	 * Initialize QuerieRule
	 * @param {string} rule
	 */
	constructor(rule) {
		this.rule = rule
		return this
	}

	/**
	 * set querie rule
	 * @param {object} rule rules, types, only and not properties
	 */
	set rule({rules, types, only, not}) {
		this.rules = rules
		this.types = types
		this.only = only
		this.not = not
	}

}


export default QuerieRule
