/**
 * Class KeyframeRule
 * @class KeyframeRule
 */
class KeyframeRule {

	/**
	 * Initialize KeyframeRule
	 * @param {string} name animation name
	 * @param {string} blocks
	 * @returns {KeyframeRule}
	 */
	constructor(name, blocks) {
		[ this.name, this.blocks ] = [ name, blocks ]
		
		return this
	}

}


export default KeyframeRule
