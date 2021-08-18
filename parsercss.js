/**
 * ParserCSS Class
 */
class Parser {

	static get EMPTY() { return '' }

	static get DOTS() { return ':' }

	static get COMMA() { return ',' }

	static get SEMICOLON() { return ';' }

	static get BREAK_LINE() { return '\n' }

	static get BEGIN_BLOCK() { return '{' }

	static get END_BLOCK() { return '}' }

	static get END_BRACKET() { return ')' }

	static get END_BRACKET_RULE() { return ');' }

	static get DATA_URI() { return 'data:' }

	static get DATA_URI_KEYS() { return {':': '=', ';': '&'} }

	static get DATA_URI_VALUES() { return {'=': ':', '&': ';'} }

	static get REGEX_COMMENTS() { return /\/\*(\r|\n|.)*\*\//g }

	static get REGEX_BRACKETS() { return /\(([^)]+)\)/ }
	
	static REGEX_REPLACE(str, obj) {
	  let re = new RegExp(Object.keys(obj).join('|'), 'g')
	  return str.replace(re, i => obj[i])
	}

	constructor(css) {
		this.css = css
		this.parseCSS()

		delete this.rules
		delete this.query
		return this.blocks
	}

	/**
	 * get blocks of queries and rules
	 * @param string css
	 * @return object rule
	 */
	parseCSS(css = '') {
		this.blocks = []
		this.css = (css != Parser.EMPTY)? css:this.css
		this.blocksRule = this.clearCode().split(Parser.END_BLOCK)
		this.blocksRule.pop()

		this.blocksRule.map(block => {
			[this.query, this.rules] = block.split(Parser.BEGIN_BLOCK)

			this.blocks.push({
				query: this.query.trim(),
				selectors: this.parseCSSQuery(),
				rules: this.parseCSSBlock()
			})
		})

		return this.blocks
	}

	/**
	 * set property and values of declarations
	 * @param string css
	 * @return object rule
	 */
	parseCSSBlock(rules = '') {
		this.blockRules = []
		this.rules = (rules != Parser.EMPTY)? rules : this.rules
		this.parseCSSRules()
			.split(Parser.SEMICOLON)
			.map(decl => {
				let [prop, value] = decl.split(Parser.DOTS).map(i => i.trim())
				if (prop != Parser.EMPTY && value != Parser.EMPTY)
					this.blockRules.push(new Rule(prop, Parser.REGEX_REPLACE(value, Parser.DATA_URI_VALUES)))
			})

		return this.blockRules
	}

	/**
	 * parse css rules
	 * @param string css rules
	 * @return string
	 */
	parseCSSRules() {
		let params = {}
		return this.rules.split(Parser.BREAK_LINE)
			.filter(d => d != Parser.EMPTY)
			.map(decl => {
				if (decl.includes(Parser.END_BRACKET_RULE)) {
					let [p_keys, match, params, d] = [[], [], {}, decl]
					while (match = Parser.REGEX_BRACKETS.exec(d)) {
						p_keys.push(match[1])
						d = d.replace(match[1], '')
					}
					p_keys.map(p => {
						if (p.includes(Parser.DATA_URI)) {
						params[p] = Parser.REGEX_REPLACE(p, Parser.DATA_URI_KEYS)
						decl = Parser.REGEX_REPLACE(decl, params)
						}
					})
				}

				return decl.trim()
			}).join('')
	}

	/**
	* parse css selectors
	* @return array Selector
	*/
	parseCSSQuery() {
		return this.query
			.trim()
			.split(Parser.COMMA)
			.map(s => s.trim())
	}

	/**
	 * clear code and remove comments
	 * @param string css
	 * @return string css
	*/
	clearCode(css = '') {
		this.css = ((css != Parser.EMPTY)? css:this.css)
			.replace(Parser.REGEX_COMMENTS, Parser.EMPTY)
		return Parser.REGEX_REPLACE(this.css, {' ':'', '\n': '', '\t': ''})
	}
}


/**
 * Rule Class
 */
class Rule {

	/**
	 * Rule Constructor
	 * @param string prop
	 * @param string value
	 * @return object Rule
	 */
	constructor(prop, value) {
		this.prop = prop
		this.value = this.set(value)

		return this
	}

	/**
	 * set details of value rule
	 * @return object
	 */
	set(value) {
	  this.value = value
		if (this.value.includes(Parser.END_BRACKET)) {
			let str = Parser.REGEX_BRACKETS.exec(this.value)[1]
			this.detail = {}
			this.detail.args = str.split(Parser.COMMA).map(p => p.trim())
			this.detail.func = this.value.trim().replace(`(${str})`, Parser.EMPTY)
		}
		return this.value
	}
}


window.onload = () => {

	let cssText = document.styleSheets[0].ownerNode.innerText
	let parsed = (new Parser).parseCSS(cssText)
	console.log(parsed)

}
