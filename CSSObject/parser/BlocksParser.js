import ICSS from "../enums/ICSS.js"
import Rule from "../rules/Rule.js"
import Selector from "../queries/Selector.js"
import BlockRule from "../rules/BlockRule.js"
import VariableRule from "../rules/VariableRule.js"
import CommentBlock from "./CommentBlock.js"


/**
 * Class BlocksParser
 * @class BlocksParser
 */
const BlocksParser = (Base) => class extends Base {

    /**
     * get block
     * @param {object} block object block
     * @returns object
     */
     block(block) {
        let [ query, rules ] = block.split(ICSS.BLOCK.BEGIN)

        return new BlockRule({
            query: query.trim(),
            selectors: this.selectors(query),
            rules: this.rules(rules)
        })
    }

    /**
     * get selectors of block
     * @param {string} query 
     * @returns Selector[]
     */
    selectors(query) {
        return query.split(ICSS.COMMA)
            .map(s => new Selector(s.trim()))
    }

    /**
     * get rules of block
     * @param {string} rules 
     * @returns Rule[]
     */
    rules(rules) {
        rules = this.dataURI(rules)
        
        return rules.split(ICSS.SEMICOLON)
            .filter(r => r.trim() != ICSS.EMPTY)
            .filter(r => !r.includes(ICSS.BRACKET.EMPTY))
            .filter(r => !r.split(ICSS.DOTS).map(i => i.trim()).includes(ICSS.EMPTY))
            .map(rule => {
                let [ prop, value ] = rule.split(ICSS.DOTS).map(i => i.trim())
                return new Rule(prop, ICSS.REGEX_REPLACE(value, ICSS.DATA_URI.VALUES))
            })
    }

    /**
     * get variables of blocks
     * @param {array} blocks
     * @param {object} statments
     * @returns VariableRule[]
     */
    variables(blocks, statments) {
        let variables = []

        blocks.map(b => {
            let rules = b.rules.filter(r => r.prop.startsWith(ICSS.VARIABLE))
            if (rules.length > 0)
                rules.map(r => variables.push(new VariableRule(r.prop, r.value, b.query)))
        })

        Object.entries(statments).map(([stat, statrules]) => {
            statrules.map(blcks => {
                if (blcks.blocks) blcks.blocks.map(b => {
                    let rules = b.rules.filter(r => r.prop.startsWith(ICSS.VARIABLE))
                    if (rules.length > 0) rules.map(r => {
                        variables.push(new VariableRule(r.prop, r.value, b.query, stat))
                    })
                })
            })
        })

        return variables
    }

    /**
     * get comments block
     * @param {string} cssText
     * @returns CommentBlock[]
     */
     comment(cssText) {
        let comments = []
        let comment_block = []
        const commentblck = (text, line) => {
            text.split(ICSS.COMMENT.BEGIN)
                .filter(i => i.trim() != ICSS.EMPTY)
                .forEach(c => {
                    let comment = c.split(ICSS.COMMENT.END).shift()
                    comments.push(new CommentBlock(comment, line))
                })
        }

        cssText.split('\n').forEach((l, i) => {
            let comment = ICSS.REGEX_REPLACE(l, {'\r': '', '\t': ''})
            let line = ++i

            if (comment.includes(ICSS.COMMENT.BEGIN)) {
                if (comment.includes(ICSS.COMMENT.END)) {
                    commentblck(comment, line)
                } else { comment_block.push({comment, line}) }
            } else if (comment_block.length > 0) {
                if (comment.includes(ICSS.COMMENT.END)) {
                    comment_block.push({comment, line})
                    commentblck(comment_block.map(i => i.line).join("\n"), comment_block.map(i => i.n))
                    comment_block = []
                } else { comment_block.push({comment, line}) }
            }
        })

        return comments
    }

    /**
     * find and replace keys of data URI's (data URI support)
     * @param {string} rules 
     * @returns {string}
     */
    dataURI(rules) {
        if (rules.includes(ICSS.DATA_URI.KEY)) {
            let uris = rules.split(ICSS.BRACKET.BEGIN)
                .filter(r => r.includes(ICSS.BRACKET.END))
                .map(r => {
                    if (r.startsWith(r)) return r.split(ICSS.BRACKET.END).shift()
                })
            
            uris.map(uri => rules = rules.replace(uri, ICSS.REGEX_REPLACE(uri, ICSS.DATA_URI.KEYS)))
        }
        
        return rules
    }

}


export default BlocksParser
