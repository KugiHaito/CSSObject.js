import ICSS from "../enums/ICSS.js"
import ICombinator from "../enums/ICombiner.js"
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

	type(type) {
		Object.entries(ISelector).map(([selector, char]) => {
			if (type == char) this.type = selector
		})
	}

	/**
	 * set selector property
	 * @param {string} value new value
	 */
	set selector(value) {
		this.name = value
		this.type(value.substr(0, 2).replace(/[a-z]+/, ''))

		let v = value.replace('~=', '/=/')
		Object.entries(ICombinator).map(([combinator, char]) => {
			if (v.includes(char)) {
				this.combinator = combinator
				this.selectors = v.split(char)
					.map(s => new Selector(s.trim().replace('/=/', '~=')))
			}
		})

		if (!this.combinator) {
			let selct = value.replace(ISelector[this.type], ICSS.EMPTY)
			let sign = selct.replace(/[a-z*+^~$=|\'\'\"\"\[\]-]+/g, '')
			if (ICSS.PSEUDO.KEYS.includes(sign))
				this.pseudo = new Pseudo(sign + selct.split(sign).pop())
		}
	}
}


export default Selector
