import ICSS from "../enums/ICSS.js"
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
	 * set selector property
	 * @param {string} value new value
	 */
	set selector(value) {
		this.name = value
		Object.entries(ISelector).map(([selector, char]) => {
			if (value.substr(0, 2).replace(/[a-z]+/, '') == char)
				this.type = selector
		})

		let selct = value.replace(ISelector[this.type], ICSS.EMPTY)
		let sign = selct.replace(/[a-z*+^~$=|\'\'\"\"\[\]-]+/g, '')
		if (ICSS.PSEUDO.KEYS.includes(sign))
			this.pseudo = new Pseudo(sign + selct.split(sign).pop())
	}
}


export default Selector
