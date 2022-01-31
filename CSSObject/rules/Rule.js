import ICSS from "../enums/ICSS.js"
import IUnit from "../enums/IUnit.js"
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
        this.value = this.__values(val)
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
    __values(values) {
        if (values.includes(ICSS.BRACKET.BEGIN)) {
            let params = this.__bracketParams(values)
            this.setUnit(values.replace(`(${params})`, ''))
            let val = params.reduce((a, p, i) => a.replace(`(${p})`, `#${i}`), values)
            let vals = val.split(val.includes(ICSS.COMMA)? ICSS.COMMA:" ")

            return params
                .reduce((a, p, i) => a.replace(`#${i}`, `(${p})`), vals.join('|'))
                .split('|').map(v => this.value(v.trim()))
        }

        return this.setUnit(this.value(values))
    }

    /**
     * get value and details of rule
     * @param {string} values
     */
    value(values) {
        if (this.__bracketParams(values).length > 1)
            return this.__values(values)

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

    /**
     * trait unit value
     * @param {string} values
     * @property unit
     * @returns number | string
     */
     setUnit(values) {
        if (Array.isArray(values)) {
            let v = []
            values.map(values => {
                this.setUnit(values)
                v.push(this.__values)
            })

            this.values = v
        } else {
            this.values = values.split(' ').map(v => {
                let value = parseFloat(v) ? parseFloat(v) : v == "0" ? 0 : v,
                    unit = value == NaN ? IUnit.NO_UNIT : this.unity(v)

                return { value, unit }
            })
        }

        return values
    }

    /**
     * has important declaration
     * @param {string} value
     * @property isImportant
     * @returns string
     */
    important(value) {
        let i = value.split(ICSS.IMPORTANT)
        this.isImportant = (i.length > 1)? true:false

        return (this.isImportant)? i.shift().trim():value
    }

    /**
     * set property unit
     * @property unit
     * @param {string} value
     */
     unity(value) {
        let u = value.replace(/[0-9]/g, ''),
            unity = IUnit.NO_UNIT;
        Object.entries(IUnit).map(([name, unit]) => {
            if (unit == u) unity = name
        })

        return unity
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