import Rule from "./Rule.js"
import ICSS from "../enums/ICSS.js"
import IMedia from "../enums/IMedia.js"
import ParserBlock from "../parser/ParserBlock.js"
import BlocksParser from "../parser/BlocksParser.js"


/**
 * Class MediaRule
 * @class MediaRule
 */
class MediaRule extends BlocksParser(ParserBlock) {

	/**
	 * Initialize MediaRule
	 * @param {string} query
	 * @param {string} blocks
	 * @returns {MediaRule}
	 */
	constructor(query, blocks) {
		super()

		this.media = { query, blocks }
		return this
	}

	set media({query, blocks}) {
		this.querie = query
		this.blocks = blocks
			.split(ICSS.BLOCK.END)
			.map(b => this.block(b))
	}

	set querie(value) {
		this.query = value
		this.queries = this.query.split(ICSS.COMMA)
			.map(qrie => {
				let mediaQuerie = {types: [], rules: [], only: false, not: false}

				qrie.split(/and+(\s+\([^)]*\))?/g)
					.map(i => i.trim()).filter(i => i != '')
					.map(r => {
						let rule = r.trim()

						if (rule.includes(ICSS.DOTS)) {
							let [ prop, value ] = rule.replace(/[\(\)]/g, '')
								.split(ICSS.DOTS).map(i => i.trim())
							
							mediaQuerie.rules.push(new Rule(prop, value))
							return
						}

						IMedia.ONLY_OR_NOT.map(operator => {
							if (rule.startsWith(operator)) {
								rule = rule.replace(operator, '').trim()
								mediaQuerie[operator] = true
							}
						})

						if (IMedia.MEDIA_TYPES.includes(rule))
							mediaQuerie.types.push(rule)
				})

				return { ...mediaQuerie }
			})
	}

}


export default MediaRule
