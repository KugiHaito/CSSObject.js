import ICSS from "../enums/ICSS.js"
import ICSSStatments from "../enums/ICSSStatments.js"
import ImportRule from "../rules/ImportRule.js"
import FontfaceRule from "../rules/FontfaceRule.js"
import KeyframeRule from "../rules/KeyframeRule.js"
import MediaRule from "../rules/MediaRule.js"
import CharsetRule from "../rules/CharsetRule.js"


/**
 * Class StatmentsParser to CSSParser
 * @class StatmentsParser
 */
const StatmentsParser = (Base) => class extends Base {

	/**
	 * get css statments
	 * @returns string
	 */
	 statments() {
		this.stats = {}
		this.css
			.split(ICSS.AT)
			.map(blck => {
				Object.entries(ICSSStatments).map(([key, stat]) => {
					if (blck.startsWith(stat.KEY)) {
						let stat_block = blck.split(stat.DELIMITER).shift()
						this[key.toLowerCase()].call(this, stat_block.replace(stat.KEY, ICSS.EMPTY).trim())
						this.css = this.css
							.replace(`${ICSS.AT + stat_block + stat.DELIMITER}`, ICSS.EMPTY)
					}
				})
			})

		return this.css
	}

	/**
	 * get statment block
	 * @param {string} blck
	 */
	charset(blck) {
		let type = blck.replaceAll('"', '')
		this.stats.charsets.push(new CharsetRule(type))
	}

	/**
	 * get stament block
	 * @param {string} block
	 */
	import(block) {
		let [ url, where ] = block
			.replace(' ', '|').split('|').map(i => i.trim())

		this.stats.imports.push(new ImportRule(url, where))
	}
	
	/**
	 * get stament block
	 * @param {string} block 
	 */
	fontface(block) {
		let rules = block
			.split(ICSS.BLOCK.BEGIN).pop().trim()
		
		this.stats.fontfaces.push(new FontfaceRule(rules))
	}
	
	/**
	 * get stament block
	 * @param {string} block 
	 */
	keyframe(block) {
		let [ name, blocks ] = block
			.replace(ICSS.BLOCK.BEGIN, '|').split('|').map(i => i.trim())

		this.stats.keyframes.push(new KeyframeRule(name, blocks))
	}
	
	/**
	 * get stament block
	 * @param {string} block 
	 */
	media(block) {
		let [ query, blocks ] = block
			.replace(ICSS.BLOCK.BEGIN, '|').split('|')
			.map(i => i.trim())

		this.stats.medias.push(new MediaRule(query, blocks))
	}

	/**
	 * get statments
	 * @property statments
	 * @return {object}
	 */
	 get stats() {
		return this.statments
	}

	/**
	 * set statments
	 * @property staments
	 * @param {object} value
	 */
	set stats(value) {
		this.statments = value
		Object.keys(ICSSStatments)
			.map(stat => this.statments[`${stat.toLowerCase()}s`] = [])
	}

}


export default StatmentsParser
