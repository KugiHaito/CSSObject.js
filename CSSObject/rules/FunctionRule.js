import ICSS from "../enums/ICSS.js"


/**
 * Class FunctionRule
 * @class FunctionRule
 */
class FunctionRule {

    /**
     * Initialize FunctionRule
     * @param {string} rule
     */
    constructor(name, value) {
        this.rule = { name, value }
    }

    /**
     * set function rule
     * @param {object} rule name and values
     */
    set rule({name, value}) {
        this.name = name
        this.values = value
    }

    /**
     * set values function
     * @param {string} values
     */
    set values(value) {
        if (Array.isArray(value)) {
            this.value = value.length > 1 ? value:value.pop()
            if (value.length < 2) return

            this.value = value.map(val => {
                if (val.includes(ICSS.BRACKET.BEGIN)) {
                    let [ name, values ] = val.split(ICSS.BRACKET.BEGIN).map(v => v.trim())
                    return new FunctionRule(name, values)
                } else { return val }
            })
        } else {
            this.value = value 
        }
    }
}


export default FunctionRule
