import ICSS from "../enums/ICSS.js"
import FunctionRule from "./FunctionRule.js"


/**
 * Rule Class
 * CSS rule object
 */
class Rule {

    /**
     * Rule Constructor
     * @param {string} prop property name
     * @param {string} value rule values
     * @return {Rule} object
     */
    constructor(property, value) {
        this.rule = [ property, value ]

        return this
    }

    /**
     * set rule properties
     * @param {string[]} value
     */
    set rule(value) {
        let [ prop, val ] = value
        this.property = prop
        this.value = this.values(val)
    }

    /**
     * alias to get property of rule
     * @property property
     * @return string property
     */
    get prop() {
        return this.property
    }

    /**
     * alias to set property og rule
     * @property property
     * @param {string} property
     */
    set prop(property) {
        this.property = property
    }


    /**
     * get values of rule property
     * @param {string} values
     * @returns string[]
     */
    values(values) {
        if (values.includes(ICSS.BRACKET.BEGIN)) {
            let params = this.__bracketParams(values)
            let val = params.reduce((a, p, i) => a.replace(`(${p})`, `#${i}`), values)
            let v = val.split(val.includes(ICSS.COMMA)? ICSS.COMMA:" ")

            return params.reduce((a, p, i) => a.replace(`#${i}`, `(${p})`), v.join('|'))
                .split('|').map(v => this.value(v.trim()))
        }

        return this.value(values)
    }

    /**
     * get value and details of rule
     * @param {string} values
     */
    value(values) {
        if (this.__bracketParams(values).length > 1)
            return this.values(values)

         if (values.includes(ICSS.BRACKET.END)) {
            let val = values.replace(/[)]/g, '')
            let [ name, value ] = val.split(/\((.+)/).map(v => v.trim())
            value = this.important(value)
                .split(!value.startsWith(ICSS.DATA_URI.KEY) && value.includes(ICSS.COMMA) ? ICSS.COMMA:" ")
                .filter(v => v != ICSS.EMPTY).map(v => v.trim())

            return new FunctionRule(name, value)
        }

        let val = this.important(values).split(ICSS.COMMA).map(v => v.trim())
        return val.length > 1 ? val:val.pop()
    }

    important(value) {
        let i = value.split(ICSS.IMPORTANT)
        this.isImportant = (i.length > 1)? true:false

        return (this.isImportant)? i.shift().trim():value
    }

    /**
     * get string between main brackets
     * @param {string} string 
     * @returns string[]
     */
     __bracketParams(string) {
        let b = false, bb = [], params = []
        string.split("").reduce((a, l) => {
            if (l == ")" && bb.length == 0) b = false
            if (b) a += l
            if (l == "(" && b == true) bb.push("(")
            if (l == "(") b = true
            if (l == ")" && bb.length > 0) bb.pop()
            if (l == ")" && bb.length == 0 && b == false) {
                params.push(a)
                a = ICSS.EMPTY
            }

            return a 
        }, ICSS.EMPTY)

        return params
    }
}


export default Rule
