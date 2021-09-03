import ICSS from "../enums/ICSS.js"
import Rule from "./Rule.js"


/**
 * Class ImportRule
 * @class ImportRule
 */
class ImportRule {

	/**
	 * Initialize ImportRule
	 * @param {string} url
	 * @param {string} where
	 * @returns {ImportRule}
	 */
	constructor(url, where = null) {
		this.import = { url, where }

		return this
	}

	set import({url, where}) {
		this.url = url
		if (where != null) {
			this.where = []
			where.split(ICSS.COMMA)
				.map(w => {
					w.split(/and+(\s+\([^)]*\))?/g)
						.map(i => i.trim()).filter(i => i != "")
						.map(wh => {
							if (wh.includes(ICSS.DOTS)) {
								let [ prop, value ] = wh.replace(/[\(\)]/g, '')
									.split(ICSS.DOTS).map(i => i.trim())
								
								this.where.push(new Rule(prop, value))
							} else { this.where.push(wh.trim()) }
						})
						
						return this.where
				})
		}
	}

}


export default ImportRule
