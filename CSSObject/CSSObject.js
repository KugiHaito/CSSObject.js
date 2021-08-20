import ICSS from './interfaces/ICSS.js'
import ICSSStatments from './interfaces/ICSSStatments.js'
import Selector from './queries/Selector.js'
import Rule from './rules/Rule.js'


/**
 * CSSObject Class
 * parse yours css files and local stylesheets
 */
class CSSObject {
	
	/**
	 * Initializate Parser
	 * @param string css
	 * @return object Parser
	 */
	constructor(css) {
		this.css = css.trim()
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
			.split(ICSS.BLOCK.END)
		this.blocksRule.pop()

		this.blocksRule.map(block => {
			[this.query, this.rules] = block.split(ICSS.BLOCK.BEGIN)

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
				this.blockRules.push(new Rule(prop, ICSS.REGEX_REPLACE(value, ICSS.DATA_URI.VALUES)))
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
					this.css = this.css.replace(`@${blocklines.split(ICSS.BLOCK.END)[0]}}`, ICSS.EMPTY)
					let rules = blocklines.split(ICSS.BLOCK.BEGIN)[1]
						.split(ICSS.BLOCK.END)[0].trim()
					rules = rules.split(ICSS.SEMICOLON).map(r => {
						if (r != ""){
							let [p, v] = r.split(ICSS.DOTS)
							return (new Rule(p, v.trim().replace(new RegExp('"', 'g'), ICSS.EMPTY)))
					}}).filter(r => r != undefined)
					
					this.statments[statment].push(rules)
				} else {
					let mediaBlocks = []
					let lines = blocklines.split(ICSS.BLOCK.DOUBLE_END)[0]
					this.css = this.css.replace(`@${lines}}}`, ICSS.EMPTY)
					let mediaQuery = lines.substring(0, lines.indexOf(ICSS.BLOCK.BEGIN)-1)
					lines = lines.substring(lines.indexOf(ICSS.BLOCK.BEGIN)+1)
						.split(ICSS.BLOCK.END)

					lines.map(block => {
						let [query, rules] = block.split(ICSS.BLOCK.BEGIN)
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
				if (decl.includes(ICSS.BRACKET.END_RULE)) {
					let [p_keys, match, params, d] = [[], [], {}, decl]
					while (match = ICSS.REGEX_BRACKETS.exec(d)) {
						p_keys.push(match[1])
						d = d.replace(match[1], '')
					}
					p_keys.map(p => {
						if (p.includes(ICSS.DATA_URI.KEY)) {
							params[p] = ICSS.REGEX_REPLACE(p, ICSS.DATA_URI.KEYS)
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
		this.css = ICSS.REGEX_REPLACE((((css != ICSS.EMPTY)? css:this.css).replace(ICSS.REGEX_COMMENTS, ICSS.EMPTY)), {'\n': '', '\t': ''})
		return this.css
	}
}


export default CSSObject
