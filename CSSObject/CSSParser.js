import StatmentsParser from "./parser/StatmentsParser.js"
import BlocksParser from "./parser/BlocksParser.js"
import ParserBlock from "./parser/ParserBlock.js"
import CommentBlock from "./parser/CommentBlock.js"
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
		this.comment(style)
		
		this.css = this.clean(style)
		let rule_blocks = this.statments()
			.split(ICSS.BLOCK.END);rule_blocks.pop()

		this.blocks = rule_blocks
			.map(b => this.block(b))

		return this.blocks
	}

	comment(cssText) {
		this.comments = []
		let blck = []

		cssText.split('\n').forEach((l, i) => {
			let line = ICSS.REGEX_REPLACE(l, {'\n': '', '\r': '', '\t': ''})
			let n = ++i

			if (line.includes(ICSS.COMMENT.BEGIN)) {
				if (line.includes(ICSS.COMMENT.END)) {
					this.comments.push(new CommentBlock(line, n))
				} else { blck.push({line, n}) }
			} else if (blck.length > 0) {
				if (line.includes(ICSS.COMMENT.END)) {
					let lines = blck.map(i => i.line).join("")
					this.comments.push(new CommentBlock(lines, blck.map(i => i.n)))
					blck = []
				} else { blck.push({line, n}) }
			}
		})
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
