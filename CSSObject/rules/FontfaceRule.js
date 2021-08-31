import BlocksParser from "../parser/BlocksParser.js"
import ParserBlock from "../parser/ParserBlock.js"


/**
 * Class FontfaceRule
 * @class FontfaceRule
 */
class FontfaceRule extends BlocksParser(ParserBlock) {

	/**
	 * Initialize FontfaceRule
	 * @param {string} fontface
	 * @returns {FontfaceRule}
	 */
	constructor(fontface) {
		super()

		this.fontface = fontface
		return this
	}

	set fontface(values) {
		this.rules = this.rules(values)
		let r = this.rules

		this.name = r.find(r => r.prop == 'font-family').value
	}

}


export default FontfaceRule
