/**
 * highlight.js
 * A simple highlight to json code
 * use/see `highlight.css` too
 * @author KugiHaito
 */
const JSONhighlight = {

	HTML_KEY: (key) => `<b class='highlight-key'>${key}</b>`,
	HTML_VAL: (val) => `<i class='highlight-value'>${val}</i>`,
	HTML_BLOCK: (char) => `<span class="highlight-block">${char}</span>`,
	HTML_BRACKET: (char) => `<span class="highlight-bracket">${char}</span>`,

	use(query) {
		let code = document.querySelector(query)
		code.innerHTML = this.highlight(code.innerHTML)
	},

	highlight(code) {
		let c = code.split('<br>').map(line => {
			let key = line.split(':').shift()
			let value = line.replace(':', '|').split('|').pop()

			let l = line
			let t = value.trim()
			let o = (t.startsWith('}') || t.startsWith('{') || t.startsWith('[') || t.startsWith(']'))

			if (value && !o) {
				l = l.replace(value, this.HTML_VAL(value))
				console.log(value)
			}

			if (key && key.trim().length < 25  && line.includes(':'))
				l = l.replace(key, this.HTML_KEY(key))

			if (value && o)
				l = l.replace(/{/g, this.HTML_BLOCK('{'))
					 .replace(/}/g, this.HTML_BLOCK('}'))
					 .replace(/]/g, this.HTML_BRACKET(']'))
					 .replace(/\[/g, this.HTML_BRACKET('['))

			return l
		}).join('<br>')

		return c
	}
}

