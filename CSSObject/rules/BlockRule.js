/**
 * Class BlockRule
 * @class BlockRule
 */
class BlockRule {

	/**
	 * Initialize BlockRule
	 * @param {string} block
	 */
	constructor(block) {
		this.block = block
	}

	/**
	 * set block rule
	 * @param {object} block block with query, selectors and rules
	 */
	set block({query, selectors, rules}) {
		this.query = query
		this.selectors = selectors
		this.rules = rules
	}

}


export default BlockRule