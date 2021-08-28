import ICSS from "../enums/ICSS.js"


/**
 * Rule Class
 * CSS rule object
 */
class Rule {

	/**
	 * Rule Constructor
	 * @param {string} prop property name
	 * @param {string} value rule values
	 * @return {Rule} object
	 */
	constructor(property, value) {
		this.rule = [ property, value ]

		return this
	}

	/**
	 * set rule properties
	 * @param {string[]} value
	 */
	set rule(value) {
		let [ prop, val ] = value
		this.property = prop
		this.value = this.value(val)
	}

	/**
	 * alias to get property of rule
	 * @property property
	 * @return string property
	 */
	get prop() {
		return this.property
	}

	/**
	 * alias to set property og rule
	 * @property property
	 * @param {string} property
	 */
	set prop(property) {
		this.property = property
	}


	/**
	 * set value and details of rule
	 * @param {string} values
	 */
	value(value, step = true) {
		if (value.includes(ICSS.BRACKET.BEGIN) && step) {			
			let params = value.split(ICSS.BRACKET.BEGIN).filter(v => v.includes(')')).map(v => v.split(')').shift())
			let val = params.reduce((a, p, i) => a.replace(`(${p})`, `#${i}`), value)
			let v = val.split(val.includes(ICSS.COMMA)? ICSS.COMMA:" ")

			return params.reduce((a, p, i) => a.replace(`#${i}`, `(${p})`), v.join('|'))
				.split('|').map(v => this.value(v.trim(), false))
		} else if (value.includes(ICSS.BRACKET.END)) {
			let val = value.replace(ICSS.BRACKET.END, ''), func = {}
			let [ f, v ] = val.split(ICSS.BRACKET.BEGIN).map(v => v.trim())
			
			func[f.replaceAll('-', '_')] = (v.includes(ICSS.DATA_URI.KEY))?
				[ v ]:v.split(v.includes(ICSS.COMMA)? ICSS.COMMA:" ")
						.filter(v => v != ICSS.EMPTY).map(v => v.trim())
			
			return func
		}

		return value.split(ICSS.COMMA).map(v => v.trim())
	}
}


export default Rule
