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

	constructor(css) {
		this.css = css
		this.parseCSS()

		delete this.rules
		return this
	}

	/**
	 * get blocks of queries and rules
	 * @param string css
	 * @return object rule
	 */
	parseCSS(css = '') {
		let blocks = []
		this.css = (css != Parser.EMPTY)? css:this.css
		this.blocksRule = this.clearCode().split(Parser.END_BLOCK)
		this.blocksRule.pop()

		this.blocksRule.map(block => {
			[this.query, this.rules] = block.split(Parser.BEGIN_BLOCK)

			blocks.push({
				query: this.query.trim(),
				selectors: this.parseCSSQuery(),
				rules: this.parseCSSBlock()
			})
		})

		return blocks
	}

	/**
	 * get property and values of declarations
	 * @param string css
	 * @return object rule
	 */
	parseCSSBlock(rules = '') {
		let blockRules = []
		this.rules = (rules != Parser.EMPTY)? rules : this.rules
		this.parseCSSRules()
			.split(Parser.SEMICOLON)
			.map(decl => {
				let [prop, value] = decl.split(Parser.DOTS).map(i => i.trim())
				if (prop != Parser.EMPTY && value != Parser.EMPTY)
					blockRules.push(new Rule(prop, this._replaceAll(value, Parser.DATA_URI_VALUES)))
			})

		return blockRules
	}

	/**
	 * treat css selectors
	 * @param string css rules
	 * @return string
	 */
	parseCSSRules() {
		let params = {}
		return this.rules.split(Parser.BREAK_LINE)
			.filter(d => d != Parser.EMPTY)
			.map(decl => {
				if (decl.includes(Parser.END_BRACKET_RULE)) {
					let p_key = Parser.REGEX_BRACKETS.exec(decl)[1]
					if (p_key.includes(Parser.DATA_URI)) {
						params[p_key] = this._replaceAll(p_key, Parser.DATA_URI_KEYS)
						decl = this._replaceAll(decl, params)
					}
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
			// .replaceAll({' ':'', '\n': '', '\t': ''})
		return this.css
	}

	_replaceAll(str, obj) {
		return str.replace((new RegExp(Object.keys(obj).join('|')), 'g'), i => obj[i])
	}
}


class Rule {

	/**
	 * Rule Constructor
	 * @param string prop
	 * @param string value
	 * @return object Rule
	 */
	constructor(prop, value) {
		this.prop = prop
		this.value = value
		this.details()

		return this
	}

	/**
	 * get details of value rule
	 * 
	 */
	details() {
		if (this.value.includes(Parser.END_BRACKET)) {
			let str = Parser.REGEX_BRACKETS.exec(this.value)[1]
			this.detail = {}
			this.detail.args = str.split(Parser.COMMA).map(p => p.trim())
			this.detail.func = this.value.trim().replace(`(${str})`, Parser.EMPTY)

			return this.detail
		}
	}
}

window.onload = () => {

	let cssText = document.styleSheets[0].ownerNode.innerText
	let parsed = (new Parser).parseCSS(cssText)
	console.log(parsed)

}
