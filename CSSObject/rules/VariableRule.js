/**
 * Class VariableRule
 * @class VariableRule
 */
class VariableRule {

    /**
     * Initialize VariableRule
     * @param {string} name variable name
     * @param {string} value variable value
     * @param {string} scope variable scope
     * @param {string} statment statment scope (optional)
     */
    constructor(name, value, scope, statment = null) {
        this.variable = { name, value, scope, statment }
    }

    /**
     * set varible values
     * @param {object} variable
     */
    set variable({name, value, scope, statment}) {
        this.name = name
        this.value = value
        this.scope = scope
        if (statment) this.statment = statment
    }

}


export default VariableRule