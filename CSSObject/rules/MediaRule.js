/**
 * Class MediaRule
 * @class MediaRule
 */
class MediaRule {

	/**
	 * Initialize MediaRule
	 * @param {string} query
	 * @param {string} blocks
	 * @returns {MediaRule}
	 */
	constructor(query, blocks) {
		[this.query, this.blocks ] = [ query, blocks ]
	}

}


export default MediaRule
