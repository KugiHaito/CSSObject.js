import IPseudo from "../enums/IPseudo.js"


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
		this.pseudo = pseudo

		return this
	}

	set pseudo(value) {
		this.name = value
		Object.entries(IPseudo).map(([pseudo, char]) => {
			if (value.substr(0, 2).replace(/[a-z]/, '') == char)
				this.type = pseudo
		})
	}

}


export default Pseudo
