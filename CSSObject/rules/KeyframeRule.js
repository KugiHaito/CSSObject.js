import BlocksParser from "../parser/BlocksParser.js"
import ParserBlock from "../parser/ParserBlock.js"
import ICSS from "../enums/ICSS.js"


/**
 * Class KeyframeRule
 * @class KeyframeRule
 */
class KeyframeRule extends BlocksParser(ParserBlock) {

    /**
     * Initialize KeyframeRule
     * @param {string} name animation name
     * @param {string} keyframe css blocks
     * @returns {KeyframeRule}
     */
    constructor(name, keyframe) {
        super()

        this.name = name
        this.keyframe = keyframe
        return this
    }

    set keyframe(values) {
        let blcks = values.split(ICSS.BLOCK.END)
        this.blocks = blcks.map(b => this.block(b.trim()))
    }

}


export default KeyframeRule
