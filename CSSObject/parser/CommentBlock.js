import ICSS from "../enums/ICSS.js"


/**
 * Class CommentBlock
 * @class CommentBlock
 */
class CommentBlock {

	/**
	 * Initialize CommentBlock
	 * @param {string} block
	 */
	constructor(block, line) {
		this.block = block
		this.line = line

		return this
	}

	/**
	 * set text comment
	 * @property text
	 * @param {string} value
	 */
	set block(value) {
		this.text = value.replace(/[*/]/g, "")
	}

	/**
	 * get comment (without spaces)
	 * @property comment
	 * @returns string
	 */
	get comment() {
		return this.text.trim()
	}

	/**
	 * get comment line with delimeters
	 * @returns string
	 */
	toString() {
		return `${ICSS.COMMENT.BEGIN + this.text + ICSS.COMMENT.END}`
	}

}


export default CommentBlock