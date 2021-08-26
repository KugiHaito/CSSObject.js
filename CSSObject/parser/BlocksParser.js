import ICSS from "../enums/ICSS.js"
import Selector from "../queries/Selector.js"
import Rule from "../rules/Rule.js"


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

		return {
			query: query.trim(),
			selectors: this.selectors(query),
			rules: this.rules(rules)
		}
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
			.filter(r => r != "")
			.map(rule => {
				let [ prop, value ] = rule.split(ICSS.DOTS)
				return new Rule(prop, ICSS.REGEX_REPLACE(value, ICSS.DATA_URI.VALUES))
			})
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
