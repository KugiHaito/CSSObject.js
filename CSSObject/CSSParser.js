import StatmentsParser from "./parser/StatmentsParser.js"
import BlocksParser from "./parser/BlocksParser.js"
import ParserBlock from "./parser/ParserBlock.js"
import ICSS from "./enums/ICSS.js"


/**
 * Parser CSS to CSSObject
 * @class CSS Parser
 */
class CSSParser extends StatmentsParser(BlocksParser(ParserBlock)) {

	/**
	 * Initialize CSSParser
	 * @param {string} style css text
	 * @returns {CSSParser}
	 */
	constructor(style = null) {
		super()
	
		if (style != null) this.parse(style)
		return this
	}

	/**
	 * parser css
	 * @method parser to parser css
	 * @param {string} style_text css style text
	 */
	parse(style) {
		this.css = this.clean(style)
		let rule_blocks = this.statments()
			.split(ICSS.BLOCK.END);rule_blocks.pop()

		this.blocks = rule_blocks
			.map(b => this.block(b))

		delete this.css
		return this.blocks
	}

	/**
	 * clean code css
	 * remove comments, breaklines and tabs
	 * @returns string
	 */
	clean(cssText) {
		this.comments = []
		let css = ICSS.REGEX_REPLACE(cssText, {'\n': '', '\t': ''})
		css.split('/*')
			.map(blck => {
				let comment = blck.split('*/').shift()

				css = css.replace(`/*${comment}*/`, ICSS.EMPTY)
				if (comment != "") this.comments.push(comment.trim())
			})
		
		return css
	}
}


export default CSSParser
