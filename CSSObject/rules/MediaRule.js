import ICSS from "../enums/ICSS.js"
import ParserBlock from "../parser/ParserBlock.js"
import BlocksParser from "../parser/BlocksParser.js"


/**
 * Class MediaRule
 * @class MediaRule
 */
class MediaRule extends BlocksParser(ParserBlock) {

	/**
	 * Initialize MediaRule
	 * @param {string} query
	 * @param {string} blocks
	 * @returns {MediaRule}
	 */
	constructor(query, blocks) {
		super()

		this.media = { query, blocks }
		return this
	}

	set media({query, blocks}) {
		this.query = query
		this.blocks = blocks
			.split(ICSS.BLOCK.END)
			.map(b => this.block(b))
	}

}


export default MediaRule
