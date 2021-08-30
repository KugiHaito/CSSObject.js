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
		this.value = this.values(val)
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
	 * get values of rule property
	 * @param {string} values
	 * @returns string[]
	 */
	values(values) {
		if (values.includes(ICSS.BRACKET.BEGIN)) {			
			let params = values.split(ICSS.BRACKET.BEGIN).filter(v => v.includes(')')).map(v => v.split(')').shift())
			let val = params.reduce((a, p, i) => a.replace(`(${p})`, `#${i}`), values)
			let v = val.split(val.includes(ICSS.COMMA)? ICSS.COMMA:" ")

			return params.reduce((a, p, i) => a.replace(`#${i}`, `(${p})`), v.join('|'))
				.split('|').map(v => this.value(v.trim()))
		}

		return this.value(values)
	}

	/**
	 * get value and details of rule
	 * @param {string} values
	 */
	value(values) {
		 if (values.includes(ICSS.BRACKET.END)) {
			let val = values.replace(ICSS.BRACKET.END, '')
			let [ func, value ] = val.split(ICSS.BRACKET.BEGIN).map(v => v.trim())
			value.split(value.includes(ICSS.COMMA)? ICSS.COMMA:" ")
				 .filter(v => v != ICSS.EMPTY).map(v => v.trim())
			
			return { func, value }
		}

		return values.split(ICSS.COMMA).map(v => v.trim())
	}
}


export default Rule
