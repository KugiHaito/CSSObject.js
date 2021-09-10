import ICSS from "../enums/ICSS.js"
import Selector from "../queries/Selector.js"
import BlockRule from "../rules/BlockRule.js"
import Rule from "../rules/Rule.js"
import VariableRule from "../rules/VariableRule.js"


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
