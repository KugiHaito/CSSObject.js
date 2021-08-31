import ICSS from "../enums/ICSS.js"
import ICombiner from "../enums/ICombiner.js"
import ISelector from "../enums/ISelector.js"
import Pseudo from "../queries/Pseudo.js"


/**
 * Selector Class
 * selector object for query selectors
 */
 class Selector {

	/**
	 * Selector constructor
	 * @param {string} selector selector name
	 * @returns Selector
	 */
	constructor(selector) {
		this.selector = selector
	
		return this
	}

	/**
	 * get selector type
	 * @param {string} value
	 */
	type(value) {
		Object.entries(ISelector).map(([selector, char]) => {
			if (value.substr(0, 3).replace(/[0-9a-z]+/, '') == char)
				this.type = selector

			if (value.substr(0, 3).startsWith(char))
				this.type = selector
		})
	}

	/**
	 * get selector combiners
	 * @param {string} value
	 */
	combiner(value) {
		this.hasCombiner = false
		let v = value.replace('~=', '/=/')
		Object.entries(ICombiner).map(([combiner, char]) => {
			if (v.includes(char)) {
				this.hasCombiner = true
				this.combiner = combiner
				this.selectors = v.split(char)
					.map(s => new Selector(s.trim().replace('/=/', '~=')))
			}
		})
	}

	/**
	 * get selector pseudo
	 * @param {string} value
	 */
	pseudo(value) {
		let selct = value.replace(ISelector[this.type], ICSS.EMPTY)
		let tag = selct.replace(/[a-z*+^~$=|\'\'\"\"\[\]-]+/, '')
		let sign = tag.substr(0, 2).replace(/[a-z-]/g, '')
		if (ICSS.PSEUDO.KEYS.includes(sign)) this.pseudo = new Pseudo(tag)
	}

	/**
	 * set selector property
	 * @param {string} value new value
	 */
	set selector(value) {
		this.name = value
		this.type(value)
		this.combiner(value)
		if (!this.hasCombiner) this.pseudo(value)
	}
}


export default Selector
