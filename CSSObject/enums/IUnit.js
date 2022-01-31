/**
 * @enum IUnit
 * CSS Units of value
 */
const IUnit = {

    /**
     * Others type of value
     */
    NO_UNIT: 'NO_UNIT',

    // Absolute Lengths
    
    /** Centimeters Unit */
    CENTIMETERS: 'cm',
    
    /** Millimetters Unit */
    MILLIMETERS: 'mm',
    
    /** Inches Unit (1in = 96px = 2.54cm) */
    INCHES: 'in', // 
    
    /** Pixels Unit (1px = 1/96th of 1in) */
    PIXELS: 'px',
    
    /** Points Unit (1pt = 1/72 of 1in) */
    
    /** Picas Unit (1pc = 12 pt) */
    PICAS: 'pc',

    // Relative Lengths

    /**
     * Em Unit
     * Relative to the font-size of the element
     * (2em means 2 times the size of the current font)
     */
    EM: 'em',
    
    /**
     * Rem Unit
     * Relative to font-size of the root element
     */
    REM: 'rem',
    
    /**
     * Ex Unit 
     * relative to the x-height of the current font (rarely used)
     */
    EX: 'ex',
    
    /**
     * Ch Unit
     * Relative to the width of the "0" (zero)
     */
    CH: 'ch',
    
    /** Viewport Width Unit */
    VIEWPORT_WIDTH: 'vw',
    
    /** 
     * Viewport Height Unit
     * (2 times the size of the current font)
     */
    VIEWPORT_HEIGHT: 'vh',
    
    /**
     * Viewport smaller dimension Unit
     * Relative to 1% of viewport's smaller dimension
     */
    VMIN: 'vmin',
    
    /**
     * Viewport larger dimension Unit
     * Relative to 1% of viewport's* larger dimension
     */
    VMAX: 'vmax',
    
    /**
     * Percentage Unit
     * Relative to the parent element
     */
    PERCENTAGE: '%',

    /**
     * Milliseconds Unit Time
    */
    MILLISECONDS: 'ms',

    /**
     * Seconds Unit Time
    */
    SECONDS: 's',

}


export default IUnit