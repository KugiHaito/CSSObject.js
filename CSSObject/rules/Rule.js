import ICSS from '../interfaces/ICSS.js';


/**
 * Rule Class
 * CSS rule object
 */
class Rule {

	/**
	 * Rule Constructor
	 * @param {string} prop property name
	 * @param {string} value rule values
	 * @return Rule object
	 */
	constructor(prop, value) {
		this.prop = prop
		this.value = value

		return this
	}

	/**
	 * get property of rule
	 * @return string property
	 */
	get property() {
		return this.prop
	}

	/**
	 * get value of rule
	 * @return string value
	 */
	get value() {
		return this._value.value
	}

	/**
	 * set value and details of rule
	 * @param {string} values
	 */
	set value(value) {
		let func_values = []

		if (value.includes(ICSS.BRACKET.END)) {
			let v = value.split(ICSS.BRACKET.END).map(s => s.trim());v.pop()
			let functions = v.map(s => {
				let [ func, values ] = s.split(ICSS.BRACKET.BEGIN).map(s => s.trim());let f = {}
				f[func.replaceAll('-', '_')] = (values.includes(ICSS.DATA_URI.KEY))?
					[ values ]:values.split(ICSS.COMMA).map(v => v.trim().split(' '))

				func_values.push(values)
				return f
			})

			this.details = { functions }
		}

		// ADD: Support to multiple values
		// if (func_values.length > 0) {
		// 	let v = val.replace(new RegExp(func_values.join('|'), 'g'), '')
		// 	let values = v.split(ICSS.COMMA).map(s => s.trim())
		// }

		this._value = Object.assign({ value }, this.details)
	}
}

export default Rule
