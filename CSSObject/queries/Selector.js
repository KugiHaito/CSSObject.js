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
		let signs = Object.values(ISelector)
		let chars = Object.entries(ISelector)
			.reduce((a, [k, v]) => (Object.assign(a,{[v]: k})), {})

		this.name = value
		this.type = (signs.includes(value.substr(0, 2)) || signs.includes(value[0]))? 
			chars[signs.filter(i => value.substr(0, 2) == i)[0] || signs.filter(i => value[0] == i)]:chars[' ']

		let s = value.replace(Object.entries(chars)
			.map(([k, v]) => (v == this.type)? k : '')
			.filter(f => f != "")[0], '')
		
		ICSS.PSEUDO.KEYS.map(p => {
			if (s.includes(p))
				this.pseudo = new Pseudo(p + s.split(p)[(this.type == chars['::'])? 2:1])
		})
	}
}


export default Selector
