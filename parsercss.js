/**
 * ICSS Staments Interface
 */
class ICSSStatments {
	static get IMPORT() { return 'import' }
	static get MEDIA() { return 'media' }
	static get KEYFRAME() { return 'keyframe' }
	static get FONT_FACE() { return 'font-face' }
}

/**
 * ICSS Symbols Interface
 */
class ICSS {
	static get EMPTY() { return '' }
	static get DOTS() { return ':' }
	static get COMMA() { return ',' }
	static get SEMICOLON() { return ';' }
	static get BREAK_LINE() { return '\n' }
	static get BEGIN_BLOCK() { return '{' }
	static get END_BLOCK() { return '}' }
	static get BEGIN_BRACKET() { return '(' }
	static get END_BRACKET() { return ')' }
	static get DOUBLE_END_BRACKETS() { return '}}' }
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
}


/**
 * ParserCSS Class
 */
class Parser {
	
	/**
	 * Initializate Parser
	 * @param string css
	 * @return object Parser
	 */
	constructor(css) {
		this.css = css
		this.clearCode()
		this.parseCSS()

		delete this.rules
		delete this.query
		delete this.blocksRule
		delete this.blockRules
		return this
	}

	/**
	 * get blocks of queries and rules
	 * @param string css
	 * @return object rule
	 */
	parseCSS(css = '') {
		this.blocks = []
		this.css = (css != ICSS.EMPTY)? css:this.css
		this.blocksRule = this.parseCSSStatments()
			.split(ICSS.END_BLOCK)
		this.blocksRule.pop()

		this.blocksRule.map(block => {
			[this.query, this.rules] = block.split(ICSS.BEGIN_BLOCK)

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
		this.rules = (rules != ICSS.EMPTY)? rules : this.rules
		this.rules = this.parseCSSRules().split(ICSS.SEMICOLON)
		this.rules.pop()
		
		this.rules.map(decl => {
			let [prop, value] = decl.split(ICSS.DOTS).map(i => i.trim())
			if (prop != ICSS.EMPTY && value != ICSS.EMPTY)
				this.blockRules.push(new Rule(prop, ICSS.REGEX_REPLACE(value, ICSS.DATA_URI_VALUES)))
		})

		return this.blockRules
	}


	/**
	 * Parse CSS Statments
	 * @return string css
	 */
	parseCSSStatments() {
		this.statments = {imports:[], medias:[], keyframes:[], font_faces:[]}
		this.css.split('@').map(blocklines => {
			let blockline = Object.keys(this.statments)
				.map(s => ICSS.REGEX_REPLACE(s, {'s':'', '_':'-'}))
				.filter(statment => blocklines.startsWith(statment))

			if (blockline.length > 0) {
				let statment = `${blockline[0].replace('-', '_')}s`

				if (blockline[0] == ICSSStatments.IMPORT) {
					this.css = this.css.replace(`@${blocklines.split(ICSS.SEMICOLON)[0]};`, ICSS.EMPTY)
					let path_or_url = blocklines
						.split(ICSS.SEMICOLON)[0]
						.split(blockline[0])[1].trim()

					if (path_or_url.startsWith('"')) {
						path_or_url = path_or_url.replace(new RegExp('"', 'g'), ICSS.EMPTY)
					}

					this.statments[statment].push(path_or_url)
				} else if (blockline[0] == ICSSStatments.FONT_FACE) {
					this.css = this.css.replace(`@${blocklines.split(ICSS.END_BLOCK)[0]}}`, ICSS.EMPTY)
					let rules = blocklines.split(ICSS.BEGIN_BLOCK)[1]
						.split(ICSS.END_BLOCK)[0].trim()
					rules = rules.split(ICSS.SEMICOLON).map(r => {
						if (r != ""){
							let [p, v] = r.split(ICSS.DOTS)
							return (new Rule(p, v.trim().replace(new RegExp('"', 'g'), ICSS.EMPTY)))
					}}).filter(r => r != undefined)
					
					this.statments[statment].push(rules)
				} else {
					let mediaBlocks = []
					let lines = blocklines.split(ICSS.DOUBLE_END_BRACKETS)[0]
					this.css = this.css.replace(`@${lines}}}`, ICSS.EMPTY)
					let mediaQuery = lines.substring(0, lines.indexOf(ICSS.BEGIN_BLOCK)-1)
					lines = lines.substring(lines.indexOf(ICSS.BEGIN_BLOCK)+1)
						.split(ICSS.END_BLOCK)

					lines.map(block => {
						let [query, rules] = block.split(ICSS.BEGIN_BLOCK)
						mediaBlocks.push({
							query: query.trim(),
							selectors: query.trim().split(ICSS.COMMA).map(s => s.trim()),
							rules: rules.split(ICSS.SEMICOLON).map(r => {
								if (r != ""){
									let [p, v] = r.split(ICSS.DOTS)
									return (new Rule(p, v))
							}}).filter(r => r != undefined)
						})
					})
					this.statments[statment].push({query: mediaQuery, blocks: mediaBlocks})
				}
		}})

		return this.css
	}

	/**
	 * parse css rules
	 * @param string css rules
	 * @return string
	 */
	parseCSSRules() {
		return this.rules.split(ICSS.BREAK_LINE)
			.filter(d => d != ICSS.EMPTY)
			.map(decl => {
				if (decl.includes(ICSS.END_BRACKET_RULE)) {
					let [p_keys, match, params, d] = [[], [], {}, decl]
					while (match = ICSS.REGEX_BRACKETS.exec(d)) {
						p_keys.push(match[1])
						d = d.replace(match[1], '')
					}
					p_keys.map(p => {
						if (p.includes(ICSS.DATA_URI)) {
							params[p] = ICSS.REGEX_REPLACE(p, ICSS.DATA_URI_KEYS)
							decl = ICSS.REGEX_REPLACE(decl, params)
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
		return this.query.trim()
			.split(ICSS.COMMA)
			.map(s => new Selector(s.trim()))
	}

	/**
	 * clear code and remove comments
	 * @param string css
	 * @return string css
	 */
	clearCode(css = '') {
		this.css = ICSS.REGEX_REPLACE((((css != ICSS.EMPTY)? css:this.css)
			.replace(ICSS.REGEX_COMMENTS, ICSS.EMPTY)), {'\n': '', '\t': ''})
		return this.css
	}
}


/**
 * Selector Class
 * selector object for query selectors
 */
class Selector {

	constructor(s) {
		this.selector = s
		return this.selector
	}

	set selector(s) {
		let chars = {
			"#": 'IDSelector',
			".": 'ClassSelector',
			"[": 'AttrSelector',
			":": 'PseudoSelector',
			"::": 'PseudoElementSelector',
		};let signs = Object.keys(chars);

		this.type = (signs.includes(s.substr(0, 2)) || signs.includes(s[0]))? 
			chars[signs.filter(i => s.substr(0, 2) == i)[0] || signs.filter(i => s[0] == i)]:'HTMLElement'

		let sel = s.replace(Object.entries(chars).map(([k, v]) => (v == this.type)?k:'').filter(f => f != "")[0], '')
		Pseudo._indexs.map(p => {
			if (sel.includes(p))
				this.pseudo = new Pseudo(p + sel.split(p)[(this.type == 'PseudoElementSelector')? 2:1])
		})
	}
}


/**
 * Pseudo Class
 * pseudo object for query selectors 
 */
class Pseudo {

	constructor(pseudo) {
		this._pseudo = pseudo
		this.type = (pseudo[1] == ':')? 'PseudoElement':(pseudo[0] == ':')? 'PseudoClass':'PseudoEvent'
	}

	get pseudo() {
		return this._pseudo.replace((this._pseudo[1] == ':')? '::':(this._pseudo[0] == ':')? ':':'@', '')
	}

	static get _indexs() {
		return [':', '::', '@']
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
		* @param string val
		*/
	set value(val) {

		let func_values = []

		if (val.includes(ICSS.END_BRACKET)) {
			let value = val.split(ICSS.END_BRACKET).map(s => s.trim());value.pop()
			let functions = value.map(s => {
				let [ func, values ] = s.split(ICSS.BEGIN_BRACKET).map(s => s.trim());let f = {}
				f[func.replaceAll('-', '_')] = (values.includes(ICSS.DATA_URI))?
					[ values ]:values.split(ICSS.COMMA).map(v => v.trim().split(' '))

				func_values.push(values)
				return f
			})

			this.details = { functions }
		}

		// trying support to many values of property
		// if (func_values.length > 0) {
		// 	let v = val.replace(new RegExp(func_values.join('|'), 'g'), '')
		// 	let values = v.split(ICSS.COMMA).map(s => s.trim())
		// }

		this._value = Object.assign({value: val }, this.details)
	}
}


let cssText = document.styleSheets[0].ownerNode.innerText
console.log(new Parser(cssText))
