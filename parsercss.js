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
		// let declarations = css.split(';')
		let declarations = css.split('\n')
			.filter(d => d != "")
			.map(decl => {
				let param = decl.match(/\(([^()]*)\)/g)
				if ((param != 'undefined' || param != "null") && param.includes('data:')) {
					param.replace(';', '&')
				}

				return decl.trim()
			})
			.split(';')

		declarations.pop()
		declarations = declarations.map(decl => {
				let param = d.match(/\(([^()]*)\)/g)
				if (params != 'undefined' && param.includes('data:')) {
					param.replace('&', ';')
				}
			})

		declarations.map(decl => {
			let [prop, value] = decl.split(":").map(i => i.trim())
			if (prop != "" && value != "") rule[prop] = value
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
	console.log((new Parser).parseCSS(cssText))

}
