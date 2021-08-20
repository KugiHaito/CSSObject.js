/**
 * Pseudo Class
 * pseudo object for query selectors 
 */
 class Pseudo {

	/**
	 * Pseudo contructor
	 * @param {string} pseudo pseudo name
	 */
	constructor(pseudo) {
		this._pseudo = pseudo
		this.type = (pseudo[1] == ':')? 'PseudoElement':(pseudo[0] == ':')? 'PseudoClass':'PseudoEvent'

		return this
	}

	/**
	 * get pseudo name
	 * @returns string
	 */
	get pseudo() {
		return this._pseudo.replace((this._pseudo[1] == ':')? '::':(this._pseudo[0] == ':')? ':':'@', '')
	}

}


export default Pseudo
