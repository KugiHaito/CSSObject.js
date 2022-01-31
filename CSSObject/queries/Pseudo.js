import ICSS from "../enums/ICSS.js"
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

    /**
     * Set pseudo name and type
     * @param {string} value
     */
    set pseudo(value) {
        this.name = value, this.values = value
        Object.entries(IPseudo).map(([pseudo, char]) => {
            if (value.substring(0, 2).replace(/[a-z]/, '') == char)
                this.type = pseudo
        })
    }

    /**
     * Set pseudo value
     * @param {string} value
     */
    set values(values) {
        if (values.includes(ICSS.BRACKET.BEGIN)) {
            this.value = values
                .split(ICSS.BRACKET.BEGIN).pop()
                .split(ICSS.BRACKET.END).shift()

            this.name = this.name.replace(`(${this.value})`, '')
        } else { delete this.value }
    }

}


export default Pseudo