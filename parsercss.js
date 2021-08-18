/**
 * ParserCSS Class
 */
class Parser {

	/**
	 * get blocks of queries and rules
	 * @param string css
	 * @return object rule
	 */
	parseCSS(css) {
		let blocks = []
		let rules = this.remove(css).split('}')
		rules.pop()
		rules.map(block => {
			let [query, rule] = block.split('{')
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
					params.push(regex.exec(decl)[1])
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
		return css.replace(/\/\*(\r|\n|.)*\*\//g, "")
	}
}

window.onload = () => {

	let cssText = document.styleSheets[0].ownerNode.innerText
	let parsed = (new Parser).parseCSS(cssText)
	console.log(parsed)

}
