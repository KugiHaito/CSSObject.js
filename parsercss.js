/**
 * ParserCSS Class
 */
class Parser {


	static get DOTS() { return ':' }

	static get COMMA() { return ',' }

	static get SEMICOLON() { return ';' }

	static get BEGIN_BLOCK() { return '{' }

	static get END_BLOCK() { return '}' }

	static get REGEX_COMMENTS() { return /\/\*(\r|\n|.)*\*\//g }

	static get REGEX_BRACKETS() { return /\(([^)]+)\)/ }

	/**
	 * get blocks of queries and rules
	 * @param string css
	 * @return object rule
	 */
	parseCSS(css) {
		let blocks = []
		let rules = this.remove(css).split(Parser.END_BLOCK)
		rules.pop()
		rules.map(block => {
			let [query, rule] = block.split(Parser.BEGIN_BLOCK)
			blocks.push({
				query: query.trim(),
				selectors: query.trim().split(',').map(s => s.trim()),
				rule: this.parseCSSBlock(rule)
			})
		})

		return blocks
	}

	/**
	 * get property and values of declarations
	 * @param string css
	 * @return object rule
	 */
	parseCSSBlock(css) { 
		let rule = {}
		let params = []
		const regex = /\(([^)]+)\)/;

		let decls = css.split('\n')
			.filter(d => d != "")
			.map(decl => {
				if (decl.includes('('))
					params.push(Parser.REGEX_BRACKETS.exec(decl)[1])
				return decl.trim()
			}).join('')

		if (params.length > 0) {
			let _params = params.map(p => p.replace(':', '=').replace(';', '&'))
			decls = params.map((p, i) => {
				return decls.replace(p, _params[i])
			}).join('')
		}

		decls = decls.split(';')
		decls.pop()

		decls.map(decl => {
			let [prop, value] = decl.split(":").map(i => i.trim())
			if (prop != "" && value != "") rule[prop] = value.replace('=', ':').replace('&', ';')
		})

		return rule
	}

	/**
	 * remove comments
	 * @param string css
	 * @return string css
	 */
	remove(css) {
		return css.replace(this.REGEX_COMMENTS, "")
	}
}

window.onload = () => {

	let cssText = document.styleSheets[0].ownerNode.innerText
	let parsed = (new Parser).parseCSS(cssText)
	console.log(parsed)

}
