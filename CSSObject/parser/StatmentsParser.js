import ICSS from "../enums/ICSS.js"
import ICSSStatments from "../enums/ICSSStatments.js"
import ImportRule from "../rules/ImportRule.js"
import FontfaceRule from "../rules/FontfaceRule.js"
import KeyframeRule from "../rules/KeyframeRule.js"
import MediaRule from "../rules/MediaRule.js"


/**
 * Class StatmentsParser to CSSParser
 * @class StatmentsParser
 */
const StatmentsParser = (Base) => class extends Base {

	/**
	 * get css statments
	 * @returns string
	 */
	 statments() {
		this.stats = {}
		this.css
			.split(ICSS.AT)
			.map(blck => {
				if (blck.startsWith(ICSSStatments.IMPORT))
					this.import(blck.split(ICSS.SEMICOLON).shift())

				if (blck.startsWith(ICSSStatments.FONT_FACE))
					this.fontface(blck.split(ICSS.BLOCK.END).shift())

				if (blck.startsWith(ICSSStatments.KEYFRAME))
					this.keyframe(blck.split(ICSS.BLOCK.DOUBLE_END).shift())
				
				if (blck.startsWith(ICSSStatments.MEDIA))
					this.media(blck.split(ICSS.BLOCK.DOUBLE_END).shift())
			})

		return this.css
	}

	/**
	 * get stament block
	 * @param {string} block
	 */
	import(block) {
		let b = block.replace(ICSSStatments.IMPORT, '').trim()
		let [ url, where ] = b.replace(' ', '|').split('|').map(i => i.trim())

		this.stats.imports.push(new ImportRule(url, where))
		this.css = this.css.replace(`${ICSS.AT}${block};`, ICSS.EMPTY)
	}
	
	/**
	 * get stament block
	 * @param {string} block 
	 */
	fontface(block) {
		let rules = block
			.split(ICSS.BLOCK.BEGIN).pop().trim()
		
		this.stats.font_faces.push(new FontfaceRule(rules))
		this.css = this.css.replace(`${ICSS.AT}${block}}`, ICSS.EMPTY)
	}
	
	/**
	 * get stament block
	 * @param {string} block 
	 */
	keyframe(block) {
		let [ name, blocks ] = block
			.replace(ICSSStatments.KEYFRAME, '')
			.replace(ICSS.BLOCK.BEGIN, '|').split('|').map(i => i.trim())

		this.stats.keyframes.push(new KeyframeRule(name, blocks))
		this.css = this.css.replace(`${ICSS.AT}${block}}}`, ICSS.EMPTY)
	}
	
	/**
	 * get stament block
	 * @param {string} block 
	 */
	media(block) {
		let [ query, blocks ] = block
			.replace(ICSSStatments.MEDIA, '')
			.replace(ICSS.BLOCK.BEGIN, '|').split('|').map(i => i.trim())

		this.stats.medias.push(new MediaRule(query, blocks))
		this.css = this.css.replace(`${ICSS.AT}${block}}}`, ICSS.EMPTY)
	}

	/**
	 * get statments
	 * @property statments
	 * @return {object}
	 */
	 get stats() {
		return this.statments
	}

	/**
	 * set statments
	 * @property staments
	 * @param {object} value
	 */
	set stats(value) {
		this.statments = value
		Object.keys(ICSSStatments)
			.map(stat => this.statments[`${stat.toLowerCase()}s`] = [])
	}

}


export default StatmentsParser
