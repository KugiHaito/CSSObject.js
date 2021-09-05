import Stylesheet from "./parser/Stylesheet.js"


/**
 * CSSObject Main Class
 * parse yours css files and local stylesheets
 */
 class CSSObject {

	/**
	 * CSSObject constructor
	 * @param {object} options
	 * @returns CSSObject
	 */
	constructor(options = {}) {
		this.options(options)
		this.stylesheets = []

		return this
	}

	/**
	 * set options to get external stylesheets
	 * @param {object} options options
	 * @returns CSSObject
	 */
	options(options = {}) {
		this.__defaultOptions__ = {

			/** 
			 * load only especified css files, if used `ignore_files` isn't used
			 * @type string[]
			 */
			only_files: (options.only_files || []),

			/** 
			 * ignore css files
			 * @type string[]
			 */
			ignore_files: (options.ignore_files || []),

			/** 
			 * load minified css (default `true`)
			 * @type boolean
			 */
			load_min: (options.load_min || true),
		}

		this._options = { ...this.__defaultOptions__, ...options }
		return this
	}

	/**
	 * get local stylesheets
	 * @param {object} callback callback function
	 * @param {boolean} all return all stylesheets in callback
	 */
	local(callback, all = false) {
		let styles = []
		Object.values(document.styleSheets).forEach(sheet => {
			if (sheet.ownerNode != null || sheet.ownerNode.childNodes.length > 0)
				if (sheet.ownerNode.innerText != "") {
					let style = new Stylesheet(sheet.ownerNode.innerText)
					all ? styles.push(style) : callback(style)
				}
		})

		if (styles.length > 0) callback(styles)
	}

	/**
	 * get external css (link)
	 * @param {object} callback callback
	 */
	external(callback) {
		Object.values(document.styleSheets).forEach(sheet => {
			if (sheet.ownerNode.nodeName == 'LINK') {
				this.__external(sheet.href, callback)
			}
		})
	}

	/**
	 * load external stylesheets
	 * @param {string} link link to external stylesheet
	 * @returns reponse (promise)
	 * @private don't use please
	 */
	async __external(link, callback) {
		let filename = link.split('/').pop()
		let is_min = filename.endsWith('.min.css')
		if (!this._options.load_min_css && is_min) return
		if (this._options.only_files.length == 0 && this._options.ignore_files.includes(filename)) return
		if (this._options.only_files.length > 0 && !this._options.only_files.includes(filename)) return

		return await (fetch(link))
			.then(res => res.text())
			.then(css => callback(new Stylesheet(css, filename)))
			.catch(err => console.log("Error on load external stylesheet: ", err))

	}
}


export default CSSObject
