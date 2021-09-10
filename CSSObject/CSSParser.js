import StatmentsParser from "./parser/StatmentsParser.js"
import BlocksParser from "./parser/BlocksParser.js"
import ParserBlock from "./parser/ParserBlock.js"
import CommentBlock from "./parser/CommentBlock.js"
import VariableRule from "./rules/VariableRule.js"
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
		this.comments = this.comment(style)
		this.css = this.clean(style)
		this.blocks = this.statments()
			.split(ICSS.BLOCK.END)
			.filter(i => i.trim() != "")
			.map(b => this.block(b))

		this.variables = this.variables(this.blocks, this.stats)
		return this
	}

	/**
	 * clean code css
	 * remove comments, breaklines and tabs
	 * @returns string
	 */
	clean(cssText) {
		let css = ICSS.REGEX_REPLACE(cssText, {'\n': '', '\r': '', '\t': ''})
		this.comments.map(c => css = css.replace(c.toString(), ICSS.EMPTY))
		
		return css
	}
}


export default CSSParser
