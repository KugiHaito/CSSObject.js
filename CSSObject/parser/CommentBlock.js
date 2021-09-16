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
        this.block = {block, line}

        return this
    }

    /**
     * set text comment
     * @param {string} value
     */
    set block({block, line}) {
        this.line = line
        this.text = block
            .split(ICSS.COMMENT.BEGIN).pop()
            .split(ICSS.COMMENT.END).shift()
        
        this.comment = this.text.trim()
            .replaceAll(ICSS.BREAK_LINE, ICSS.EMPTY)
    }

    /**
     * get comment line with delimeters
     * @returns string
     */
    toString() {
        let comment = this.text.replaceAll(ICSS.BREAK_LINE, ICSS.EMPTY)
        return `${ICSS.COMMENT.BEGIN + comment + ICSS.COMMENT.END}`
    }

}


export default CommentBlock